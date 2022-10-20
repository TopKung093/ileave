import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Column } from '@ant-design/plots';
import { Button, Form, Row, Col, Divider, DatePicker, Table, Switch, Input } from 'antd';
import { SearchOutlined, UserAddOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const App: React.FC = () => {
  const [modal, setModal] = useState({})
  const [status, setStatus] = useState()
  
  const data = [
    {
      "Month": "January",
      "type": "Leave",
      "value": 3
    },
    {
      "Month": "January",
      "type": "Work from home",
      "value": 5
    },
    {
      "Month": "January",
      "type": "Reauest to offsite",
      "value": 1
    },
    {
      "Month": "January",
      "type": "Sick Leave",
      "value": 1
    },
    {
      "Month": "February",
      "type": "Leave",
      "value": 1
    },
    {
      "Month": "February",
      "type": "Work from home",
      "value": 1
    },
    {
      "Month": "February",
      "type": "Reauest to offsite",
      "value": 1
    },
    {
      "Month": "February",
      "type": "Sick Leave",
      "value": 1
    },
    {
      "Month": "March",
      "type": "Leave",
      "value": 1
    },
    {
      "Month": "March",
      "type": "Work from home",
      "value": 1
    },
    {
      "Month": "March",
      "type": "Reauest to offsite",
      "value": 1
    },
    {
      "Month": "March",
      "type": "Sick Leave",
      "value": 1
    },
    {
      "Month": "April",
      "type": "Leave",
      "value": 1
    },
    {
      "Month": "April",
      "type": "Work from home",
      "value": 1
    },
    {
      "Month": "April",
      "type": "Reauest to offsite",
      "value": 1
    },
    {
      "Month": "April",
      "type": "Sick Leave",
      "value": 1
    },
    {
      "Month": "May",
      "type": "Leave",
      "value": 1
    },
    {
      "Month": "May",
      "type": "Work from home",
      "value": 1
    },
    {
      "Month": "May",
      "type": "Reauest to offsite",
      "value": 1
    },
    {
      "Month": "May",
      "type": "Sick Leave",
      "value": 1
    },
    {
      "Month": "June",
      "type": "Leave",
      "value": 1
    },
    {
      "Month": "June",
      "type": "Work from home",
      "value": 1
    },
    {
      "Month": "June",
      "type": "Reauest to offsite",
      "value": 1
    },
    {
      "Month": "June",
      "type": "Sick Leave",
      "value": 1
    },
    {
      "Month": "July",
      "type": "Leave",
      "value": 1
    },
    {
      "Month": "July",
      "type": "Work from home",
      "value": 1
    },
    {
      "Month": "July",
      "type": "Reauest to offsite",
      "value": 1
    },
    {
      "Month": "July",
      "type": "Sick Leave",
      "value": 1
    },
    {
      "Month": "August",
      "type": "Leave",
      "value": 1
    },
    {
      "Month": "August",
      "type": "Work from home",
      "value": 1
    },
    {
      "Month": "August",
      "type": "Reauest to offsite",
      "value": 1
    },
    {
      "Month": "August",
      "type": "Sick Leave",
      "value": 2
    },
    {
      "Month": "September",
      "type": "Leave",
      "value": 3
    },
    {
      "Month": "September",
      "type": "Work from home",
      "value": 2
    },
    {
      "Month": "September",
      "type": "Reauest to offsite",
      "value": 1
    },
    {
      "Month": "September",
      "type": "Sick Leave",
      "value": 2
    },
    {
      "Month": "October",
      "type": "Leave",
      "value": 3
    },
    {
      "Month": "October",
      "type": "Work from home",
      "value": 2
    },
    {
      "Month": "October",
      "type": "Reauest to offsite",
      "value": 1
    },
    {
      "Month": "October",
      "type": "Sick Leave",
      "value": 2
    },
    {
      "Month": "November",
      "type": "Leave",
      "value": 3
    },
    {
      "Month": "November",
      "type": "Work from home",
      "value": 2
    },
    {
      "Month": "November",
      "type": "Reauest to offsite",
      "value": 2
    },
    {
      "Month": "November",
      "type": "Sick Leave",
      "value": 2
    },
    {
      "Month": "December",
      "type": "Leave",
      "value": 3
    },
    {
      "Month": "December",
      "type": "Work from home",
      "value": 2
    },
    {
      "Month": "December",
      "type": "Reauest to offsite",
      "value": 2
    },
    {
      "Month": "December",
      "type": "Sick Leave",
      "value": 2
    },
  ];
  const config = {
    data,
    xField: 'Month',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
    columnStyle: {
      radius: [0, 0, 0, 0],
      
    },
   
  };
  
  const dataSource = [
    {
     
    },
    {
      

    }

  ];
  const columns: any = [
    {
      title: 'ลำดับ',
      dataIndex: 'No',
      key: 'No',
      align: 'center',
    },
    
    {
      title: 'ชื่อ',
      dataIndex: 'Firsh_Name',
      key: 'Firsh_Name',
      align: 'center',
    },
    {
      title: 'นามสกุล',
      dataIndex: 'Last_Name',
      key: 'Last_Name',
      align: 'center',
    },
    {
      title: 'วันลาป่วยคงเหลือ',
      dataIndex: 'sleave',
      key: 'sleave',
      align: 'center',
    },
    {
      title: 'วันลากิจคงเหลือ',
      dataIndex: 'wleave',
      key: 'wleave',
      align: 'center',
    },
    {
      title: 'วันลาพักร้อนคงเหลือ',
      dataIndex: 'hleave',
      key: 'hleave',
      align: 'center',
    }
    
  ];



  return (
    <>
      <Row>
        <Col span={20} offset={2}><p style={{ fontSize: '60px', fontWeight: 'bold', paddingTop: '20px', paddingBottom: '-10px' }}>รายงานผลรวม</p></Col>
      </Row>
      <Row justify="center">
        <Col span={22}><DividerStyled /></Col>
      </Row>
      <Row justify="center">
        <Col span={11} >
          <Form.Item><DatePickerStyled /><ArrowRightOutlinedStyled /><DatePickerStyled /></Form.Item></Col>
        <Col span={3} offset={1}><ButtonStyledd icon={<SearchOutlined />} style={{ background: '#F1BE44', width: '150px' }}>ค้นหา</ButtonStyledd></Col>
      </Row>
      <Row justify="center">
        <Col span={15}>
      <Column {...config} />
      </Col>
      </Row>
      
      <Row justify="center">
        <Col span={12} offset={1}><Form.Item><Input style={{ marginTop:'50px',borderRadius: "16px", width: '100%', height: '47px', fontSize: '18px', background: '#fff',boxShadow: '0px 4px 4px rgb(0 0 0 / 25%)' }} /></Form.Item></Col>
        <Col span={3} offset={1}><ButtonStyledd icon={<SearchOutlined />} style={{marginTop:'50px', background: '#F1BE44', width: '150px' }}>ค้นหา</ButtonStyledd></Col>
      </Row>
      <Row justify='center' style={{ width: "100%", marginTop: "10px" }}>
        <TableStyled pagination={false} style={{ width: "70%",marginBottom:'100px' }} dataSource={dataSource} columns={columns} />
      </Row>
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
export default App;