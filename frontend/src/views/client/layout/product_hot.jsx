import { Badge, Button, Flex, Typography } from "antd";
import "./../style/product_hot.css";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingOutlined } from "@ant-design/icons";
import { ACTION_CART, CartContext } from "../../../store/cart";
import { useContext } from "react";
import Notification from "../../../utils/configToastify";
import { UserContext } from "../../../store/user";

function Product_Hot(props) {
    const product = props.products;
    const cart = useContext(CartContext)
    const user = useContext(UserContext)
    const info = user?.state?.currentUser?.user_id
    const addToCart = () => {
        if (info) {

            cart?.dispatch({ type: ACTION_CART.ADD_CART, payload: { ...product, quantityBuy: 1 } })
            Notification({ message: "Add to cart successully!", type: "success" })
        }
        else {
            Notification({ message: "You have to login first!", type: "error" })

        }
    };

    const navigate = useNavigate()
    return (
        <Flex className='item' key={product?.id} vertical>
            <Link to={`/client/product/${product?.id}`} style={{ backgroundColor: "white" }}>
                <Badge.Ribbon text={`-${product.sale * 100}%`} color="red" placement="start">
                    <img src={product?.image} loading="lazy" />
                </Badge.Ribbon>
            </Link>
            <Flex className="pt-4" vertical>
                <Typography.Title level={5} className="country">{product?.origin}</Typography.Title>
                <Typography.Title level={4} className="title">{product?.name}</Typography.Title >
                <Typography.Text className="price_promo">
                    <Typography.Text className="promotion">
                        {parseFloat(product?.price * (1 - parseFloat(product?.sale))).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD', // Adjust currency code as needed
                            minimumFractionDigits: 0, // Set minimum decimal places to 0
                            maximumFractionDigits: 0,  // Adjust currency code as needed
                        })}
                    </Typography.Text>
                    <Typography.Text className="price">
                        {product?.price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD', // Adjust currency code as needed
                            minimumFractionDigits: 0, // Set minimum decimal places to 0
                            maximumFractionDigits: 0,  // Adjust currency code as needed
                        })}
                    </Typography.Text>
                </Typography.Text>
            </Flex>
            {!product?.status ? <Button onClick={() => navigate(`/client/product/${product?.id}`)}>view detail</Button> :
                <Button icon={<ShoppingOutlined />} onClick={addToCart}>add to cart</Button>
            }
        </Flex>

    );
}
export default Product_Hot;