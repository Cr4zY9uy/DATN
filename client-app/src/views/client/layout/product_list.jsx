import { Link } from "react-router-dom";
import CART_ACTION from "../../../redux/cart/cart_action";
import "./../style/product_list.css";
import { Badge, Button, Flex, Typography } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";

function Product_List(props) {
  const product = props.products;


  const addToCart = () => {
    const cart = props.state.cart;
    const existingItemIndex = cart.findIndex(cartItem => cartItem.product_id === product.product_id);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

  };

  return (

    <Flex className='item' key={product.product_id} vertical>
      <Link to={`/product/${product.product_id}`}>
        <Badge.Ribbon text={'New'} color="red" placement="start">
          <img src="/data/banner/banner-home-1.png" loading="lazy" />
        </Badge.Ribbon>
      </Link>
      <Flex className="pt-4" vertical>
        <Typography.Title level={5} className="country">Korea</Typography.Title>
        <Typography.Title level={4} className="title">{product.title}</Typography.Title >
        <Typography.Text className="price_promo">
          <Typography.Text className="promotion">
            {parseFloat(product.price * (1 - parseFloat(product.price_promotion))).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD', // Adjust currency code as needed
              minimumFractionDigits: 0, // Set minimum decimal places to 0
              maximumFractionDigits: 0,  // Adjust currency code as needed
            })}
          </Typography.Text>
          <Typography.Text className="price">
            {product.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD', // Adjust currency code as needed
              minimumFractionDigits: 0, // Set minimum decimal places to 0
              maximumFractionDigits: 0,  // Adjust currency code as needed
            })}
          </Typography.Text>
        </Typography.Text>
      </Flex>
      <Button icon={<ShoppingOutlined />} >add to cart</Button>
    </Flex>

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
export default Product_List; 