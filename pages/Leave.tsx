import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import LeaveModal from '../Components/Modal/LeaveModal'
import PrintLeave from '../Components/Modal/Print_Leave'
import { Button, Form, Row, Col, Divider, DatePicker, Table, notification, Typography } from 'antd';
import { SearchOutlined, DiffOutlined, PrinterOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router'
interface ILstatus {
    detail: string
    dragDate: Date
    uptoDate: Date
    status: string
    approver: string
    user_id: string
    ltype_id: string
}
interface IModalLeave {
    header?: string
    status?: string
    visible?: boolean
    value?: any
}
interface IProps {
    userCookie: any
}
export async function getServerSideProps(context: any) {
    if (context.req?.cookies?.user) {
        const getCookie = JSON.parse(context.req?.cookies?.user)
        return {
            props: {
                userCookie: getCookie
            }
        }
    } else {
        return {
            redirect: {
                destination: "/login",
                parmanent: false
            }
        }
    }
}
const Leave: NextPage<IProps> = ({ userCookie }) => {
    console.log('userCookie========>', userCookie)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [table, setTable] = useState({
        header: ""
    })
    const [lStatus, setStatus] = useState<ILstatus[]>([])
    const [modal, setModal] = useState<IModalLeave>({
        header: "",
        status: "",
        visible: false,
        value: {},
    })
    const [modalprint, setModalprint] = useState<any>({})
    const [user, setUser] = useState([
        {
            user_id: "",
            user_name: "",
        },
    ])
    const [leavetype, setLeaveType] = useState([
        {
            ltype_id: "",
            ltype_name: "",
        },
    ])

    const [userfilter, setUserFilter] = useState({
        "where": {},
        "query": "",
        "limit": 10,
        "skip": 0
    })
    const [ltypefilter, setLtypeFilter] = useState({
        "where": {},
        "query": "",
        "limit": 10,
        "skip": 0
    })
    const [lstatusfil, setLstatusfil] = useState({
        "where": {},
        "query": "",
        "limit": 10,
        "skip": 0
    })

    const queryLeaveStatus = async (filter: any) => {
        setLoading(true)
        const result = await axios({
            method: 'post',
            url: `/api/leave/lstatus`,
            data: filter
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
            setStatus(result?.data?.data)
            setLoading(false)
        } else {
            setStatus([])
            setLoading(false)
        }
    } 
    useEffect(() => {
        queryLeaveStatus(lstatusfil)
    }, [lstatusfil, setLstatusfil])


    const QueryLeaveType = async (filter: any) => {
        const result = await axios({
            method: 'post',
            url: `/api/leaveType/query`,
            data: filter
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
            let ltypeData: any[] = []
            result?.data?.data.map((value: any) => {
                ltypeData.push({
                    ltype_id: value._id,
                    ltype_name: value?.name
                })
            })
            setLeaveType(ltypeData)
        }
    }
    useEffect(() => {
        QueryLeaveType(ltypefilter)
    }, [ltypefilter, setLtypeFilter])
    const QueryUser = async (filter: any) => {
        const result = await axios({
            method: 'post',
            url: `/api/user/query`,
            data: filter
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
            let userData: any[] = []
            result?.data?.data.map((value: any) => {
                userData.push({
                    user_id: value._id,
                    user_name: value?.name
                })
            })
            setUser(userData)
        }
    }
    useEffect(() => {
        QueryUser(userfilter)
    }, [userfilter, setUserFilter])
    // Add Leave
    const onAddLeave = async (value: any) => {
        const result = await axios({
            method: "post",
            url: `/api/leave/create`,
            data: value,
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
            notification["success"]({
                message: "cameras-add-success",
            })
            queryLeaveStatus(lstatusfil)
        }

    }
    const columnsLeave: any = [
        {
            title: 'เริ่มวันที่',
            dataIndex: 'dragDate',
            key: 'dragDate',
            align: 'center',
        },
        {
            title: 'ถึงวันที่',
            dataIndex: 'uptoDate',
            key: 'uptoDate',
            align: 'center',
        },
        {
            title: 'รายละเอียด',
            dataIndex: 'detail',
            key: 'detail',
            align: 'center',
        },
        {
            title: 'ประเภทการลา',
            dataIndex: 'ltype_id',
            key: 'ltype_id',
            align: 'center',
            render: (_: any, record: any) => (
                <>
                    {leavetype?.map((value: any, index: number) => {
                        if (value?.ltype_id === record?.ltype_id) {
                            return <Typography key={index}>{value?.ltype_name}</Typography>
                        }
                    })}

                </>
            ),
        },
        {
            title: 'สถานะ',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
        },
        {
            title: 'การจัดการ',
            dataIndex: 'management',
            key: 'management',
            align: 'center',
            width: '10%',
            render: (_: any, record: any) => (
                <Row justify='center' gutter={0} style={{ width: "100%" }}>
                    <Col span={2} offset={0} style={{ marginRight: "40px", }}>
                        <Button
                            onClick={() => setModalprint({ visible: true, header: "ใบลากิจ", status: "Leave", data: record }
                            )}
                            style={{ background: 'none', border: 'none' }} >
                            <PrinterOutlined style={{ fontSize: "24px", fontFamily: "SukhumvitSet-Bold", color: "#064595" }} />
                        </Button>
                    </Col>
                </Row>
            ),
        },
    ];
    return (
        <div >

            <Row >
                <Col span={20} offset={2}><p style={{ fontSize: '60px', fontWeight: 'bold', paddingTop: '20px', paddingBottom: '-10px', color: '#2D2A96' }}>ลางาน</p></Col>
            </Row>
            <Row justify="center">
                <Col span={22}><DividerStyled /></Col>
            </Row>
            <Row justify="center">
                <Col span={12} >
                    <Form.Item><DatePickerStyled /><ArrowRightOutlinedStyled /><DatePickerStyled /></Form.Item></Col>
                <Col span={3} offset={1}><ButtonStyledd icon={<SearchOutlined />} style={{ background: '#F1BE44', width: '150px' }}>ค้นหา</ButtonStyledd></Col>
            </Row>
            <Row>
                <Col span={15} offset={2}><p style={{ fontSize: '60px', fontWeight: 'bold', paddingTop: '30px', color: '#2D2A96' }}>ประวัติการลา</p></Col>
                <Col span={3} offset={2}><ButtonStyledd onClick={() => setModal({ visible: true, header: "เพิ่มการลา", status: "create" })}
                    icon={<DiffOutlined />} style={{ background: '#F1BE44', width: '65%', marginTop: '60px' }}>เพิ่มการลา</ButtonStyledd></Col>
            </Row>
            <Row>
                <Col span={22} offset={1}><DividerStyledd /></Col>
                <ColText span={2} offset={6} ><ButtonStyledd style={{ border: '2px solid #FFCA18', textAlign: 'center', borderRadius: '10px', backgroundColor: '#FFCA18' }}
                    onClick={() => setTable({ header: "TableLeave"})}
                > วันลาป่วยคงเหลือ</ButtonStyledd></ColText>
                <ColText span={2} offset={1}  ><ButtonStyledd style={{ border: '2px solid #FFCA18', textAlign: 'center', borderRadius: '10px', backgroundColor: '#FFCA18' }}
                    onClick={() => { setTable({ header: "PersonalLeave"})}}>
                    วันลากิจคงเหลือ</ButtonStyledd></ColText>
            <ColText span={2} offset={1} ><ButtonStyledd style={{ border: '2px solid #FFCA18', textAlign: 'center', borderRadius: '10px', backgroundColor: '#FFCA18' }}> วันลาพักร้อนคงเหลือ</ButtonStyledd></ColText>

        </Row>{
        table?.header === "TableLeave" ?
            <Row justify='center' style={{ width: "100%", marginTop: "50px" }}>
                <TableStyled style={{ width: "70%", marginBottom: '100px' }} dataSource={lStatus} columns={columnsLeave} />
            </Row>
            : table?.header === "SickLeave" ?
                < Row justify='center' style={{ width: "100%", marginTop: "50px" }}>
                    <TableStyled style={{ width: "70%", marginBottom: '100px' }} />

                </Row>
                : null
    }


    { LeaveModal(modal, setModal, onAddLeave, leavetype, userCookie) }
    { PrintLeave(modalprint, setModalprint) }
        </div >

    );
};

const ColText = styled(Col)`
    font-size: 24px;
    font-weight: 800;
    line-height: 34px;
    letter-spacing: 0em;
    text-align: left;
    color: #2D2A96;
`
const ArrowRightOutlinedStyled = styled(ArrowRightOutlined)`
    width: 10% ;
`
const DatePickerStyled = styled(DatePicker)`
    width: 45% ;
    border-Color: #BFBFBF;
    height: 50px;
    border-Radius: 20px;
    background: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    .ant-picker-input > input {
        font-size: 24px;
      }
`
const DividerStyled = styled(Divider)`
    background: #064595 ;
    height: 2px;
    margin-top: -50px;
`
const DividerStyledd = styled(Divider)`
    background: #064595 ;
    height: 2px;
    margin-top: -60px;
`
const ButtonStyledd = styled(Button)`
    color: #064595;
    height: 50px;
    border-Radius:15px;
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
        font-size: 20px;
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

export default Leave;