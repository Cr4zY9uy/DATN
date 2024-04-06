import { Table, Button, Breadcrumb, CloseButton } from 'react-bootstrap';
import "./../style/cart.css";
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import CART_ACTION from '../../../redux/cart/cart_action';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { Store } from 'react-notifications-component';
function Cart(props) {
    document.title = "Cart";
    const navigate = useNavigate();
    const cart = props.state.cart;
    const [quantities, setQuantities] = useState(cart.map(item => item.quantity));
    const deleteItem = (index) => {
        const deletedCart = [...cart];
        deletedCart.splice(index, 1);
        props.addToCart(deletedCart);
        Store.addNotification({
            title: "Warning!!",
            message: "You delete an item successfully!",
            type: "warning",
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


    const minus = (index) => {
        const newQuantities = [...quantities];
        newQuantities[index] = Math.max(newQuantities[index] - 1, 0);
        setQuantities(newQuantities);
        updateCartWithQuantity(index, newQuantities[index]);
    };

    const plus = (index) => {

        const newQuantities = [...quantities];
        newQuantities[index] += 1;
        if (newQuantities[index] > cart[index].qty - 1) {
            newQuantities[index] = cart[index].qty;
        }
        setQuantities(newQuantities);
        updateCartWithQuantity(index, newQuantities[index]);
    };

    const updateCartWithQuantity = (index, newQuantity) => {
        const updatedCart = cart.map((item, i) => ({
            ...item,
            quantity: i === index ? newQuantity : item.quantity
        }));
        props.addToCart(updatedCart);
    };

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dv7ni8uod'
        }
    });
    const checkout = () => {
        navigate("/checkout")
    }
    return (
        <div className='container cart_page'>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={'/'}>HOME</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <NavLink to={'/cart'}>CART</NavLink>
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart?.map((item, index) => {
                        return <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <AdvancedImage cldImg={cld.image(item.thumbnail).resize(fill().width(90).height(90))} />
                                {item.title}</td>
                            <td>{item.price * (1 - item.price_promotion)}$</td>
                            <td>
                                <div className='form-group d-flex align-items-center justify-content-around'>
                                    <i class="bi bi-dash-lg" onClick={() => minus(index)}></i>
                                    <input value={quantities[index]} className="form-control quantity" style={{ textAlign: "center" }} readOnly />
                                    <i class="bi bi-plus-lg" onClick={() => plus(index)}></i>
                                </div>
                            </td>
                            <td>{quantities[index] * item.price * (1 - item.price_promotion)}$</td>
                            <td><CloseButton onClick={() => { deleteItem(index) }}></CloseButton></td>
                        </tr>
                    })}
                </tbody>
            </Table>
            <div className='wrap_btn'>
                <Button variant='warning' onClick={checkout} disabled={cart.length === 0}>
                    Checkout
                </Button>
            </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Cart); 