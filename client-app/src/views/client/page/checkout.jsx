import { useEffect, useState } from "react";
import "../style/checkout.css";
import { Breadcrumb, Table, Form, Button, Descriptions, Input, InputNumber, Select, Radio, Space, Flex } from "antd";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import ORDER_ACTION from "../../../redux/order/order_action";
import { CreditCardOutlined, DisconnectOutlined, MoneyCollectOutlined, SendOutlined, TruckOutlined } from "@ant-design/icons";
function Checkout() {
    document.title = "Check out";
    // const cart = props.state[0].cart;
    // const order = props.state[1].order;

    const navigate = useNavigate();
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
    function generateRandomString(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        return randomString;
    }
    const order_id = generateRandomString(10);


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
            children: 1000,
            span: 3
        },
        {
            key: '2',
            label: 'Tax',
            children: 10,
            span: 3

        },
        {
            key: '3',
            label: 'Total',
            children: 1010,
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
        <Flex className="checkout_page container" vertical>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={'/client'}>HOME</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <NavLink to={'/client/checkout'}>CHECKOUT</NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Flex>
                <Form
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
                                        min: 6,
                                        message: "At least 6 characters"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Last name"
                                name="last_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input!',
                                    }, {
                                        min: 6,
                                        message: "At least 6 characters"
                                    }
                                ]}
                            >
                                <Input />
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
                                <Input />
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
                                        min: 6,
                                        message: "At least 6 characters"
                                    }
                                ]}
                            >
                                <Input />
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
                                ]} />
                            </Form.Item>
                            <Form.Item
                                label="Note"
                                name="note"
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                label="Payment method"
                                name="payment"
                            >
                                <Radio.Group>
                                    <Space direction='horizontal'>
                                        <Radio value={'cod'}><MoneyCollectOutlined />COD</Radio>
                                        <Radio value={'vnpay'}><CreditCardOutlined />VNPAY</Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="Shipping method"
                                name="shipping"
                            >
                                <Radio.Group>
                                    <Space direction='horizontal'>
                                        <Radio value={'free'}><DisconnectOutlined />Free</Radio>
                                        <Radio value={'standard'}><TruckOutlined />Standard</Radio>
                                        <Radio value={'express'}><SendOutlined />Express</Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                        </Flex>
                        <Space direction="vertical" style={{ width: "50%" }}>
                            <Table
                                columns={cartColumns}
                                dataSource={cartData}
                                pagination={{ hideOnSinglePage: true, pageSize: 3, total: 10, defaultCurrent: 1 }}
                            />
                            <Descriptions bordered items={items} />
                            <Button type="primary" htmlType="submit">
                                Checkout
                            </Button>
                        </Space>
                    </Flex>
                </Form>
            </Flex >

        </Flex >
    );
}
// const mapStateToProps = (state, ownState) => {
//     return {
//         state: [state.cart_reducer, state.order_reducer]
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addToOrder: (order) => {
//             dispatch({ type: ORDER_ACTION.ADD_ORDER, payload: order });
//         }
//     }
// }

export default Checkout; 