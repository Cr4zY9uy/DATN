import "../style/checkout_confirm.css";
import { Breadcrumb, Table, Col, Row, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import ORDER_ACTION from "../../../redux/order/order_action";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Store } from "react-notifications-component";
import { add_order } from "../../../services/order_service";
import CART_ACTION from "../../../redux/cart/cart_action";
function Checkout_Confirm(props) {
    const navigate = useNavigate();
    const orderList = props.state[1].order;
    const order = orderList[orderList.length - 1];
    const subTotal = order.products.reduce((total, item) => { return total + item.price * (1 - item.price_promotion) * item.quantity }, 0)
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dv7ni8uod'
        }
    });
    const handleSubmit = async () => {
        try {
            const rs = await add_order(order);
            if (rs.status === 201) {
                Store.addNotification({
                    title: "Sucess!!",
                    message: "You place an order successfully!",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 1500,
                        onScreen: true
                    }
                });
                props.deleteCart();
                navigate("/order_success");
            } else {
                Store.addNotification({
                    title: "Failure!!",
                    message: "You place an order unsuccessfully!",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 1500,
                        onScreen: true
                    }
                });
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <div className="checkout_confirm_page container">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={'/'}>HOME</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <NavLink to={'/checkout_confirm'}>CHECKOUT PAGE</NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {order?.products.map((item, index) => {
                        return <tr>
                            <td>{index + 1}</td>
                            <td>
                                <AdvancedImage cldImg={cld.image(item.thumbnail).resize(fill().width(50).height(50))} />
                                {item.title}</td>
                            <td>{item.price * (1 - item.price_promotion)}$</td>
                            <td>
                                {item.quantity}
                            </td>
                            <td>{item.price * (1 - item.price_promotion) * item.quantity}$</td>
                        </tr>
                    })}
                </tbody>
            </Table>
            <div className="items pt-5">
                <h1><i class="bi bi-truck"></i>Shipping address</h1>
                <div className="info">
                    <div className="row wrap_bill d-flex justify-content-between">
                        <div className="col-6">
                            <Table bordered responsive >
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>
                                            {order.first_name + ' ' + order.last_name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Phone
                                        </th>
                                        <td>{order.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Email
                                        </th>
                                        <td>{order.email}</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Address
                                        </th>
                                        <td>{order.address}</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Note
                                        </th>
                                        <td>{order?.note}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-6 cost" >
                            <Table bordered responsive >
                                <tbody>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>
                                            {subTotal}$
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Tax
                                        </th>
                                        <td>{Math.ceil(subTotal * 0.01)}$</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Shipping
                                        </th>
                                        <td>{order.shipping_cost}$</td>
                                    </tr>
                                    <tr>

                                        <th>
                                            Total
                                        </th>
                                        <th>{subTotal * 1.01}$</th>
                                    </tr>
                                    <tr>
                                        <th><i class="bi bi-credit-card-2-back-fill"></i>PAYMENT METHOD:</th>
                                        <td>{order.payment_method}</td>
                                    </tr>
                                </tbody>

                            </Table>
                            <div className='wrap_btn'>
                                <Button variant='secondary' onClick={() => { navigate("/cart") }}>
                                    back to cart
                                </Button>
                                <Button variant='warning' onClick={handleSubmit} disabled={!order}>
                                    confirm
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(Checkout_Confirm); 