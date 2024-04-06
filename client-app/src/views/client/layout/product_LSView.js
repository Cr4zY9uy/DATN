import { Link } from "react-router-dom";
import "./../style/product_LSView.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import CART_ACTION from "../../../redux/cart/cart_action";
import { Store } from "react-notifications-component";
function Product_LSView(props) {
    const product = props.product;
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dv7ni8uod'
        }
    });
    const addToCart = () => {
        const cart = props.state.cart;
        console.log(1);
        const existingItemIndex = cart.findIndex(cartItem => cartItem.product_id === product.product_id);
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        props.addToCart(cart);
        Store.addNotification({
            title: "Sucess!!",
            message: "You add to cart successfully!",
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
    };
    return (
        <div className='item col-4'>
            <Link to={`/product/${product.product_id}`}><AdvancedImage cldImg={cld.image(product.thumbnail)} /></Link>
            <h4>{product.title.length > 18 ? product.title.substring(0, 18) + '...' : product.title}</h4>
            <p>
                {product.price * (1 - parseFloat(product.price_promotion))}$
                {product.price_promotion === 0 ? "" : <span className="discount">{`${product.price}$`}</span>}
            </p>
            <Button variant="outline-warning"><i className="bi bi-cart-check-fill" onClick={addToCart}></i>Add to cart</Button>
        </div>

    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        state: state.cart_reducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (cart) => {
            dispatch({ type: CART_ACTION.ADD_CART, payload: cart });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product_LSView); 