import {
    PlusOutlined
} from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    Flex,
    Form,
    Image,
    Rate,
    Switch,
    Typography
} from 'antd';
import Card from "antd/es/card/Card";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import convertToDate from "../../../../../../functions/convertDate";
import { queryClient } from "../../../../../../main";
import { detailComment, updateComment } from "../../../../../../services/comment_service";
import { detailRating } from "../../../../../../services/rating_service";
import Notification from "../../../../../../utils/configToastify";
import './DetailComment.css';

const formItemLayout = {
    labelCol: {
        xs: { span: 100 },
        sm: { span: 60 },
    },
    wrapperCol: {
        xs: { span: 80 },
        sm: { span: 40 },
    },
};

export function DetailComment() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const productIdValue = Form.useWatch('productId', form)
    const productNameValue = Form.useWatch('productName', form)
    const imageValue = Form.useWatch('image', form)
    const contentValue = Form.useWatch('content', form)
    const nameValue = Form.useWatch('name', form)
    const createdAtValue = Form.useWatch('createdAt', form)

    const { comment_id, product_id } = useParams()


    const { data, isSuccess } = useQuery({
        queryKey: ['detail_comment_admin', comment_id],
        queryFn: () => detailComment(comment_id),
        enabled: !!comment_id
    })

    const { mutate } = useMutation({
        mutationFn: (data) => updateComment(data),
        onSuccess: () => {
            Notification({ message: "Update status of feedback successfully!", type: "success" })
            queryClient.invalidateQueries({ queryKey: ['comments_admin_list'] })
            navigate(`/admin/product/${product_id}/comments`, { replace: true })
        },
        onError: () => {
            Notification({ message: "Update status of feedback unsuccessfully!", type: "error" })
        }
    })

    useEffect(() => {
        if (!isSuccess) return
        const rawData = data?.data
        console.log(rawData);
        form.setFieldValue('productId', rawData?.productId?._id)
        form.setFieldValue('content', rawData?.content)
        form.setFieldValue('createdAt', rawData?.createdAt)
        form.setFieldValue('name', rawData?.userId.firstName + " " + rawData?.userId.lastName)
        form.setFieldValue('productName', rawData?.productId?.name)
        form.setFieldValue('image', rawData?.productId?.images[0])
        form.setFieldValue('isActive', rawData?.isActive)


    }, [isSuccess, data, form])

    return (
        <Flex className="crud_user detail_rating container" vertical>
            <h2 className='caption'><PlusOutlined />{"Detail feedback"}</h2>
            <Card
                title={"Detail feedback"}
                bordered={false}
                className="form"
            >
                <Flex justify="center" >
                    <Flex justify="center" >
                        <Form {...formItemLayout} style={{ width: "100%" }}
                            form={form}
                        >
                            <Flex vertical>
                                <Flex gap={"80px"}>

                                    <Flex vertical>
                                        <Form.Item label="Customer name"
                                            hasFeedback
                                            required
                                            name="name"
                                        >
                                            <Typography.Text >{nameValue}</Typography.Text>
                                        </Form.Item>
                                        <Form.Item label="Content"
                                            hasFeedback
                                            required
                                            name="content"
                                        >
                                            <Typography.Paragraph>{contentValue}</Typography.Paragraph>
                                        </Form.Item>
                                        <Form.Item label="Created at"
                                            hasFeedback
                                            required
                                            name="createdAt"
                                        >
                                            <Typography.Text >{convertToDate(createdAtValue)}</Typography.Text>
                                        </Form.Item>
                                    </Flex>
                                    <Flex vertical>
                                        <Form.Item label="Product ID"
                                            hasFeedback
                                            required
                                            name="productId"
                                        >
                                            <Typography.Text >{productIdValue}</Typography.Text>
                                        </Form.Item>
                                        <Form.Item label="Product name"
                                            hasFeedback
                                            required
                                            name="productName"
                                        >
                                            <Typography.Text >{productNameValue}</Typography.Text>
                                        </Form.Item>
                                        <Form.Item label="Product image"
                                            hasFeedback
                                            required
                                            name="image"
                                        >
                                            <Image src={imageValue} width="100px" height="100px" />
                                        </Form.Item>
                                    </Flex>
                                </Flex>
                                <Flex gap={10}>
                                    <Form.Item name='isActive' label="Status" required>
                                        <Switch checkedChildren='Active' unCheckedChildren="Deactive"
                                            onChange={(e) => mutate({ id: comment_id, isActive: e })}
                                        />
                                    </Form.Item>
                                </Flex>
                            </Flex>
                        </Form>
                    </Flex>
                </Flex>
            </Card>
        </Flex >
    );
}