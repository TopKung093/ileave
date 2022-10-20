import React, { useEffect, useState } from 'react'
import { Modal, Row, Col, Form, Input, Select, Button, Divider, message, Upload, DatePicker, Space } from 'antd'
import { LoadingOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import styled from 'styled-components'
import type { FormInstance } from 'antd/es/form';

// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
// };
// const tailLayout = {
//     wrapperCol: { offset: 8, span: 16 },
// };
const { RangePicker } = DatePicker;
const GroupModal = (
    modal: any,
    setModal: any) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const formRef = React.createRef<FormInstance>();
    const { Option } = Select;
    // onGenderChange = (value: string) => {
    //     switch (value) {
    //         case 'male':
    //             this.formRef.current!.setFieldsValue({ note: 'Hi, man!' });
    //             return;
    //         case 'female':
    //             this.formRef.current!.setFieldsValue({ note: 'Hi, lady!' });
    //             return;
    //         case 'other':
    //             this.formRef.current!.setFieldsValue({ note: 'Hi there!' });
    //     }
    // };

    // const onFinish = (values: any) => {
    //     console.log(values);
    // };

    // const onReset = () => {
    //     formRef.current!.resetFields();
    // };

    // const onFill = () => {
    //     formRef.current!.setFieldsValue({
    //         note: 'Hello world!',
    //         gender: 'male',
    //     });
    // };
    const [form] = Form.useForm();

    const handleChange = () => {
        form.setFieldsValue({ sights: [] });
    };



    useEffect(() => {
        form.setFieldsValue({
            groupname: modal?.value?.group, //form.item > name="name"
            status: 1, //form.item > name="status"
        })
    }, [modal, setModal])


    return (
        <ModalStyled
            visible={modal?.visible}
            footer={false}
            width={900}
            centered
            onCancel={() => setModal({ visible: false })}>
            <Form ref={formRef} name="control-ref">
                <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        <Option value="female">รถโดยสาร</Option>
                        <Option value="other">รถส่วนตัว</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                >
                    {({ getFieldValue }) =>
                        getFieldValue('gender') === 'other' ? (
                            <Form.Item
                                name="customizeGender"
                                label="Customize Gender"
                                rules={[{ required: true }]}
                            >
                                <Input />
                                <Input />
                            </Form.Item>
                        ) : getFieldValue('gender') === 'female' ? (<Form.List name="sights">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(field => (
                                        <Space key={field.key} align="baseline">
                                            <Form.Item
                                                noStyle
                                                shouldUpdate={(prevValues, curValues) =>
                                                    prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                                }
                                            >
                                                {() => (
                                                    <Form.Item
                                                        {...field}
                                                        label="Sight"
                                                        name={[field.name, 'sight']}
                                                        rules={[{ required: true, message: 'Missing sight' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                label="Price"
                                                name={[field.name, 'price']}
                                                rules={[{ required: true, message: 'Missing price' }]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                        </Space>
                                    ))}

                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add sights
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>) : null
                    }
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>

        </ModalStyled >
    )

}
const ButtonStyledd = styled(Button)`
    color: #064595;
    height: 40px;
    border-Radius:20px;
    font-Size: 16px;
    fontFamily: Semi Bold;
    font-weight: bold;
    width: 100%;
    
`
const DatePickerStyled = styled(DatePicker)`
    width: 100% ;
    border-Color: #000;
    height: 50px;
    border-Radius: 20px;
    background: #FFF;
    
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
    width: 300px;
    height: 300px;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;
    vertical-align: top;
    background-color: #fafafa;
    border: 1px dashed #d9d9d9;
    border-radius: 2px;
    cursor: pointer;
    transition: border-color 0.3s;
}
`
export default GroupModal