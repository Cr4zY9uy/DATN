import "./../style/product_list.css";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CART_ACTION from "../../../redux/cart/cart_action";
import { connect } from "react-redux";
import { Store } from "react-notifications-component";
function Product_List(props) {
  const product = props.products;
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dv7ni8uod'
    }
  });

  const addToCart = () => {
    const cart = props.state.cart;
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

    <div className="product">
      <div className="status">
        <img src="/data/badge/new.png" alt="new" width={50} height={25} style={{ display: product.qty !== 0 ? "block" : "none" }} />
        <img src="/data/badge/sold_out.png" alt="sold_out" width={50} height={25} style={{ display: product.qty === 0 ? "block" : "none" }} />
      </div>
      <Link to={`/product/${product.product_id}`}>
        <AdvancedImage cldImg={cld.image(product.thumbnail)} />
      </Link>
      <h4>{product.title}</h4>
      <p>
        {product.price * (1 - parseFloat(product.price_promotion))}$
        {product.price_promotion === 0 ? "" : <span className="discount">{`${product.price}$`}</span>}
      </p>
      <Button variant="outline-warning" disabled={product.qty === 0 ? true : false} onClick={addToCart}><i class="bi bi-cart-check-fill"></i>Add to cart</Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Product_List); 