import "../style/addCategory.css";
import {
    PlusOutlined,
    UploadOutlined
} from "@ant-design/icons";
import Card from "antd/es/card/Card";
import {
    Form,
    Input,
    Upload,
    Button,
    Space
} from 'antd';
import { Store } from 'react-notifications-component';
import { useState } from "react";
import { useNavigate } from "react-router";
import { addCategory } from "../../../services/category_service";
import { refreshAccessToken } from "../../../services/user_service";

function AddCategory() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [image, setImage] = useState("");
    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: {
            xs: { span: 30 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handleImage = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        };
        reader.readAsDataURL(file);
        return false;
    };

    const handleSubmit = async () => {
        try {
            const res = await addCategory({ ...data, image });
            if (res.status === 201) {
                Store.addNotification({
                    title: "Sucess!!",
                    message: "You add a category successfully!",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                });
                navigate("/category");
            }
            else if (res.status === 401 && res.data.message === "jwt expired") {
                console.log("fetched");
                Store.addNotification({
                    title: "Warning!!",
                    message: "You can retry to add a category now!",
                    type: "warning",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                });
                try {
                    const rs = await refreshAccessToken();
                    if (rs.status !== 201) {
                        console.log("ferch11");
                        Store.addNotification({
                            title: "Failure!!",
                            message: "You can't add a category right now!",
                            type: "danger",
                            insert: "top",
                            container: "top-right",
                            animationIn: ["animate__animated", "animate__fadeIn"],
                            animationOut: ["animate__animated", "animate__fadeOut"],
                            dismiss: {
                                duration: 2000,
                                onScreen: true
                            }
                        });
                        navigate("/category");
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("ferch12221");
                Store.addNotification({
                    title: "Failure!!",
                    message: "You can't add a category right now!",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                });
                navigate("/category");
            }

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="add_category_panel container">
            <h2 className='caption'><PlusOutlined />Add new category</h2>
            <Card
                title="Create a new category"
                bordered={false}
            >
                <Form {...formItemLayout} style={{ maxWidth: 600 }} onFinish={handleSubmit}
                    form={form}
                >
                    <Form.Item
                        label="Category ID"
                        hasFeedback
                        validateDebounce={1500}
                        name="category_id"
                        rules={[
                            {
                                required: true,
                                message: "category_id must be not empty"

                            },
                            {
                                min: 4,
                                message: "Minimum 4 character"
                            },
                            {
                                max: 50,
                                message: "Maximum 50 character"
                            }
                        ]}
                    >
                        <Input name="category_id" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        hasFeedback
                        validateDebounce={1500}
                        rules={[
                            {
                                required: true,
                                message: "name must be not empty"

                            },
                            {
                                min: 5,
                                message: "Minimum 5 character"
                            },
                            {
                                max: 50,
                                message: "Maximum 50 character"
                            }
                        ]}
                    >
                        <Input name="name" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item label="Description"
                        name="description"
                        validateDebounce={1500}
                        rules={[
                            {
                                required: true,
                                message: "description must be not empty"
                            },
                            {
                                min: 5,
                                message: "Minimum 5 character"
                            },
                            {
                                max: 300,
                                message: "Maximum 300 character"
                            }
                        ]}
                        hasFeedback >
                        <Input.TextArea allowClear name="description" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                        name="image"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        extra="Choose an image"
                        rules={[
                            {
                                required: true,
                                message: "Input that field"
                            }
                        ]}
                    >
                        <Upload name="image" listType="picture" className="d-flex align-items-center" beforeUpload={file => handleImage(file)}
                        >
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            span: 24,
                            offset: 16,
                        }}
                    >
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="reset">Reset</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div >
    );
}
export default AddCategory;