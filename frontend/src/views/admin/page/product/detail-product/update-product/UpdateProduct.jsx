import {
    CameraOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    Button,
    Flex,
    Form,
    Input,
    InputNumber,
    Switch,
    Typography,
    Upload
} from 'antd';
import Card from "antd/es/card/Card";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Notification from "../../../../../../utils/configToastify";
import './UpdateProduct.css';
import { queryClient } from "../../../../../../main";
import { detailBanner, updateBanner } from "../../../../../../services/banner_service";
import { uploadImage } from "../../../../../../services/upload_service";
import { optionCategory } from "../../../../../../services/category_service";

function UpdateProduct() {
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState('');
    const [fileList, setFileList] = useState([])
    const [form] = Form.useForm();
    const { banner_id } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState([])
    const categoryOptions = useQuery({
        queryKey: ['category_admin_options'],
        queryFn: () => optionCategory()
    })

    const handleChange = async (e) => {

        setFileList(e.fileList.map(file => ({
            ...file,
            status: 'uploading'
        })));
        setIsLoading(true)
        const formData = new FormData();
        e.fileList.forEach((file) => {
            formData.append('images', file.originFileObj);
        });
        try {
            if (Array.from(formData.entries()).length === 0) return
            const rs = await uploadImage(formData);
            setAvatar(rs?.data?.images[0]?.url)

            setFileList(e.fileList.map(file => ({
                ...file,
                status: 'done'
            })));
            setIsLoading(false)
        } catch (error) {
            console.log(error.message);
        }
    }

    const { isSuccess, data } = useQuery({
        queryKey: ['banner_detail', banner_id],
        queryFn: () => detailBanner(banner_id)
    })

    useEffect(() => {
        if (!isSuccess) return
        form.setFieldValue("image", data?.data?.image);
        form.setFieldValue("title", data?.data?.title);
        form.setFieldValue("description", data?.data?.description);
        form.setFieldValue("order", data?.data?.order);
        form.setFieldValue("isActive", data?.data?.isActive);
        setFileList([{
            uid: '1',
            name: 'image.png',
            url: data?.data?.image,
        },])
        setAvatar(data?.data?.image)

        return () => {
            setFileList([])
            setAvatar('')
        }
    }, [data, isSuccess, form, setFileList]);
    useEffect(() => {
        if (categoryOptions.isError) return
        const rawData = categoryOptions?.data?.data?.docs
        setOptions(rawData?.map((item) => ({ value: item._id, label: item.name })))
    }, [categoryOptions.isError, categoryOptions.data, setOptions])
    
    const { mutate } = useMutation({
        mutationFn: (data) => updateBanner(data),
        onSuccess: () => {
            Notification({ message: "Update product sucessfully", type: 'success' });
            queryClient.invalidateQueries({ queryKey: ['product_admin'] })
        },
        onError: (error) => {
            Notification({ message: `${error.response.data.message}`, type: "error" })
        }
    })

    useEffect(() => {
        if (fileList.length === 0) {
            form.resetFields(['images'])
            setAvatar('')
        }

    }, [fileList.length, form])

    const handleSubmit = (e) => {
        if (!isLoading) {
            mutate({ ...e, image: avatar, id: banner_id });
            navigate('/admin/banner')
        }
        return
    }

    return (
        <Flex className="add_product_panel container" vertical>
            <Card
                bordered={false}
                className="form"
            >
                <Flex justify="center" >
                    <Form style={{ width: 450 }} onFinish={handleSubmit}
                        form={form}
                    >
                        <Flex vertical align="center" style={{ width: "100%" }}>
                            <Form.Item
                                name="images"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Please upload an image"
                                    }
                                ]}
                            >
                                <Upload
                                    beforeUpload={() => false}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleChange}
                                    style={{
                                        justifyContent: "center"
                                    }}
                                    multiple
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
                            <Flex vertical style={{ width: "100%" }}>
                                <Typography.Title level={5}>Name</Typography.Title>
                                <Form.Item
                                    name="name"
                                    hasFeedback
                                    validateDebounce={1500}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Name must be not empty"

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
                                    <Input placeholder="Name" />
                                </Form.Item>
                            </Flex>
                            <Flex vertical style={{ width: "100%" }}>
                                <Typography.Title level={5}>Category</Typography.Title>
                                <Form.Item
                                    name="categoryId"
                                    hasFeedback
                                    validateDebounce={1500}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Category must be not empty"

                                        }
                                    ]}
                                >
                                    <Select placeholder="Category" size="small" style={{ height: "31px" }} options={options} allowClear />
                                </Form.Item>
                            </Flex>
                            <Flex vertical style={{ width: "100%" }}>
                                <Typography.Title level={5}>Description</Typography.Title>
                                <Form.Item
                                    name="description"
                                    validateDebounce={1500}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Description must be not empty"
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
                                    <Input.TextArea allowClear placeholder="Description" style={{
                                        height: 120,
                                    }} />
                                </Form.Item>
                            </Flex>
                            <Flex vertical style={{ width: "100%" }}>

                                <Typography.Title level={5}>Price</Typography.Title>
                                <Form.Item
                                    hasFeedback
                                    validateDebounce={1500}
                                    name="price"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Price must be not empty or negative number",
                                            pattern: new RegExp(/^[0-9]+$/)

                                        }
                                    ]}
                                >
                                    <InputNumber placeholder="Price" />
                                </Form.Item>
                            </Flex>
                            <Flex vertical style={{ width: "100%" }}>

                                <Typography.Title level={5}>Quantity</Typography.Title>
                                <Flex style={{ width: "100%" }} gap={50}>
                                    <Form.Item
                                        hasFeedback
                                        validateDebounce={1500}
                                        name="inTrade"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Quantity must be not empty or negative number",
                                                pattern: new RegExp(/^[0-9]+$/)

                                            }
                                        ]}
                                    >
                                        <InputNumber placeholder="Quantity" />
                                    </Form.Item>
                                    <Flex gap={10}>
                                        <Form.Item name='isActive'>
                                            <Switch checkedChildren='Active' unCheckedChildren="Deactive" />
                                        </Form.Item>
                                        <Typography.Title level={5}>Status</Typography.Title>

                                    </Flex>
                                </Flex>
                            </Flex>
                            <Form.Item>
                                <Flex justify="center" gap={20} className="group_btn">
                                    <Button type="primary" htmlType="submit" disabled={isLoading} >
                                        Add new
                                    </Button>
                                    <Button htmlType="reset">Reset</Button>
                                </Flex>
                            </Form.Item>
                        </Flex>
                    </Form>
                </Flex>
            </Card>
        </Flex >
    );
}
export default UpdateProduct;