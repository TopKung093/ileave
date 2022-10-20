import React, { useState } from 'react';
import styled from 'styled-components';
import NavbarHead from '../Components/Layout/Navbar'
import WorkFromHomeModal from '../Components/Modal/Sick_Leave_Modal'
import PrintLeave from '../Components/Modal/Print_Leave'
import { Button, Form, Row, Col, Divider, DatePicker, Table, Switch } from 'antd';
import { SearchOutlined, DiffOutlined, FormOutlined, DeleteFilled, PrinterOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Navbar from '../Components/Layout/Navbar';

const { RangePicker } = DatePicker;

const App: React.FC = (user):any => {
    const [modal, setModal] = useState({})
    const [modalprint, setModalprint] = useState({})
    const [status, setStatus] = useState()
    const onChangeStatus = (checked: boolean) => {
        console.log(`switch to ${checked}`);
        // setStatus(checked)
    };

    const dataSource = [
        {
            No: '',
            Start_Data: '',
            Detail: '',
            SaveWork: '',
            status: ''
        },
        {
            No: '',
            Start_Data: '',
            Detail: '',
            SaveWork: '',
            status: '',
        }

    ];
    const columns: any = [
        {
            title: 'ลำดับ',
            dataIndex: 'No',
            key: 'No',
            align: 'center',
            width: '5%'
        },
        {
            title: 'เริ่มปฏิบัติงานวันที่',
            dataIndex: 'Start_Data',
            key: 'Start_Data',
            align: 'center',
           
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
            width: '10%',
            render: (_: any, record: any) => (
                <Row justify='center' gutter={0} style={{ width: "100%" }}>
                    <Col span={4} offset={2} style={{ marginRight: "40px", }}>
                        <Button
                            onClick={() => setModalprint({ visible: true, header: "ใบลากิจ", status: "Leave" })}
                            style={{ background: 'none', border: 'none' }} >
                            <PrinterOutlined style={{ fontSize: "24px", fontFamily: "SukhumvitSet-Bold", color: "#064595" }} />
                        </Button>
                    </Col>
                </Row>
            ),
        },
    ];
    return (
        <>
            <Row>
                <Col span={20} offset={2}><p style={{ fontSize: '60px', fontWeight: 'bold', paddingTop: '20px', paddingBottom: '-10px' }}>Work Form Home</p></Col>
            </Row>
            <Row justify="center">
                <Col span={22}><DividerStyled /></Col>
            </Row>
            <Row justify="center">
                <Col span={11} >
                    <Form.Item><DatePickerStyled /><ArrowRightOutlinedStyled /><DatePickerStyled /></Form.Item></Col>
                <Col span={3} offset={1}><ButtonStyledd icon={<SearchOutlined />} style={{ background: '#F1BE44', width: '150px' }}>Search</ButtonStyledd></Col>
            </Row>
            <Row>
                <Col span={15} offset={2}><p style={{ fontSize: '60px', fontWeight: 'bold', paddingTop: '30px' }}>Work At Home History</p></Col>
                <Col span={3} offset={2}><ButtonStyledd onClick={() => setModal({ visible: true, header: "เพิ่มงานประจำวัน", status: "WFH" })}
                    icon={<DiffOutlined />} style={{ background: '#F1BE44', width: '85%', marginTop: '60px' }}>Add Work at Home</ButtonStyledd></Col>
            </Row>
            <Row justify="center">
                <Col span={22}><DividerStyledd /></Col>
            </Row>
            <Row justify='center' style={{ width: "100%", marginTop: "10px" }}>
                <TableStyled pagination={false} style={{ width: "70%" ,marginBottom:'100px'}} dataSource={dataSource} columns={columns} />
            </Row>
            {WorkFromHomeModal(modal, setModal)}
            {PrintLeave(modalprint, setModalprint)}
        </>
    );
};

const ArrowRightOutlinedStyled = styled(ArrowRightOutlined)`
    width: 10% ;
`
const DatePickerStyled = styled(DatePicker)`
    width: 45% ;
    borderColor: #BFBFBF;
    height: 50px;
    border-Radius: 20px;
    background: #fff;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
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
    border-Radius:20px;
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

export default App;