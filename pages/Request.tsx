import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RequestModal from '../Components/Modal/Request_Modal'
import { Button, Form, Row, Col, Divider, DatePicker, Table, Switch, Input, notification, Typography } from 'antd';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined, PrinterOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
interface ILeave {
    detail: string
    status: string
    dragDate: Date
    uptoDate: Date
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
const Request: React.FC = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState<IModalLeave>({
        header: "",
        status: "",
        visible: false,
        value: {},
    })
    const [leave, setLeave] = useState<ILeave[]>([])
    const [leavetype, setLeaveType] = useState([
        {
            ltype_id: "",
            ltype_name: "",
        },
    ])
    const [filter, setFilter] = useState({
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
    const queryLeave = async (filter: any) => {
        setLoading(true)
        const result = await axios({
            method: 'post',
            url: `/api/leave/query`,
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
            setLeave(result?.data?.data)
            setLoading(false)
        } else {
            setLeave([])
            setLoading(false)
        }
    }
    useEffect(() => {
        queryLeave(filter)
    }, [filter, setFilter])
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
    const onAddLeave = async (value: any) => {
        const result = await axios({
          method: "post",
          url: `/api/leave/update`,
          data: { ...value, id: modal?.value?._id },
        }).catch((err) => {
          if (err) {
            // console.log(err)
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
            message: "Update sccess",
          })
          queryLeave(filter)
        } 
      }

    const columnsleave: any = [
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
            width: '20%',
            render: (_: any, record: any) => (
                <Row justify='center' gutter={0} style={{ width: "100%" }}>
                    <Col span={6} style={{ marginRight: "20px" }}>
                        <Button 
                        onClick={() => { 
                            let newModal:any = {...modal,header: "ไม่อนุมัตการ Work from home", status: "unsubmitwork", visible: true ,value: record}
                            setModal(newModal)}
                        }
                        style={{ background: 'none', border: 'none' }}>
                            <CloseCircleOutlined
                                style={{ fontSize: "24px", fontFamily: "SukhumvitSet-Bold", color: '#FE0000', }} />
                        </Button>
                    </Col>
                    <Col span={4} style={{ marginRight: "40px", }}>
                        <Button 
                        onClick={() => { 
                            let newModal:any = {...modal,header: "อนุมัตการ Work from home", status: "submitwork", visible: true ,value: record}
                            setModal(newModal)}
                        }
                        style={{ background: 'none', border: 'none' }} >
                            <CheckCircleOutlined style={{ fontSize: "24px", fontFamily: "SukhumvitSet-Bold", color: "#36FE00" }} />
                        </Button>
                    </Col>
                </Row>
            ),
        },
    ];
    

    //Wprk from home.
    const columnswork: any = [
        {
            title: 'ลำดับ',
            dataIndex: 'No',
            key: 'No',
            align: 'center',
            width:'5%'
        },
        {
            title: 'เริ่มปฏิบัติงานวันที่',
            dataIndex: 'Start_Data',
            key: 'Start_Data',
            align: 'center',
            width: '5%',
        },
        {
            title: 'รายละเอียด',
            dataIndex: 'Detail',
            key: 'Detail',
            align: 'center',
        },
        {
            title: 'บันทึกการทำงาน',
            dataIndex: 'SaveWork',
            key: 'SaveWork',
            align: 'center',

        },
        {
            title: 'สถานะ',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: '8%',
        },
        {
            title: 'การจัดการ',
            dataIndex: 'management',
            key: 'management',
            align: 'center',
            width: '20%',
            render: (_: any, record: any) => (
                <Row justify='center' gutter={0} style={{ width: "100%" }}>
                    <Col span={6} style={{ marginRight: "20px" }}>
                        <Button onClick={() => setModal({ visible: true, header: "ไม่อนุมัตการ Work from home", status: "unsubmitwork" })}
                        style={{ background: 'none', border: 'none' }}>
                            <CloseCircleOutlined
                                style={{ fontSize: "24px", fontFamily: "SukhumvitSet-Bold", color: '#FE0000', }} />
                        </Button>
                    </Col>
                    <Col span={4} style={{ marginRight: "40px", }}>
                        <Button onClick={() => setModal({visible: true, header: "อนุมัตการ Work from home", status: "submitwork"})}
                        style={{ background: 'none', border: 'none' }} >
                            <CheckCircleOutlined style={{ fontSize: "24px", fontFamily: "SukhumvitSet-Bold", color: "#36FE00" }} />
                        </Button>
                    </Col>
                </Row>
            ),
        },
    ];
    

    // Out of offsite.
    const columnsrequest: any = [
        {
            title: 'สถานที่',
            dataIndex: 'At',
            key: 'At',
            align: 'center',
        },
        {
            title: 'วันที่',
            dataIndex: 'Data',
            key: 'Data',
            align: 'center',
        },
        {
            title: 'รายละเอียด',
            dataIndex: 'Detail',
            key: 'Detail',
            align: 'center',
        },
        {
            title: 'ระยะทางขาไป',
            dataIndex: 'sdistane',
            key: 'sdistane',
            align: 'center',
        },
        {
            title: 'ระยะทางขากลับ',
            dataIndex: 'bdistane',
            key: 'bdistane',
            align: 'center',
        },
        {
            title: 'งบประมาณ',
            dataIndex: 'total',
            key: 'total',
            align: 'center',
        },
        {
            title: 'สถานะ',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
           
        },
        {
            title: 'หลักฐาน',
            dataIndex: '',
            key: '',
            align: 'center',
        },
        {
            title: 'การจัดการ',
            dataIndex: 'management',
            key: 'management',
            align: 'center',
            width: '20%',
            render: (_: any, record: any) => (
                <Row justify='center' gutter={0} style={{ width: "100%" }}>
                    <Col span={6} style={{ marginRight: "20px" }}>
                        <Button onClick={() => setModal({visible: true, header: "ไม่อนุมัติการออกนอกสถานที่", status: "unsubmitrequest"})}
                        style={{ background: 'none', border: 'none' }}>
                            <CloseCircleOutlined
                                style={{ fontSize: "24px", fontFamily: "SukhumvitSet-Bold", color: '#FE0000', }} />
                        </Button>
                    </Col>
                    <Col span={4} style={{ marginRight: "40px", }}>
                        <Button onClick={() => setModal({visible: true, header: "อนุมัติการออกนอกสถานที่", status: "submitrequest"})}
                        style={{ background: 'none', border: 'none' }} >
                            <CheckCircleOutlined style={{ fontSize: "24px", fontFamily: "SukhumvitSet-Bold", color: "#36FE00" }} />
                        </Button>
                    </Col>
                </Row>
            ),
        },
    ];
    return (
        <>
            <Row>
                <Col span={20} offset={2}><p style={{ fontSize: '60px', fontWeight: 'bold', paddingTop: '20px', paddingBottom: '-10px' }}>คำขอรออนุมัติ</p></Col>
            </Row>
            <Row justify="center">
                <Col span={22}><DividerStyled /></Col>
            </Row>
            <Row>

                <Col span={12} offset={5}><Form.Item><Input style={{ borderRadius: "16px", width: '100%', height: '47px', fontSize: '18px', background: '#fff', boxShadow: '0px 4px 4px rgb(0 0 0 / 25%)' }} /></Form.Item></Col>
                <Col span={3} offset={1}><ButtonStyledd icon={<SearchOutlined />} style={{ background: '#F1BE44', width: '150px' }}>Search</ButtonStyledd></Col>
            </Row>
            <Row justify='center' style={{ marginTop: "10px" }}>
                <Col span={18} offset={0}>
                <p style={{ marginBottom: '0px',fontSize: '33px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> การลา</p>
                <TableStyled pagination={false} style={{ width: "100%" }} dataSource={leave} columns={columnsleave} />
                </Col>
            </Row>
            <Row justify='center' style={{ marginTop: "10px" }}>
                <Col span={18} offset={0}>
                <p style={{ marginBottom: '0px',fontSize: '33px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> Work From Home</p>
                <TableStyled pagination={false} style={{ width: "100%" }} columns={columnswork} />
                </Col>
            </Row>
            <Row justify='center' style={{ marginTop: "10px" }}>
                <Col span={18} offset={0}>
                <p style={{ marginBottom: '0px',fontSize: '33px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> ขออนุญาตออกนอกสถานที่</p>
                <TableStyled pagination={false} style={{ width: "100%" ,marginBottom:'100px'}} columns={columnsrequest} />
                </Col>
            </Row>
            { RequestModal(modal, setModal,onAddLeave) }
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
export default Request;