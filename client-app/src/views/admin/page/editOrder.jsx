import "./../style/editOrder.css";
import {
    FormOutlined,
} from "@ant-design/icons";
import Card from "antd/es/card/Card";
import {
    Form,
    Input,
    Select,
    Button,
    Space,
    Divider,
    InputNumber
} from 'antd';
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { detail_order, edit_order } from "../../../services/order_service";
import { useNavigate, useParams } from "react-router";
import { Store } from "react-notifications-component";
import convertToDate from "../../../functions/convertDate";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { refreshAccessToken } from "../../../services/user_service";
function EditOrder() {
    const [data, setData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({});
    const { Option } = Select;
    const [product, setProduct] = useState([]);
    const [form] = Form.useForm();
    const [selection, setSelection] = useState({});
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dv7ni8uod'
        }
    });

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
        if (order) {
            form.setFieldValue("first_name", order.first_name)
            form.setFieldValue("last_name", order.last_name)
            form.setFieldValue("phone", order.phone)
            form.setFieldValue("email", order.email)
            form.setFieldValue("address", order.address)
            form.setFieldValue("country", order.country)
            form.setFieldValue("order_status", order.order_status)
            form.setFieldValue("shipping_status", order.shipping_status)
            form.setFieldValue("payment_status", order.payment_status)
            form.setFieldValue("shipping_method", order.shipping_method)
            form.setFieldValue("payment_method", order.payment_method)
            form.setFieldValue("createdAt", order.createdAt)
            form.setFieldValue("shipping_cost", order.shipping_cost)
            form.setFieldValue("discount", order.discount)
            form.setFieldValue("other_fee", order.other_fee)
            form.setFieldValue("received", order.received)
            form.setFieldValue("balance", order.balance)
            form.setFieldValue("note", order.note)
        }
    }, [order])


    const title = `Edit order ${order.order_id} created at ${convertToDate(order.createdAt)}`;

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSelection = (name, value) => {
        setSelection({ ...selection, [name]: value });
    }

    const changeHandler = name => value => {
        setData({ ...data, [name]: value });
    };

    const load_order = async () => {

        try {
            const rs = await detail_order(id);
            setOrder(rs.data.order);
            setProduct(rs.data.order.products);
            setSelection({
                order_status: rs.data.order.order_status,
                shipping_method: rs.data.order.shipping_method,
                shipping_status: rs.data.order.shipping_status,
                payment_method: rs.data.order.payment_method,
                payment_status: rs.data.order.payment_status
            })
            setData({
                shipping_cost: rs.data.order.shipping_cost,
                discount: rs.data.order.discount,
                other_fee: rs.data.order.other_fee,
                received: rs.data.order.received,
                note: rs.data.order.note,
                balance: rs.data.order.balance,
                createdAt: rs.data.order.createdAt
            })
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
        load_order();
    }, [])


    const handleSubmit = async (e) => {

        try {
            const res = await edit_order(id, { ...data, ...selection });
            if (res.status === 200) {
                Store.addNotification({
                    title: "Sucess!!",
                    message: "You edit an order successfully!",
                    type: "success",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                });
                navigate("/order")
            }
            else if (res.status === 401 && res.data.message === "jwt expired") {
                console.log("fetched");
                Store.addNotification({
                    title: "Warning!!",
                    message: "You can retry to edit a order now!",
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
                            message: "You can't edit a order right now!",
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
                        navigate("/order");
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("ferch12221");
                Store.addNotification({
                    title: "Failure!!",
                    message: "You can't edit a order right now!",
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
                navigate("/order");
            }

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="edit_order_panel container">
            <h2 className='caption'><FormOutlined />Edit order</h2>
            <Card
                title={title}
                bordered={false}
            >
                <Form {...formItemLayout} form={form} style={{ maxWidth: 600 }} onFinish={handleSubmit} >
                    <Form.Item
                        label="First name"
                        hasFeedback
                        name="first_name"
                        rules={[

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
                        <Input name="first_name" readOnly />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        hasFeedback
                        name="last_name"
                        rules={[

                            {
                                min: 3,
                                message: "Minimum 3 character"
                            },
                            {
                                max: 50,
                                message: "Maximum 50 character"
                            }
                        ]}

                    >
                        <Input name="last_name" readOnly />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        hasFeedback
                        name="phone"
                        rules={[

                            {
                                min: 5,
                                message: "Minimum 5 character"
                            },
                            {
                                max: 15,
                                message: "Maximum 15 character"
                            }
                        ]}

                    >
                        <Input name="phone" readOnly />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        hasFeedback
                        name="email"
                        rules={[

                            {
                                min: 15,
                                message: "Minimum 5 character"
                            },
                            {
                                max: 30,
                                message: "Maximum 30 character"
                            }
                        ]}

                    >
                        <Input name="email" readOnly />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        hasFeedback
                        name="address"
                        rules={[

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
                        <Input name="address" readOnly />
                    </Form.Item>
                    <Form.Item
                        label="Country"
                        hasFeedback
                        name="country"
                        rules={[

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
                        <Input name="country" readOnly />
                    </Form.Item>
                    <Divider />

                    <Form.Item label="Order status"
                        hasFeedback
                        name="order_status">
                        <Select allowClear name="order_status" onChange={(value) => handleSelection('order_status', value)} >
                            <Option value="New" style={{ height: 50 }}>New</Option>
                            <Option value="Processing" style={{ height: 50 }}>Processing</Option>
                            <Option value="Hold" style={{ height: 50 }}>Hold</Option>
                            <Option value="Canceled" style={{ height: 50 }}>Canceled</Option>
                            <Option value="Done" style={{ height: 50 }}>Done</Option>
                            <Option value="Fail" style={{ height: 50 }}>Fail</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Shipping status"
                        hasFeedback
                        name="shipping_status">
                        <Select allowClear name="shipping_status" onChange={value => handleSelection('shipping_status', value)} >
                            <Option value="Not sent" style={{ height: 50 }}>Not sent</Option>
                            <Option value="Sending" style={{ height: 50 }}>Sending</Option>
                            <Option value="Shipping done" style={{ height: 50 }}>Shipping done</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Payment status"
                        hasFeedback
                        name="payment_status">
                        <Select allowClear name="payment_status" onChange={value => handleSelection('payment_status', value)} >
                            <Option value="Unpaid" style={{ height: 50 }}>Unpaid</Option>
                            <Option value="Partial payment" style={{ height: 50 }}>Partial payment</Option>
                            <Option value="Paid" style={{ height: 50 }}>Paid</Option>
                            <Option value="Return" style={{ height: 50 }}>Return</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Shipping method"
                        hasFeedback
                        name="shipping_method">
                        <Select allowClear name="shipping_method" onChange={value => handleSelection('shipping_method', value)} >
                            <Option value="Free" style={{ height: 50 }}>Free</Option>
                            <Option value="Standard" style={{ height: 50 }}>Standard</Option>
                            <Option value="Express" style={{ height: 50 }}>Express</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Payment method"
                        hasFeedback
                        name="payment_method">
                        <Select allowClear name="payment_method" onChange={value => handleSelection('payment_method', value)} >
                            <Option value="Credit card" style={{ height: 50 }}>Credit card</Option>
                            <Option value="COD" style={{ height: 50 }}>COD</Option>
                            <Option value="Paypal" style={{ height: 50 }}>Paypal</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Discount"
                        hasFeedback
                        name="discount"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <InputNumber name="discount" min={0} max={1} onChange={changeHandler("discount")} />
                    </Form.Item>
                    <Form.Item
                        label="Shipping cost"
                        hasFeedback
                        name="shipping_cost"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <InputNumber name="shipping_cost" min={0} onChange={changeHandler("shipping_cost")} />
                    </Form.Item>
                    <Form.Item
                        label="Other fee"
                        hasFeedback
                        name="other_fee"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <InputNumber name="other_fee" min={0} onChange={changeHandler("other_fee")} />
                    </Form.Item>
                    <Form.Item
                        label="Received(-)"
                        hasFeedback
                        name="received"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <InputNumber name="received" min={0} onChange={changeHandler("received")} />
                    </Form.Item>
                    <Form.Item
                        label="Balance"
                        hasFeedback
                        name="balance"
                        rules={[
                            {
                                required: true
                            }
                        ]}

                    >
                        <InputNumber name="balance" min={0} onChange={changeHandler("balance")} />
                    </Form.Item>
                    <Form.Item
                        label="Note"
                        name="note"
                        validateDebounce={1500}
                        rules={[
                            {
                                min: 5,
                                message: "Minimum 5 characters"
                            },
                            {
                                max: 300,
                                message: "Maximum 300 characters"
                            }
                        ]}
                    >
                        <Input.TextArea allowClear onChange={handleInput} name="note" />
                    </Form.Item>

                    <Table bordered hover responsive="lg">
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total price</th>
                                <th>Tax</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.map((item, index) => {
                                    return <tr key={index}>
                                        <th>{item.product_id}</th>
                                        <th>
                                            <AdvancedImage cldImg={cld.image(item.thumbnail).resize(fill().width(50).height(50))} />
                                            {item.title}</th>
                                        <th>{item.price * (1 - item.price_promotion)}$</th>
                                        <th>{item.quantity}</th>
                                        <th>{item.quantity * item.price * (1 - item.price_promotion)}$</th>
                                        <th>{item.tax}</th>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
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
export default EditOrder;