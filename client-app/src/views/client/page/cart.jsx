import { Table, Button, Breadcrumb, Flex, Typography } from 'antd';
import "./../style/cart.css";
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import CART_ACTION from '../../../redux/cart/cart_action';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

function Cart() {
    document.title = "Cart";
    const navigate = useNavigate();
    // const cart = props.state.cart;
    // const [quantities, setQuantities] = useState(cart.map(item => item.quantity));


    // const minus = (index) => {
    //     const newQuantities = [...quantities];
    //     newQuantities[index] = Math.max(newQuantities[index] - 1, 0);
    //     setQuantities(newQuantities);
    //     updateCartWithQuantity(index, newQuantities[index]);
    // };

    // const plus = (index) => {

    //     const newQuantities = [...quantities];
    //     newQuantities[index] += 1;
    //     if (newQuantities[index] > cart[index].qty - 1) {
    //         newQuantities[index] = cart[index].qty;
    //     }
    //     setQuantities(newQuantities);
    //     updateCartWithQuantity(index, newQuantities[index]);
    // };

    // const updateCartWithQuantity = (index, newQuantity) => {
    //     const updatedCart = cart.map((item, i) => ({
    //         ...item,
    //         quantity: i === index ? newQuantity : item.quantity
    //     }));
    //     props.addToCart(updatedCart);
    // };

    const checkout = () => {
        navigate("/client/checkout")
    }

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'adpricedress',
            render: (text) => <Typography.Text>{text}$</Typography.Text>

        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text) => <Flex><PlusOutlined /><Typography.Text>{text}$</Typography.Text><MinusOutlined /></Flex>

        },
        {
            title: 'Subtotal',
            dataIndex: '',
            key: 'subtotal',
            render: (text, row) => <Typography.Text>{row.price * row.quantity}$</Typography.Text>
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => <DeleteOutlined />,
        },
    ];
    const data = [
        {
            key: 1,
            no: '1',
            name: 'John Brown',
            price: 311,
            quantity: 120,
            subtotal: 1000,
        },
        {
            key: 2,
            no: '2',
            name: 'Jinn Killer',
            price: 311,
            quantity: 120,
            subtotal: 1000,
        },

    ];
    return (
        <Flex className='container cart_page' vertical>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={'/client'}>HOME</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <NavLink to={'/client/shop'}>SHOP</NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Table
                bordered
                columns={columns}
                dataSource={data}
            />
            <Flex className='wrap_btn'>
                <Button variant='warning' onClick={checkout}>
                    Checkout
                </Button>
            </Flex>
        </Flex>
    );
}
const mapStateToProps = (state, ownState) => {
    return {
        state: state.cart_reducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (cart) => {
            dispatch({ type: CART_ACTION.UPDATE_CART, payload: cart });
        }
    }
}
export default Cart; 