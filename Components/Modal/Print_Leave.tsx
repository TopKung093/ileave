import React, { useEffect, useState } from 'react'
import { Modal, Row, Col, Form, Select, Button, Divider, Table, DatePicker, Typography, notification } from 'antd'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
const { Title } = Typography;
interface ILeave {
    detail: string
    status: string
    dragDate: Date
    uptoDate: Date
    number: Number
    approver: string
    user_id: string
    ltype_id: String
    createdAt:Date
}

const PrintModal = (
    modalprint: any,
    setModalprint: any) => {
    console.log('modalprint=========>',modalprint)
    const [form] = Form.useForm();
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [leave, setLeave] = useState<ILeave[]>([])
    const [leavetype, setLeaveType] = useState([
        {
            ltype_id: "",
            ltype_name: "",
        },
    ])
    const [ltypefilter, setLtypeFilter] = useState({
        "where": {},
        "query": "",
        "limit": 10,
        "skip": 0
    })
    const [filter, setFilter] = useState({
        "where": {},
        "query": "",
        "limit": 10,
        "skip": 0
    })
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
    const columns: any = [
        {
            title: 'วันที่เขียนใบลา',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
        },
        {
            title: 'สาเหตุการลา',
            dataIndex: 'detail',
            key: 'detail',
            align: 'center',
        },
        {
            title: 'ลากจากวันที่',
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
            title: 'จำนวนวันลา',
            dataIndex: 'number',
            key: 'number',
            align: 'center',
        },
        {
            title: 'วันลาที่เหลือ',
            dataIndex: 'Total_Leave',
            key: 'Total_Leave',
            align: 'center',
        },
        {
            title: 'ลายเซ็นผู้ลา',
            dataIndex: 'user',
            key: 'user',
            align: 'center',
        },
        {
            title: 'ลายเซ็นหัวหน้า',
            dataIndex: 'Sig_Leader',
            key: 'Sig_Leader',
            align: 'center',
        },
        {
            title: 'ผู้อนุมัติ',
            dataIndex: 'USubmit',
            key: 'USubmit',
            align: 'center',
        },
    ]
    return (
        <>
            <Row>
                <ModalStyled
                    visible={modalprint?.visible}
                    footer={false}
                    width={1200}

                    onCancel={() => setModalprint({ visible: false })}>
                    <Row justify="center" >
                        <Col span={20} offset={11}><img src="../images/1.png" width='50%' /></Col>
                        <Col span={20} offset={1}><Title style={{ textAlign: 'center' }}>บริษัท ไอแอพพ์เทคโนโลยี จำกัด</Title></Col>
                    </Row>
                    <Row justify="center" >
                        {modalprint?.status === "Leave" ?
                            <>
                                <Col span={20} offset={18}><Title level={2} style={{ fontWeight: '100', paddingTop: '30px' }}>ใบลาประจำปี 2565</Title></Col>
                                <ColStyledFont span={21}>{modalprint?.data?.status}, ชื่อ - สกุล ............................................................................ ตำแหน่ง .............................ระดับ.............................</ColStyledFont>
                                <ColStyledFont span={21} style={{ textAlign: 'center', border: '1px solid #000' }}>ลาป่วย-หักเงินตามวันที่ลา(กรณีเข้าสายโดยไม่มีเหตุอันควร/ไม่ได้รับการอนุมัติจากบริษัท 3 ครั้งนับเป็นขาดงาน 1 ครั้ง)</ColStyledFont>
                                <ColStyledFont span={21}><TableStyled style={{ width: "100%" }} dataSource={leave} columns={columns} /></ColStyledFont>
                            
                                <ColStyledFont span={21} style={{ textAlign: 'center',border:'1px solid #000'}}>ลากิจ-หักเงินตามวันที่ลา(กรณีเข้าสายโดยไม่มีเหตุอันควร/ไม่ได้รับการอนุมัติจากบริษัท 3 ครั้งนับเป็นขาดงาน 1 ครั้ง)</ColStyledFont>
                                <ColStyledFont span={21}><TableStyled style={{ width: "100%" }} columns={columns} /></ColStyledFont>
                            </>
                            : modalprint?.status === "Request-to-offsite" ?
                                <>
                                    <Col span={20} offset={16}><Title level={2} style={{ fontWeight: '100', paddingTop: '30px' }}>เอกสารปฏิบัติงานนอกสถานที่</Title></Col>
                                    <Col span={22} style={{ paddingTop: '20px' }}><DividerStyled /></Col>
                                    <ColStyledFont span={21} offset={1}>เรียน  ผู้อำนวยการฝ่ายบุคคล</ColStyledFont>
                                    <ColStyledFont span={21} offset={1}>ขาพเจ้า..............................................................................................ตำแหน่ง............................................................................</ColStyledFont>
                                    <ColStyledFont span={21} offset={1}>แผนก.......................................................ขอนุญาตปฎิบัติงานนอกสถานที่............................................................................</ColStyledFont>
                                    <ColStyledFont span={21} offset={1}>รายละเอียด.............................................................................................................................................................................................</ColStyledFont>
                                    <ColStyledFont span={21} offset={1}>.................................................................................................................................................................................................</ColStyledFont>
                                    <ColStyledFont span={21} offset={1}>ในวันที่..........................................................................เวลา.....................................................................................น.</ColStyledFont>
                                    <ColStyledFont span={21} offset={1}>ระยะทางในการเดินทาง(ขาไป)...........................................ระยะทางในการเดินทาง(ขากลับ).........................................</ColStyledFont>
                                    <ColStyledFont span={21} offset={1}>งบประมาณในการเดินทาง....................................................................บาท</ColStyledFont>
                                    <ColStyledFont span={21} offset={1} style={{ textAlign: 'right', paddingTop: '100px', paddingRight: '20px' }}>(ลงชื่อหัวหน้าแผนก)</ColStyledFont>
                                    <ColStyledFont span={21} offset={1} style={{ textAlign: 'right' }}>.........................................</ColStyledFont>
                                    <ColStyledFont span={21} offset={1} style={{ textAlign: 'right' }}>(.........................................)</ColStyledFont>
                                    <ColStyledFont span={21} offset={1} style={{ textAlign: 'right' }}>........./....................../..........</ColStyledFont>
                                </>
                                : null
                        }
                    </Row>
                </ModalStyled>
            </Row>

        </>
    )
}

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
        border-bottom: 1px solid white;
        font-size: 18px;
    }
    .ant-table-tbody>tr: last-child >td {
        border-bottom: none;
    }
    .ant-table-thead>tr>th {
        position: relative;
        color: #000;
        background: #fff !important;
        font-size: 22px;
        border: 0.5px solid #000;
    }
    .ant-table-tbody>tr>td {
        /* border-bottom: 1px solid #000; */
        transition: background 0.3s;
        background: #fff;
        border: 0.5px solid #000;
        font-size: 20px;

    }
    .ant-table-tbody>tr: last-child >td {
        border-bottom: none;
        border: 1px solid #000;
    }
    .ant-table-tbody>tr >td : last-child{
        border-right: none;
        border: 0.5px solid #000;
    }
    .ant-table-pagination {
        display: none;
        flex-wrap: wrap;
        row-gap: 8px;
    }
`
const ColStyledFont = styled(Col)`
    font-Size: 26px;
    color: #000;
    text-Align:left;
    margin-Top:20px;
    margin-bottom: -20px;

`

const ButtonStyledd = styled(Button)`
    color: #064595;
    height: 40px;
    border-Radius:20px;
    font-Size: 16px;
    font-Family: Semi Bold;
    font-weight: bold;
    width: 100%;
`
const DividerStyled = styled(Divider)`
    background: #000 ;
    height: 2px;
    margin-top: 0px;
    width: 100%;
`
const ModalStyled = styled(Modal)`
    .ant-modal-content {
        border-radius: 46px;
        padding: 30px;
    }

    .ant-modal-close {
        margin-top: 20px;
        margin-right: 30px;
    }

    .ant-modal-close-x {
        font-size: 22px;
    }
`

export default PrintModal