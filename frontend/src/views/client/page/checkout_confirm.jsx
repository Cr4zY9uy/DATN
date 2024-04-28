import { CreditCardOutlined, DisconnectOutlined, MoneyCollectOutlined, SendOutlined, TruckOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Descriptions, Flex, Form, Input, InputNumber, Radio, Select, Space, Table, Typography } from "antd";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createBill } from "../../../services/payment_service";
import "../style/checkout_confirm.css";
function CheckoutConfirm() {
    document.title = "Check out";
    const [form] = Form.useForm()
    // const cart = props.state[0].cart;
    // const order = props.state[1].order;
    useEffect(() => {
        form.setFieldValue("first_name", "Nguyen Van")
        form.setFieldValue("last_name", "Anh")
        form.setFieldValue("email", "usas@gmail.com")
        form.setFieldValue("phone", 12312938)
        form.setFieldValue("address", "Anh")
        form.setFieldValue("country", "jack")
        form.setFieldValue("note", "usas@gmail.com")
        form.setFieldValue("payment", "vnpay")
        form.setFieldValue("shipping", "free")
    }, [])
    const navigate = useNavigate();
    const navigateCheckout = () => {
        navigate('/client/checkout')
    }
    const navigateEnd = async () => {
        // navigate('/client/checkout/success')
        const rs = await createBill({ amount: 100000, language: 'vn', bankCode: "VNBANK" });
        window.location.assign(rs.data.url)

    }
    // const subTotal = cart.reduce((total, item) => { return total + item.price * (1 - item.price_promotion) * item.quantity }, 0)
    // const [data, setData] = useState({});

    // const items = cart.map((product) => ({
    //     product_id: product.product_id,
    //     title: product.title,
    //     thumbnail: product.thumbnail,
    //     quantity: product.quantity,
    //     price: product.price,
    //     price_promotion: product.price_promotion,
    // }))
    // const items_tax = items.map(obj => ({ ...obj, tax: 0.01 }))


    const cartColumns = [

        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'adpricedress',
            render: (text) => <p>{text}$</p>

        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Subtotal',
            dataIndex: '',
            key: 'subtotal',
            render: (text, row) => <p>{row.price * row.quantity}$</p>
        },

    ];
    const cartData = [
        {
            key: 1,
            name: 'John Brown',
            price: 311,
            quantity: 120,
            subtotal: 1000,
        },
        {
            key: 2,
            name: 'Jinn Killer',
            price: 311,
            quantity: 120,
            subtotal: 1000,
        },

    ];
    const items = [
        {
            key: '1',
            label: 'Subtotal',
            children: <Typography.Text>1000$</Typography.Text>,
            span: 3
        },
        {
            key: '2',
            label: 'Tax',
            children: <Typography.Text>10$</Typography.Text>,
            span: 3

        },
        {
            key: '3',
            label: 'Total',
            children: <Typography.Text>1010$</Typography.Text>,
            span: 3

        }
    ];

    // const handleSubmit = (e) => {
    //     const submitData = { ...data, order_id, payment_method, shipping_method, products: items_tax, shipping_cost: shippingCost[shipping_method] };
    //     if (!data.first_name || !data.last_name || !data.email || !data.phone || !data.address || !data.country || !items) {

    //     }
    //     else {
    //         order.push(submitData);
    //         props.addToOrder(order);
    //         Store.addNotification({
    //             title: "Sucess!!",
    //             message: "You add an order successfully!",
    //             type: "success",
    //             insert: "top",
    //             container: "top-right",
    //             animationIn: ["animate__animated", "animate__fadeIn"],
    //             animationOut: ["animate__animated", "animate__fadeOut"],
    //             dismiss: {
    //                 duration: 1500,
    //                 onScreen: true
    //             }
    //         });
    //         navigate("/checkout_confirm");
    //     }

    // }
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 6,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 14,
            },
        },
    };
    const onFinish = (value) => {
        console.log(value);
    }
    return (
        <Flex className="checkout_confirm_page container" vertical>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={'/client'}>HOME</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <NavLink to={'/client/checkout/confirm'}>CHECKOUT CONFIRM</NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Flex>
                <Form
                    form={form}
                    {...formItemLayout}
                    style={{
                        width: "100%"
                    }}
                    onFinish={onFinish}
                >
                    <Flex gap='large'>
                        <Flex vertical style={{ width: "50%" }}>
                            <Form.Item
                                label="First name"
                                name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input!',
                                    }, {
                                        min: 3,
                                        message: "At least 3 characters"
                                    }
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Last name"
                                name="last_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input!',
                                    }, {
                                        min: 3,
                                        message: "At least 3 characters"
                                    }
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
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
                                        type: 'email',
                                        message: 'Please input an email address'
                                    }
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Phone number"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input!',
                                    }
                                ]}
                            >
                                <InputNumber
                                    style={{
                                        width: '100%',
                                    }}
                                    minLength={10}
                                    maxLength={13}
                                    disabled
                                />
                            </Form.Item>

                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input!',
                                    }, {
                                        min: 3,
                                        message: "At least 3 characters"
                                    }
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Country"
                                name="country"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input!',
                                    },
                                ]}
                            >
                                <Select options={[
                                    { value: 'jack', label: 'Jack' },
                                    { value: 'lucy', label: 'Lucy' },
                                    { value: 'Yiminghe', label: 'yiminghe' },
                                    { value: 'disabled', label: 'Disabled', disabled: true },
                                ]} disabled />
                            </Form.Item>
                            <Form.Item
                                label="Note"
                                name="note"
                            >
                                <Input.TextArea disabled />
                            </Form.Item>
                            <Form.Item
                                label="Payment method"
                                name="payment"
                            >
                                <Radio.Group disabled>
                                    <Space direction='horizontal' wrap={true}>
                                        <Radio value={'cod'} className="radio"><MoneyCollectOutlined /><Typography.Text>COD</Typography.Text></Radio>
                                        <Radio value={'vnpay'} className="radio"><CreditCardOutlined /><Typography.Text>VNPAY</Typography.Text></Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="Shipping method"
                                name="shipping"
                            >
                                <Radio.Group disabled>
                                    <Space direction='horizontal' wrap={true}>
                                        <Radio value={'free'} className="radio"><DisconnectOutlined /><Typography.Text>Free</Typography.Text></Radio>
                                        <Radio value={'standard'} className="radio"><TruckOutlined /><Typography.Text>Standard</Typography.Text></Radio>
                                        <Radio value={'express'} className="radio"><SendOutlined /><Typography.Text>Express</Typography.Text></Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                        </Flex>
                        <Space direction="vertical" style={{ width: "50%" }}>
                            <Table
                                columns={cartColumns}
                                dataSource={cartData}
                                pagination={{
                                    hideOnSinglePage: true, pageSize: 3, total: 10, defaultCurrent: 1, showSizeChanger: false
                                }}
                            />
                            <Descriptions bordered items={items} className="sumary" />
                            <Flex gap="large" justify="center" className="wrap_btn">
                                <Button type="primary" htmlType="button" onClick={navigateCheckout}>
                                    Back to checkout
                                </Button>
                                <Button type="primary" htmlType="submit" onClick={navigateEnd}>
                                    Place order
                                </Button>
                            </Flex>
                        </Space>
                    </Flex>
                </Form>
            </Flex >

        </Flex >
    );
}

export default CheckoutConfirm; 