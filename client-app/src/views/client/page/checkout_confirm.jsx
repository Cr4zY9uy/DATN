// import "../style/checkout_confirm.css";
// import { Breadcrumb, Table, Form, Button } from "antd";
// import { connect } from "react-redux";
// import { NavLink, useNavigate } from "react-router-dom";
// import ORDER_ACTION from "../../../redux/order/order_action";
// import { add_order } from "../../../services/order_service";
// import CART_ACTION from "../../../redux/cart/cart_action";
// import { DeleteOutlined } from "@ant-design/icons";
function Checkout_Confirm() {
    // const navigate = useNavigate();
    // // const orderList = props.state[1].order;
    // // const order = orderList[orderList.length - 1];
    // // const subTotal = order.products.reduce((total, item) => { return total + item.price * (1 - item.price_promotion) * item.quantity }, 0)
    // // const cld = new Cloudinary({
    // //     cloud: {
    // //         cloudName: 'dv7ni8uod'
    // //     }
    // // });
    // // const handleSubmit = async () => {
    // //     try {
    // //         const rs = await add_order(order);
    // //         if (rs.status === 201) {

    // //             // props.deleteCart();
    // //             navigate("/order_success");
    // //         }
    // //     } catch (err) {
    // //         console.log(err.message);
    // //     }
    // // }
    // const cartColumns = [
    //     {
    //         title: 'No',
    //         dataIndex: 'no',
    //         key: 'no',
    //     },
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //         key: 'name',
    //     },
    //     {
    //         title: 'Price',
    //         dataIndex: 'price',
    //         key: 'adpricedress',
    //         render: (text) => <p>{text}$</p>

    //     },
    //     {
    //         title: 'Quantity',
    //         dataIndex: 'quantity',
    //         key: 'quantity',
    //     },
    //     {
    //         title: 'Subtotal',
    //         dataIndex: '',
    //         key: 'subtotal',
    //         render: (text, row) => <p>{row.price * row.quantity}$</p>
    //     },
    //     {
    //         title: 'Action',
    //         dataIndex: '',
    //         key: 'x',
    //         render: () => <DeleteOutlined />,
    //     },
    // ];
    // const cartData = [
    //     {
    //         key: 1,
    //         no: '1',
    //         name: 'John Brown',
    //         price: 311,
    //         quantity: 120,
    //         subtotal: 1000,
    //     },
    //     {
    //         key: 2,
    //         no: '2',
    //         name: 'Jinn Killer',
    //         price: 311,
    //         quantity: 120,
    //         subtotal: 1000,
    //     },

    // ];

    // const userColumns = [
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //         key: 'no',
    //     },
    //     {
    //         title: 'Phone',
    //         dataIndex: 'phone',
    //         key: 'phone',
    //     },
    //     {
    //         title: 'Email',
    //         dataIndex: 'email',
    //         key: 'email',
    //     },
    //     {
    //         title: 'Address',
    //         dataIndex: 'address',
    //         key: 'address',
    //     },
    //     {
    //         title: 'Note',
    //         dataIndex: 'note',
    //         key: 'note',
    //     }
    // ];
    // const userData = [
    //     {
    //         key: 1,
    //         name: 'John Brown',
    //         phone: '03898234123',
    //         email: '9ajsdj9@gmail.com',
    //         address: 'asd@gmail.com',
    //         note: 'asdiu asdnoid qwdnoqd',
    //     },
    //     {
    //         key: 2,
    //         name: 'John Brown',
    //         phone: '03898234123',
    //         email: '9ajsdj9@gmail.com',
    //         address: 'asd@gmail.com',
    //         note: 'asdiu asdnoid qwdnoqd',
    //     },

    // ];
    // return (
    //     <div className="checkout_confirm_page container">
    //         <Breadcrumb>
    //             <Breadcrumb.Item>
    //                 <NavLink to={'/client'}>HOME</NavLink>
    //             </Breadcrumb.Item>
    //             <Breadcrumb.Item active>
    //                 <NavLink to={'/client/checkout_confirm'}>CHECKOUT CONFIRM</NavLink>
    //             </Breadcrumb.Item>
    //         </Breadcrumb>
    //         <Table
    //             columns={cartColumns}
    //             dataSource={cartData}
    //         />
    //         <div className="items pt-5">
    //             <h1><i className="bi bi-truck"></i>Shipping address</h1>
    //             <div className="info">
    //                 <div className="row wrap_bill d-flex justify-content-between">
    //                     <div className="col-6">
    //                         <Table
    //                             columns={userColumns}
    //                             dataSource={userData}
    //                         />
    //                     </div>
    //                     <div className="col-6 cost" >
    //                         <Table bordered responsive >
    //                             <tbody>
    //                                 <tr>
    //                                     <th>Subtotal</th>
    //                                     <td>
    //                                         {subTotal}$
    //                                     </td>
    //                                 </tr>
    //                                 <tr>
    //                                     <th>
    //                                         Tax
    //                                     </th>
    //                                     <td>{Math.ceil(subTotal * 0.01)}$</td>
    //                                 </tr>
    //                                 <tr>
    //                                     <th>
    //                                         Shipping
    //                                     </th>
    //                                     <td>{order.shipping_cost}$</td>
    //                                 </tr>
    //                                 <tr>

    //                                     <th>
    //                                         Total
    //                                     </th>
    //                                     <th>{subTotal * 1.01}$</th>
    //                                 </tr>
    //                                 <tr>
    //                                     <th><i className="bi bi-credit-card-2-back-fill"></i>PAYMENT METHOD:</th>
    //                                     <td>{order.payment_method}</td>
    //                                 </tr>
    //                             </tbody>

    //                         </Table>
    //                         <div className='wrap_btn'>
    //                             <Button variant='secondary' onClick={() => { navigate("/cart") }}>
    //                                 back to cart
    //                             </Button>
    //                             <Button variant='warning' onClick={handleSubmit} disabled={!order}>
    //                                 confirm
    //                             </Button>

    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
}
const mapStateToProps = (state, ownState) => {
    return {
        state: [state.cart_reducer, state.order_reducer]
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteCart: (cart) => {
            dispatch({ type: CART_ACTION.DELETE_CART, payload: cart });
        }
    }
}
export default Checkout_Confirm; 