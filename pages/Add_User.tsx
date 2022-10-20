import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddUserModal from '../Components/Modal/AddUser_Modal'
import { Button, Form, Row, Col, Divider, DatePicker, Table, Switch, Input, notification, Typography } from 'antd';
import { SearchOutlined, UserAddOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import router from 'next/router';

interface IUser {
    user_id: string
    name: string,
    lastname: string,
    phone: string,
    level: string,
    username:string,
    position_id: string,
    role_id: string,
    department_id: string
}
interface IModalAddUser {
    header?: string
    status?: string
    visible?: boolean
    value?: any
}
const AddUser: React.FC = () => {
    const [modal, setModal] = useState<IModalAddUser>({
        header: "",
        status: "",
        visible: false,
        value: {},
    })
    const [status, setStatus] = useState()
    const [User, setUser] = useState<IUser[]>([])
    const [loading, setLoading] = useState(false)
    let pageSize: number = 10
    const [position, setPosition] = useState([
        {
            pos_id: "",
            pos_name: "",
        },
    ])
    const [role, setRole] = useState([
        {
            role_id: "",
            role_name: "",
        },
    ])
    const [department, setDepartment] = useState([
        {
            dep_id: "",
            dep_name: "",
        },
    ])
    const [positionFilter, setPositionFilter] = useState({
        where: {},
        query: "",
        limit: 10,
        skip: 0,
    })
    const [filter, setFilter] = useState({
        where: {},
        query: "",
        limit: pageSize,
        skip: 0,
    })
    const [rolefilter, setRoleFilter] = useState({
        where: {},
        query: "",
        limit: pageSize,
        skip: 0,
    })
    const [departmentfilter, setDepartmentFilter] = useState({
        where: {},
        query: "",
        limit: pageSize,
        skip: 0,
    })
    useEffect(() => {
        queryUser(filter)
    }, [filter, setFilter])
    useEffect(() => {
        queryPosition(positionFilter)
    }, [positionFilter, setPositionFilter])
    useEffect(() => {
        queryRole(rolefilter)
    }, [rolefilter, setRoleFilter])
    useEffect(() => {
        queryDepartment(departmentfilter)
    }, [departmentfilter, setDepartmentFilter])
    const queryUser = async (filter: any) => {
        setLoading(true)
        const result = await axios({
            method: "post",
            url: `/api/user/query`,
            data: filter,
        }).catch((err) => {
            if (err) {
                if (err?.response?.data?.message?.status === 401) {
                    notification["error"]({
                        message: "Query ข้อมูลไม่สำเร็จ",
                        description: "กรุณาเข้าสู่ระบบ",
                    })
                    Cookies.remove("user")
                    Router.push("/login")
                }
            }
        })
        if (result?.status === 200) {
            setUser(result?.data?.data)
            setLoading(false)
        } else {
            setUser([])
            setLoading(false)
        }
        console.log('result.data.data====>>', result?.data?.data);
    }
    const queryPosition = async (filter: any) => {
        const result = await axios({
            method: "post",
            url: `/api/position/query`,
            data: filter,
        }).catch((err) => {
            if (err) {
                if (err?.response?.data?.message?.status === 401) {
                    notification["error"]({
                        message: "Query ข้อมูลไม่สำเร็จ",
                        description: "กรุณาเข้าสู่ระบบ",
                    })
                    Cookies.remove("user")
                    router.push("/login")
                }
            }
        })
        if (result?.status === 200) {
            console.log("result position >>>> ", result?.data?.data)
            let positionData: any[] = []
            result?.data?.data.map((value: any) => {
                positionData.push({
                    pos_id: value._id,
                    pos_name: value?.name,
                })
            })

            setPosition(positionData)
        }
    }
    const queryRole = async (filter: any) => {
        const result = await axios({
            method: "post",
            url: `/api/role/query`,
            data: filter,
        }).catch((err) => {
            if (err) {
                if (err?.response?.data?.message?.status === 401) {
                    notification["error"]({
                        message: "Query ข้อมูลไม่สำเร็จ",
                        description: "กรุณาเข้าสู่ระบบ",
                    })
                    Cookies.remove("user")
                    router.push("/login")
                }
            }
        })
        if (result?.status === 200) {
            let roleData: any[] = []
            result?.data?.data.map((value: any) => {
                roleData.push({
                    role_id: value._id,
                    role_name: value?.name,
                })
            })

            setRole(roleData)
        }
    }
    const queryDepartment = async (filter: any) => {
        const result = await axios({
            method: "post",
            url: `/api/department/query`,
            data: filter,
        }).catch((err) => {
            if (err) {
                if (err?.response?.data?.message?.status === 401) {
                    notification["error"]({
                        message: "Query ข้อมูลไม่สำเร็จ",
                        description: "กรุณาเข้าสู่ระบบ",
                    })
                    Cookies.remove("user")
                    router.push("/login")
                }
            }
        })
        if (result?.status === 200) {
            console.log("result department >>>> ", result?.data?.data)
            let departmentData: any[] = []
            result?.data?.data.map((value: any) => {
                departmentData.push({
                    dep_id: value._id,
                    dep_name: value?.name,
                })
            })

            setDepartment(departmentData)
        }
    }
    const onUser = async (value: any, cond: string) => {
        const result = await axios({
          method: 'post',
          url: `/api/user/${cond}`,
          data: cond === "create" 
            ? value 
            : cond === "update" 
              ? {...value, id: modal?.value?._id}
              : {id: value}
        }).catch((err) => {
          if (err) {
            if (err?.response?.data?.message?.status === 401) {
              notification["error"]({
                message: "Query ข้อมูลไม่สำเร็จ",
                description: "กรุณาเข้าสู่ระบบ",
              })
              Cookies.remove("user")
              router.push("/login")
            }
          }
        })
        if (result?.status === 200) {
          notification['success']({
            message: `${cond === "create" ? ('add success') : cond === "update" ? ('edit success') : ('delete success')}`
          })
          queryUser(filter)
        }
      }
    const columns: any = [
        {
            title: 'รหัสพนักงาน',
            dataIndex: 'user_id',
            key: 'user_id',
            align: 'center',
        },
        {
            title: 'ชื่อ',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: 'นามสกุล',
            dataIndex: 'lastname',
            key: 'lastname',
            align: 'center',
        },
        {
            title: 'เบอร์โทร',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center',
        },
        {
            title: 'ชื่อผู้ใช้',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
        },
        {
            title: 'ระดับการทำงาน',
            dataIndex: 'level',
            key: 'level',
            align: 'center',
        },
        {
            title: 'หน้าที่',
            dataIndex: 'role_id',
            key: 'role_id',
            align: 'center',
            render: (_: any, record: any) => (
                <>
                    {role?.map((value: any, index: number) => {
                        if (value?.role_id === record?.role_id) {
                            return <Typography key={index}>{value?.role_name}</Typography>
                        }
                    })}
                </>
            )
        },
        {
            title: 'แผนก',
            dataIndex: 'department_id',
            key: 'department_id',
            align: 'center',
            render: (_: any, record: any) => (
                <>
                    {department?.map((value: any, index: number) => {
                        if (value?.dep_id === record?.department_id) {
                            return <Typography key={index}>{value?.dep_name}</Typography>
                        }
                    })}
                </>
            ),
        },
        {
            title: 'ตำแหน่ง',
            dataIndex: 'position_id',
            key: 'position_id',
            align: 'center',
            render: (_: any, record: any) => (
                <>
                    {position?.map((value: any, index: number) => {
                        if (value?.pos_id === record?.position_id) {
                            return <Typography key={index}>{value?.pos_name}</Typography>
                        }
                    })}
                </>
            ),
        },
        {
            title: 'การจัดการ',
            dataIndex: 'management',
            key: 'management',
            align: 'center',
            width: '20%',
            render: (_: any, record: any) => (
                <Row justify='center' gutter={0} style={{ width: "100%" }}>
                    <Col span={2} offset={0} style={{ marginRight: "40px", }}>
                        <Button
                            onClick={() => { 
                                let newModal:any = {...modal,header: "แก้ไขการขอออกนอกสถานที่", status: "update", visible: true ,value: record}
                                setModal(newModal)}
                            }
                            style={{ background: 'none', border: 'none' }} >
                            <FormOutlined style={{ fontSize: "24px", fontFamily: "SukhumvitSet-Bold", color: "#064595" }} />
                        </Button>
                    </Col>
                    <Col span={1} offset={0} style={{ marginRight: "40px" }}>
                        <Button
                            onClick={() => setModal({ header: "ลบพนักงาน", status: "delete", visible: true }
                            )}
                            style={{ background: 'none', border: 'none' }} >
                            <DeleteOutlined style={{ fontSize: "24px", fontFamily: "SukhumvitSet-Bold", color: "#064595" }} />
                        </Button>
                    </Col>
                </Row>
            ),
        },
    ];
    return (
        <>
            <Row>
                <Col span={20} offset={2}><p style={{ fontSize: '60px', fontWeight: 'bold', paddingTop: '20px', paddingBottom: '-10px' }}>เพิ่มพนักงาน</p></Col>
            </Row>
            <Row justify="center">
                <Col span={22}><DividerStyled /></Col>
            </Row>
            <Row>
                <Col span={12} offset={5}><Form.Item><Input style={{ borderRadius: "24px", width: '100%', height: '47px', fontSize: '18px', background: '#fff', boxShadow: '0px 4px 4px rgb(0 0 0 / 25%)' }} /></Form.Item></Col>
                <Col span={3} offset={1}><ButtonStyledd icon={<SearchOutlined />} style={{ background: '#F1BE44', width: '150px' }}>Search</ButtonStyledd></Col>

                <Col span={3} offset={18} style={{ paddingTop: '40px' }}><ButtonStyledd onClick={() => setModal({ visible: true, header: "เพิ่มพนักงาน", status: "create" })}
                    icon={<UserAddOutlined />} style={{ background: '#F1BE44', width: '150px' }}>Add User</ButtonStyledd></Col>
            </Row>
            <Row justify='center' style={{ width: "100%", marginTop: "10px" }}>

                <TableStyled pagination={false} style={{ width: "70%" }} columns={columns} dataSource={User} />
            </Row>
            {AddUserModal(modal, setModal, onUser,position,department,role)}
        </>
    );
};


const DividerStyled = styled(Divider)`
    background: #064595 ;
    height: 2px;
    margin-top: -50px;
`
const ButtonStyledd = styled(Button)`
    color: #064595;
    height: 50px;
    border-Radius:10px;
    font-Size: 22px;
    fontFamily: Semi Bold;
    font-weight: bold;
    padding-top: 10px;
`

const TableStyled = styled(Table)`
    .ant-select-selector {
        border-radius: 10px !important;
    }

    .ant-table {
        border-radius: 30px;
    }

    .ant-table-tbody>tr>td {
        transition: background 0.3s;
        background: #DEE7F1;
        border-bottom: 2px solid white;
        font-size: 16px;
        font-weight: 900;
    }

    .ant-table-tbody>tr: last-child >td {
        border-bottom: none;
    }

    .ant-table-thead>tr>th {
        position: relative;
        color: white;
        background: #064595 !important;
        font-size: 22px;
        border-right: 1px solid white;
        border-left: 1px solid white;
    }

    .ant-table-tbody>tr>td {
        /* border-bottom: 1px solid #f0f0f0; */
        transition: background 0.3s;
        background: #DEE7F1;
        border-bottom: 2px solid white;
        border-right: 2px solid white;
        font-size: 20px;
        font-weight: 900;
    }

    .ant-table-tbody>tr: last-child >td {
        border-bottom: none;
    }

    .ant-table-tbody>tr >td : last-child{
        border-right: none;
    }
`
export default AddUser;