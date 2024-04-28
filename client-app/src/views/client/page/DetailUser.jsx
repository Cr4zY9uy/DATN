import { Flex, Form, Breadcrumb, Input, Select, Button, Upload, Typography } from 'antd'
import { NavLink } from 'react-router-dom'
import CameraOutlined from '@ant-design/icons/CameraOutlined'
import '../style/DetailUser.css'
import { uploadImage } from '../../../services/upload_service'
import { useState } from 'react'
import Notification from '../../../utils/configToastify'

export const DetailUser = () => {
    const [form] = Form.useForm()
    const { Option } = Select
    const [avatar, setAvatar] = useState('');
    const [fileList, setFileList] = useState([])
    const handleSubmit = (e) => {
        console.log({ ...e, image: avatar });
    }
    const handleChange = async (e) => {
        setFileList(e.fileList)
        const formData = new FormData();
        e.fileList.forEach((file) => {
            formData.append('images', file.originFileObj);
        });
        try {
            if (Array.from(formData.entries()).length === 0) return
            const rs = await uploadImage(formData);
            setAvatar(rs.data.images[0].url)

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Flex vertical className='customer' align='center'>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={'/client'}>HOME</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <NavLink to={'/client/user'}>INFORMATION</NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Flex className='form_wrap'>
                <Form
                    form={form}
                    style={{ width: "100%", padding: "0 20px" }}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 100 }}
                    layout="horizontal"
                    onFinish={handleSubmit}>
                    <Flex vertical >

                        <Form.Item
                            name="image"
                        >
                            <Upload

                                beforeUpload={() => false}
                                listType="picture-circle"
                                fileList={fileList}
                                onChange={handleChange}
                                style={{
                                    justifyContent: "center"
                                }}
                                accept='image/*'
                            >
                                <button
                                    style={{
                                        border: 0,
                                        background: 'none',
                                    }}
                                    type="button"
                                >
                                    <CameraOutlined style={{ fontSize: "40px", color: 'grey' }} />
                                </button>
                            </Upload>

                        </Form.Item>
                        <Typography.Title level={3}>Name</Typography.Title>
                        <Form.Item
                            name="name"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input!',
                                },
                                {
                                    min: 6,
                                    message: "At least 6 characters"
                                },
                                {
                                    max: 50,
                                    message: "At max 50 characters"
                                }
                            ]}
                        >
                            <Input type="text" placeholder="Name" size="large" />
                        </Form.Item>
                        <Typography.Title level={3}>Phone</Typography.Title>
                        <Form.Item
                            name="phone"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input!',
                                },
                                {
                                    min: 10,
                                    message: 'At least 10 digits long.',
                                },
                                {
                                    max: 13,
                                    message: 'Maximum 13 digits long.',
                                },
                            ]}
                        >
                            <Input type="number" style={{ width: '100%' }} placeholder="Phone" size="large" />
                        </Form.Item>

                        <Typography.Title level={3}>Gender</Typography.Title>
                        <Form.Item
                            name="gender"
                            rules={[{ required: true, message: 'Please select!' }]}
                            hasFeedback
                        >
                            <Select placeholder="Gender" size="large">
                                <Option value="male" >Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>

                        <Typography.Title level={3}>Address</Typography.Title>
                        <Form.Item
                            name="address"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input!',
                                },
                                {
                                    min: 3,
                                    message: "At least 3 characters"
                                },
                                {
                                    max: 150,
                                    message: "At max 150 characters"
                                }
                            ]}
                        >
                            <Input type="text" placeholder="Address" size="large" />
                        </Form.Item>

                        <Flex vertical align="center" justify="center" className="button_group">
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="update">Update</Button>
                            </Form.Item>
                        </Flex>
                    </Flex>
                </Form>
            </Flex >
        </Flex >
    )
}

