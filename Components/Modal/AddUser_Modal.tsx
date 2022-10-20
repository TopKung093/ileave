import React, { useEffect, useState } from 'react'
import { Modal, Row, Col, Form, Input, Select, Button, Divider, message, Upload, DatePicker, Typography, } from 'antd'
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import styled from 'styled-components'
import Layout from 'antd/lib/layout/layout';
interface IFormValue {
    id?: string
    user_id: string
    name: string,
    lastname: string,
    phone: string,
    level: string,
    username: string,
    password: string,
    position_id: string,
    role_id: string,
    department_id: string
    delete?: string
}
const AddUserModal = (modal: any, setModal: any, onUser: any, position: any, department: any, role: any) => {
    const [form] = Form.useForm();
    const [userPosition, setUserPosition] = useState(position?.pos_id)
    const [userDepartment, setUserDepartment] = useState(department?.dep_id)
    const [userRole, setUserRole] = useState(role?.role_id)
    const onFinish = (values: IFormValue) => {
        onUser(
            modal?.status === "delete" ? modal?.value?._id : values,
            modal?.status
        )
        form.resetFields()
        setModal({ value: values || {}, visible: false })
    }

    const onChangeRole: any = (value: string) => {
        console.log(`selected ${value}`)
        setUserRole(value)
    }
    const onChangePosition: any = (value: string) => {
        console.log(`selected ${value}`)
        setUserPosition(value)
    }
    const onChangeDepartment: any = (value: string) => {
        console.log(`selected ${value}`)
        setUserDepartment(value)
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const { Option } = Select;
    useEffect(() => {
        if (modal?.status === "update") {
            form.setFieldsValue({
                user_id: modal?.value?.user_id,
                name: modal?.value?.name,
                lastname: modal?.value?.lastname,
                phone: modal?.value?.phone,
                level: modal?.value?.level,
                position_id: modal?.value?.pos_id,
                department_id: modal?.value?.dep_id,
                role_id: modal?.value?.role_id
            })
        } else if (modal?.status === "create") {
            form.setFieldsValue({
                user_id: ''
            })
        }
    }, [modal, setModal])
    return (
        <ModalStyled
            visible={modal?.visible}
            footer={false}
            width={900}
            centered
            onCancel={() => setModal({ visible: false })}
            onOk={() => setModal({ visible: false })}>
            <Form
                name="basic"
                layout="vertical"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                
            >
                <Form.Item>
                    <Row>
                        <Col span={20} offset={0}
                            style={{ fontSize: '35px', fontWeight: 'bold' }}>{modal?.header}</Col>
                        <Col span={24}><DividerStyled /></Col>
                        {modal?.status === "delete" ? (
                            <>
                                <Row justify="center" style={{ width: "100%", margin: "40px 0px" }}>
                                    <Typography style={{ textAlign: "center" }}>
                                        {("endpoints-delete-data")} {modal?.value?.username} {("common-confirm-delete-check")}
                                    </Typography>
                                </Row>
                            </>
                        ) : (
                            <>
                                <Col span={8} offset={2}>
                                    <p style={{ marginBottom: '0px', fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}>รหัสพนักงาน</p>
                                    <Form.Item name="user_id">
                                        <InputStyled style={{ width: '100%' }} /></Form.Item>
                                </Col>
                                <Col span={8} offset={3}>
                                    <p style={{ marginBottom: '0px', fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}>ระดับการทำงาน</p>
                                    <Form.Item name="level">
                                        <InputStyled style={{ width: '100%' }} /></Form.Item>
                                </Col>
                                <Col span={8} offset={2}>
                                    <p style={{ marginBottom: '0px', fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> ชื่อ</p>
                                    <Form.Item name="name">
                                        <InputStyled style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8} offset={3}>
                                    <p style={{ marginBottom: '0px', fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> นามสกุล</p>
                                    <Form.Item name="lastname">
                                        <InputStyled style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8} offset={2}>
                                    <p style={{ marginBottom: '0px', fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> เบอร์โทร</p>
                                    <Form.Item name="phone">
                                        <InputStyled style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8} offset={3}>
                                    <p style={{ marginBottom: '0px', fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> ชื่อผู้ใช้</p>
                                    <Form.Item name="username">
                                        <InputStyled style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8} offset={2}>
                                    <p style={{ marginBottom: '0px', fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> รหัสผ่าน</p>
                                    <Form.Item name="password">
                                        <InputStyled style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8} offset={3}>
                                    <p style={{ marginBottom: '0px', fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}></p>
                                    <Form.Item label="ตำแหน่ง" name="position_id">
                                        <SelectStyled
                                            showSearch
                                            size="large"
                                            placeholder=""
                                            onChange={onChangePosition}
                                            optionFilterProp="children"
                                            disabled={modal?.status === "detail" && true}
                                            filterOption={(input, option) =>
                                                (option!.children as unknown as string)
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }
                                        >
                                            {position !== undefined &&
                                                position?.map((value: any, index: number) => (
                                                    <Option key={index} value={value?.pos_id}>
                                                        {value?.pos_name}
                                                    </Option>
                                                ))}
                                        </SelectStyled>
                                    </Form.Item>
                                </Col>
                                <Col span={8} offset={2}>
                                    <p style={{ marginBottom: '0px', fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> </p>
                                    <Form.Item label="หน้าที่" name="role_id">
                                        <SelectStyled
                                            showSearch
                                            size="large"
                                            placeholder=""
                                            onChange={onChangeRole}
                                            optionFilterProp="children"
                                            disabled={modal?.status === "detail" && true}
                                            filterOption={(input, option) =>
                                                (option!.children as unknown as string)
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }
                                        >
                                            {role !== undefined &&
                                                role?.map((value: any, index: number) => (
                                                    <Option key={index} value={value?.role_id}>
                                                        {value?.role_name}
                                                    </Option>
                                                ))}
                                        </SelectStyled>
                                    </Form.Item>
                                </Col>
                                <Col span={8} offset={3}>
                                    <p style={{ marginBottom: '0px', fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '20px' }}></p>
                                    <Form.Item label='แผนก' name="department_id">
                                        <SelectStyled
                                            showSearch
                                            size="large"
                                            placeholder=""
                                            onChange={onChangeDepartment}
                                            optionFilterProp="children"
                                            disabled={modal?.status === "detail" && true}
                                            filterOption={(input, option) =>
                                                (option!.children as unknown as string)
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }
                                        >
                                            {department !== undefined &&
                                                department?.map((value: any, index: number) => (
                                                    <Option key={index} value={value?.dep_id}>
                                                        {value?.dep_name}
                                                    </Option>
                                                ))}
                                        </SelectStyled>
                                    </Form.Item>
                                </Col>
                            </>
                        )}
                    </Row>
                </Form.Item>
                <Row justify="center">
                    <Col span={4} offset={12}>
                        <ButtonStyledd onClick={() => {
                            form.resetFields()
                            setModal({ visible: false })
                        }}
                            style={{ background: '#F1BE44', fontSize: '22px' }}>ยกเลิก</ButtonStyledd>
                    </Col>
                    <Col span={4} offset={1}>
                        <ButtonStyledd htmlType="submit"
                            style={{ background: '#F1BE44', fontSize: '22px' }}>ยืนยัน</ButtonStyledd>
                    </Col>
                </Row>
            </Form>
        </ModalStyled>
    )

}

const InputStyled = styled(Input)`
    border-radius: 16px;
    width: 40%;
    height: 40px;
    font-size: 20px;
    background: rgb(255, 255, 255);
    border-color: rgb(191, 191, 191);
    margin-top: -20px;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 10%);
`
const SelectStyled = styled(Select)`
    width: 100%;
    margin-Top: -10px;
    font-size: 20px;
    .ant-select-selector {
        border-radius: 14px !important;
        border-color: #BFBFBF !important;
      } 
    
`
const ButtonStyledd = styled(Button)`
    color: #064595;
    height: 40px;
    border-Radius:10px;
    font-Size: 16px;
    fontFamily: Semi Bold;
    font-weight: bold;
    width: 100%;
    
`
const DatePickerStyled = styled(DatePicker)`
    width: 100% ;
    border-Color: #BFBFBF;
    height: 50px;
    border-Radius: 14px;
    background: #FFF;
    margin-Top: -10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    .ant-picker-input > input {
        font-size: 24px;
      }
`
const DividerStyled = styled(Divider)`
    background: #064595 ;
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
const UploadStyled = styled(Upload)`
.ant-upload.ant-upload-select-picture-card {
    width: 200px;
    height: 200px;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;
    vertical-align: top;
    background-color: #fafafa;
    border: 1px dashed #d9d9d9;
    border-radius: 15px;
    cursor: pointer;
    transition: border-color 0.3s;
}
`
export default AddUserModal