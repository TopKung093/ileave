import React, { useEffect, useState } from 'react'
import { Modal, Row, Col, Form, Input, Select, Button, Divider, message, Upload, DatePicker, Typography } from 'antd'
import styled from 'styled-components'
import { Types } from 'mongoose';

interface IFormValue {
    detail: string
    dragDate: Date
    uptoDate: Date
    number: Number
    status: string
    ltype_id: string
    user_id:Types.ObjectId
    id?:string
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
const LeaveModal = (modal: any, setModal: any, onAddLeave: any, leavetype: any, userCookie: any) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const onFinish = (values: IFormValue) => {
        form.resetFields()
        onAddLeave(values)
        setModal({ value: values, visible: false })
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        (modal?.status === "create")
        form.setFieldsValue({
            status: "รออนุมัติ",
            user_id:userCookie.id
        })
    }, [modal, setModal])
    const [oCLeaveType, setoCLeaveType] = useState(leavetype?.ltype_id)
    const onChangeLeaveType: any = (value: string) => {
        console.log(`selected ${value}`)
        setoCLeaveType(value)
    }
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
                <Form name="basic"
                    layout='vertical'
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                    {modal?.status === "create" ?
                        <>
                            <Row>
                                <Col span={8} offset={2}>
                                    <Form.Item label="ประเภทการลา" name="ltype_id">
                                        <SelectStyled
                                            showSearch
                                            size="large"
                                            placeholder=""
                                            onChange={onChangeLeaveType}
                                            optionFilterProp="children"
                                            disabled={modal?.status === "detail" && true}
                                            filterOption={(input, option) =>
                                                (option!.children as unknown as string)
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }
                                        >
                                            {leavetype !== undefined &&
                                                leavetype?.map((value: any, index: number) => (
                                                    <Option key={index} value={value?.ltype_id}>
                                                        {value?.ltype_name}
                                                    </Option>
                                                ))}
                                        </SelectStyled>
                                    </Form.Item></Col>
                                <Col span={8} offset={3}>
                                    <Form.Item label="สถานะ" name="status" hidden={true}>
                                        <InputStyled disabled />
                                    </Form.Item>
                                    <Form.Item label="user_id" name="user_id" hidden={true}>
                                        <InputStyled disabled />
                                    </Form.Item>
                                    <Form.Item label="จำนวนวันลา" name="number">
                                        <InputStyled />
                                    </Form.Item>
                                </Col>

                                <Col span={8} offset={2}>
                                    <Form.Item label="ลาจากวันที่" name="dragDate">
                                        <DatePickerStyled />
                                    </Form.Item>
                                </Col>
                                <Col span={8} offset={3}>
                                    <Form.Item label="ถึงวันที่" name="uptoDate">
                                        <DatePickerStyled />
                                    </Form.Item>
                                </Col>
                                <Col span={20} offset={2}>
                                    <Form.Item label="สาเหตุการลา" name="detail">
                                        <Input.TextArea name="detailInput" autoSize={{ minRows: 4, maxRows: 6 }}
                                            style={{ borderRadius: "20px", width: '100%', height: '50px', fontSize: '16px', background: '#FFF', borderColor: '#BFBFBF', marginTop: '-10px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }} />
                                    </Form.Item>
                                </Col>
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
export default LeaveModal