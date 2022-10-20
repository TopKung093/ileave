import React, { useEffect, useState } from 'react'
import { Modal, Row, Col, Form, Input, Select, Button, Divider, message, Upload, DatePicker, Typography } from 'antd'
import styled from 'styled-components'
const { Title } = Typography;
interface IFormValue {
    detail: string
    status: string
    dragDate: Date
    uptoDate: Date
    approver: string
    user_id: string
    ltype_id: string
    id?: string
    delete?: string
}
const RequestModal = (modal: any, setModal: any,onAddLeave: any) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const onFinish = (values: IFormValue) => {
        form.resetFields()
        onAddLeave(values)
        setModal({ value: values, visible: false })
    }
    useEffect(() => {
        if(modal?.status === "submitwork"){
            form.setFieldsValue({
            status: "อนุมัติ"
        })
        }else if(modal?.status === "unsubmitwork"){
            form.setFieldsValue({
                status: "ไม่อนุมัติ"
            })
        }
        
        console.log('status===>', modal?.value?.status);

    }, [modal, setModal])
    return (
        <>
            <ModalStyled
                visible={modal?.visible}
                footer={false}
                width={900}
                centered
                onCancel={() => setModal({ visible: false })}
                onOk={() => setModal({ visible: false })}>
                <Col span={20} offset={0}
                    style={{ fontSize: '35px', fontWeight: 'bold' }}>{modal?.header}</Col>
                <Col span={24}><DividerStyled /></Col>
                <Form
                    name="basic"
                    layout='vertical'
                    form={form}
                    onFinish={onFinish}>
                    {modal?.status === "submitwork" ?
                        <>
                            <Row>
                                <Form.Item style={{ width: '100%' }} name="status">
                                    <Title style={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '30px' }}>คุณต้องการอนุมัติการ Work from home ใช่หรือไม่ ?</Title>
                                    <Input disabled hidden={true}/>
                                </Form.Item>
                            </Row>
                        </>
                        : modal?.status === "unsubmitwork" ?
                            <>
                                <Row>
                                    <Form.Item style={{ width: '100%' }} name="status">
                                        <Title style={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '30px' }}>คุณไม่ต้องการอนุมัติการ Work from home ใช่หรือไม่ ?</Title>
                                        <Input disabled hidden={true}/>
                                    </Form.Item>
                                </Row>
                            </>
                            : modal?.status === "submitleave" ?
                                <>
                                    <Row>
                                        <Form.Item style={{ width: '100%' }}>
                                            <Title style={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '30px' }}>คุณต้องการอนุมัตการลาใช่หรือไม่ ?</Title>
                                        </Form.Item>
                                    </Row>
                                </>
                                : modal?.status === "unsubmitleave" ?
                                    <>
                                        <Row>
                                            <Form.Item style={{ width: '100%' }}>
                                                <Title style={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '30px' }}>คุณไม่ต้องการอนุมัตการลาใช่หรือไม่ ?</Title>
                                            </Form.Item>
                                        </Row>
                                    </>
                                    : modal?.status === "submitrequest" ?
                                        <>
                                            <Row>
                                                <Form.Item style={{ width: '100%' }}>
                                                    <Title style={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '30px' }}>คุณต้องการอนุมัติการออกนอกสถานที่ใช่หรือไม่ ?</Title>
                                                </Form.Item>
                                            </Row>
                                        </>
                                        : modal?.status === "unsubmitrequest" ?
                                            <>
                                                <Row>
                                                    <Form.Item style={{ width: '100%' }}>
                                                        <Title style={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '30px' }}>คุณไม่ต้องการอนุมัติการออกนอกสถานที่ใช่หรือไม่ ?</Title>
                                                    </Form.Item>
                                                </Row>
                                            </>
                                            : null
                    }
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
        </>
    )
}
const Formstyle = styled(Form)`
.ant-form-item-label > label {
    font-weight: 900;
    font-size: 22px;
}
`
const InputStyled = styled(Input)`
    border-radius: 14px;
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
export default RequestModal