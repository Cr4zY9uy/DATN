import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Flex, Table, Typography } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import "./../style/cart.css";

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
            width: "150px",
            render: (text) => <Typography.Text>{text}$</Typography.Text>

        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: "200px",
            render: (text) => <Flex align='center' justify='center'> <Button icon={<PlusOutlined />} /><Typography.Text style={{ margin: "0 20px" }}>{text}</Typography.Text><Button icon={<MinusOutlined />} /></Flex>
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            key: 'subtotal',
            width: "250px",
            render: (text, row) => <Typography.Text>{row.price * row.quantity}$</Typography.Text>
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => <Flex justify='center' className='delete'>
                <Button icon={<DeleteOutlined />} />
            </Flex>,
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
                pagination={{ hideOnSinglePage: true, pageSize: 3, total: 10, defaultCurrent: 1, showSizeChanger: false }}

            />
            <Flex className='wrap_btn' justify='flex-end'>
                <Button variant='warning' onClick={checkout}>
                    Checkout
                </Button>
            </Flex>
        </Flex>
    );
}

export default Cart; 