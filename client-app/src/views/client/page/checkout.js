import { useEffect, useState } from "react";
import "../style/checkout.css";
import { Breadcrumb, Table, Col, Row, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { Store } from "react-notifications-component";
import ORDER_ACTION from "../../../redux/order/order_action";
function Checkout(props) {
    document.title = "Check out";
    const cart = props.state[0].cart;
    const order = props.state[1].order;
    const navigate = useNavigate();
    const subTotal = cart.reduce((total, item) => { return total + item.price * (1 - item.price_promotion) * item.quantity }, 0)
    const [data, setData] = useState({});
    const [payment_method, setPayment] = useState("Credit card");
    const [shipping_method, setShipping] = useState("Free");
    const shippingCost = {
        Free: 0,
        Standard: 50,
        Express: 70
    }
    const items = cart.map((product) => ({
        product_id: product.product_id,
        title: product.title,
        thumbnail: product.thumbnail,
        quantity: product.quantity,
        price: product.price,
        price_promotion: product.price_promotion,
    }))
    const items_tax = items.map(obj => ({ ...obj, tax: 0.01 }))
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

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dv7ni8uod'
        }
    });
    const changeActivePayment = (e) => {
        const clickedOption = e.currentTarget;
        document.querySelectorAll('.payment').forEach(option => {
            option.classList.remove('active');
        });
        clickedOption.classList.add('active');
        const selectedPayment = clickedOption.getAttribute('data-value');
        setPayment(selectedPayment);
    }
    const changeActiveShipping = (e) => {
        const clickedOption = e.currentTarget;
        document.querySelectorAll('.shipping').forEach(option => {
            option.classList.remove('active');
        });
        clickedOption.classList.add('active');
        const selectedShipping = clickedOption.getAttribute('data-value');
        setShipping(selectedShipping);
    }
    const hanleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        const submitData = { ...data, order_id, payment_method, shipping_method, products: items_tax, shipping_cost: shippingCost[shipping_method] };
        if (!data.first_name || !data.last_name || !data.email || !data.phone || !data.address || !data.country || !items) {
            Store.addNotification({
                title: "Failure!!",
                message: "You add an order unsuccessfully!",
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
        else {
            order.push(submitData);
            props.addToOrder(order);
            Store.addNotification({
                title: "Sucess!!",
                message: "You add an order successfully!",
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
            navigate("/checkout_confirm");
        }

    }
    return (
        <div className="checkout_page container">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={'/'}>HOME</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <NavLink to={'/checkout'}>CHECKOUT</NavLink>
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
                    {cart.map((item, index) => {
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
                <div className="info">
                    <div className="row wrap_bill d-flex justify-content-between">
                        <Form className='bill col-6'>
                            <Form.Group className="mb-3">
                                <Row>
                                    <Col>
                                        <Form.Label><i class="bi bi-person-fill"></i>First name</Form.Label>
                                        <Form.Control type="text" name='first_name' required minLength={6} onChange={hanleInput} />
                                    </Col>
                                    <Col>
                                        <Form.Label><i class="bi bi-person-fill"></i>Last name</Form.Label>
                                        <Form.Control type="text" name='last_name' required minLength={6} onChange={hanleInput} />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Row>
                                    <Col>
                                        <Form.Label><i class="bi bi-telephone-fill"></i>Phone</Form.Label>
                                        <Form.Control type="text" name='phone' required pattern='[0-9]{10}' onChange={hanleInput} />
                                    </Col>
                                    <Col>
                                        <Form.Label><i class="bi bi-envelope-fill"></i>Email</Form.Label>
                                        <Form.Control type="email" name='email' required onChange={hanleInput} />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><i class="bi bi-person-lines-fill"></i>Address</Form.Label>
                                <Form.Control type="text" name='address' required onChange={hanleInput} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><i class="bi bi-globe2"></i>Country</Form.Label>
                                <Form.Control type="text" name='country' required onChange={hanleInput} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label><i class="bi bi-journal-medical"></i>Note</Form.Label>
                                <Form.Control as="textarea" rows={3} name="note" onChange={hanleInput} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Payment method</Form.Label>
                                <Row>
                                    <Col name='payment' className='payment active' data-value='Credit card' onClick={(e) => changeActivePayment(e)}>
                                        <div className='credit'><div><i className="bi bi-credit-card-2-back-fill"></i><span>Credit</span></div><i className="bi bi-check2-circle"></i></div>
                                    </Col>
                                    <Col name='payment' className='payment' data-value='Paypal' onClick={(e) => changeActivePayment(e)}>
                                        <div className='paypal'><div><i className="bi bi-paypal"></i><span>Paypal</span></div><i className="bi bi-check2-circle"></i></div>
                                    </Col>
                                    <Col name='payment' className='payment' data-value='COD' onClick={(e) => changeActivePayment(e)}>
                                        <div className='cod'><div><i className="bi bi-wallet-fill"></i><span>COD</span></div><i className="bi bi-check2-circle"></i></div>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group style={{ paddingTop: "20px" }}>
                                <Form.Label>Shipping method</Form.Label>
                                <Row>
                                    <Col name='shipping' className='shipping active' data-value='Free' onClick={(e) => changeActiveShipping(e)}>
                                        <div className='free '><div><i className="bi bi-envelope-fill"></i><span>Free</span></div><i className="bi bi-check2-circle"></i></div>
                                    </Col>
                                    <Col name='shipping' className='shipping' data-value='Standard' onClick={(e) => changeActiveShipping(e)}>
                                        <div className='standard  '><div><i className="bi bi-archive-fill"></i><span>Standard</span></div><i className="bi bi-check2-circle"></i></div>
                                    </Col>
                                    <Col name='shipping' className='shipping' data-value='Express' onClick={(e) => changeActiveShipping(e)}>
                                        <div className='express '><div><i className="bi bi-send-fill"></i><span>Express</span></div><i className="bi bi-check2-circle"></i></div>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                        <div className="col-5" >
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
                                            Total
                                        </th>
                                        <th>{subTotal * 1.01}$</th>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className='wrap_btn'>
                                <Button variant='warning' onClick={handleSubmit} disable={cart.length === 0}>
                                    Checkout
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
        addToOrder: (order) => {
            dispatch({ type: ORDER_ACTION.ADD_ORDER, payload: order });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout); 