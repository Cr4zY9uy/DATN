import "./../style/addProduct.css";
import {
    PlusOutlined,
    UploadOutlined
} from "@ant-design/icons";
import Card from "antd/es/card/Card";
import {
    Form,
    Input,
    Select,
    Radio,
    Upload,
    Button,
    Space,
    InputNumber
} from 'antd';
import { useEffect, useState } from "react";
import { add_product } from "../../../services/product_service";
import { useNavigate } from "react-router";
import { Store } from 'react-notifications-component';
import { list_category } from "../../../services/category_service";
import { refreshAccessToken } from "../../../services/user_service";

function AddProduct() {
    const { Option } = Select;
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [status, setStatus] = useState(0)
    const [data, setData] = useState({ status: 0 });
    const [thumbnail, setThumbnail] = useState("");
    const [category_name, setCategoryName] = useState("");
    const [category, setCategory] = useState([]);

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

    const handleImage = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setThumbnail(e.target.result);
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
    const changeHandler = name => value => {
        setData({ ...data, [name]: value });
    };

    const cate_list = async () => {
        try {
            const rs = await list_category();
            setCategory(rs.data.category_list);
            if (rs.status !== 200) {
                console.log(rs.status)
            }
        } catch (err) {
            if (err.response) {
                console.log(err.response);
            }
        }
    }

    useEffect(() => {
        cate_list();
        console.log(category);
    }, [])

    const handleSubmit = async () => {
        try {
            const res = await add_product({ ...data, status, thumbnail, category_name });
            if (res.status === 201) {
                Store.addNotification({
                    title: "Sucess!!",
                    message: "You add a product successfully!",
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
                navigate("/product")
            }
            else if (res.status === 401 && res.data.message === "jwt expired") {
                console.log("fetched");
                Store.addNotification({
                    title: "Warning!!",
                    message: "You can retry to add a product now!",
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
                            message: "You can't add a product right now!",
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
                        navigate("/product");
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("ferch12221");
                Store.addNotification({
                    title: "Failure!!",
                    message: "You can't add a product right now!",
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
                navigate("/product");
            }

        } catch (error) {
            console.log(error);
        }


    };

    return (
        <div className="add_product_panel container">
            <h2 className='caption'><PlusOutlined />Add new product</h2>
            <Card
                title="Create a new product"
                bordered={false}
            >
                <Form {...formItemLayout} style={{ maxWidth: 600 }} onFinish={handleSubmit} form={form}>
                    <Form.Item
                        label="Product ID"
                        hasFeedback
                        name="Product ID"
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
                        <Input name="product_id" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        hasFeedback
                        name="Name"
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
                        <Input name="title" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item label="Category"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Choose 1 opition"
                            }]}
                        name="Category"
                    >
                        <Select allowClear onChange={value => setCategoryName(value)} >
                            {category.map((item) => (
                                <Option key={item.category_id} value={item.name} style={{ height: 50 }}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        hasFeedback
                        name="Price"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <InputNumber name="price" min={1} onChange={changeHandler("price")} />
                    </Form.Item>

                    <Form.Item label="Quantity"
                        hasFeedback
                        name="Quantity"
                        rules={[
                            {
                                required: true
                            }
                        ]}>
                        <InputNumber name="qty" min={0} onChange={changeHandler("qty")} />
                    </Form.Item>
                    <Form.Item
                        label="Hot status"
                        hasFeedback
                        name="status"
                    >
                        <Radio.Group style={{ height: 50 }} defaultValue={0} name="status" className="d-flex align-items-center" onChange={handleInput}
                        >
                            <Radio value={1}>On</Radio>
                            <Radio value={0} checked>Off</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Price promotion"
                        hasFeedback
                        name="Price promotion"
                        rules={[
                            {
                                required: true
                            }
                        ]}>
                        <InputNumber name="price_promotion" min={0} max={1} onChange={changeHandler("price_promotion")} />
                    </Form.Item>
                    <Form.Item label="Description"
                        rules={[

                            {
                                min: 5,
                                message: "Minimum 5 characters "
                            },
                            {
                                max: 300,
                                message: "Maximum 300 characters"
                            }
                        ]}
                    >
                        <Input.TextArea allowClear name="description" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                        name="upload"
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
                        <Upload name="thumbnail" action="/upload.do" listType="picture" className="d-flex align-items-center" beforeUpload={file => handleImage(file)}>
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
                            <Button htmlType="reset">reset</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div >
    );
}
export default AddProduct;