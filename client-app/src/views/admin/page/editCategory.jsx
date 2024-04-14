import "./../style/editCategory.css";
import {
    FormOutlined,
    UploadOutlined
} from "@ant-design/icons";
import { fill } from '@cloudinary/url-gen/actions/resize';
import Card from "antd/es/card/Card";
import { AdvancedImage } from '@cloudinary/react';
import {
    Form,
    Input,
    Upload,
    Button,
    Space
} from 'antd';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Store } from "react-notifications-component";
import { detail_category, edit_category } from "../../../services/category_service";
import { Cloudinary } from "@cloudinary/url-gen";
import { refreshAccessToken } from "../../../services/user_service";
function EditCategory() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [category, setCategory] = useState({});
    const [data, setData] = useState({});
    const [image, setImage] = useState("");
    const { id } = useParams();

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

    useEffect(() => {
        if (category) {
            form.setFieldValue("name", category.name)
            form.setFieldValue("description", category.description)
        }
    }, [category])

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dv7ni8uod'
        }
    });

    const handleImage = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        };
        reader.readAsDataURL(file);
        return false;
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const category_detail = async () => {
        try {
            const rs = await detail_category(id);
            setCategory(rs.data.category);
            setData({ name: rs.data.category.name, description: rs.data.category.description })
            if (rs.status !== 200) {
                console.log(rs.statusText)
            }
        } catch (err) {
            if (err.response) {
                console.log(err.response.status);
            }
        }

    }

    useEffect(() => {
        category_detail();
    }, [])


    const handleSubmit = async () => {

        try {
            const res = await edit_category(id, { ...data, image });
            if (res.status === 200) {
                Store.addNotification({
                    title: "Sucess!!",
                    message: "You edit a category successfully!",
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
                navigate("/category")
            }
            else if (res.status === 401 && res.data.message === "jwt expired") {
                console.log("fetched");
                Store.addNotification({
                    title: "Warning!!",
                    message: "You can retry to edit a category now!",
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
                            message: "You can't edit a category right now!",
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
                    message: "You can't edit a category right now!",
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
        <div className="edit_category_panel container">
            <h2 className='caption'><FormOutlined />Edit category</h2>
            <Card
                title="Edit a  category"
                bordered={false}>
                <Form {...formItemLayout} style={{ maxWidth: 600 }} onFinish={handleSubmit}
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        hasFeedback
                        name="name"
                        validateDebounce={1500}
                        rules={[
                            {
                                required: true
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
                        <Input onChange={handleInput} name="name" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        hasFeedback
                        name="description"
                        validateDebounce={1500}
                        rules={[
                            {
                                min: 5,
                                message: "Minimum 5 character"
                            },
                            {
                                max: 300,
                                message: "Maximum 300 character"
                            }
                        ]}
                    >
                        <Input.TextArea allowClear onChange={handleInput} name="description" />
                    </Form.Item>
                    <Form.Item label="Initial image" className="imageInitial">
                        <AdvancedImage cldImg={cld.image(category.image).resize(fill().width(100).height(100))} />
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                        name="upload"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        extra="Choose an image"
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
export default EditCategory;