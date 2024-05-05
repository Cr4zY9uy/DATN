import { Link } from "react-router-dom";
import { Badge, Button, Flex, Typography } from "antd";
import "./../style/product_grid.css";
import { HeartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { ACTION_CART, CartContext } from "../../../store/cart";
import Notification from "../../../utils/configToastify";
import { UserContext } from "../../../store/user";
function ProductGrid(props) {
    const product = props?.products;
    const type = props?.type
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

    return (
        <Flex className='item' key={product.id} vertical>
            <Link to={`/client/product/${product.id}`}>
                {!type &&
                    (<><Button className="favourite" icon={<HeartOutlined />} />
                        <Badge.Ribbon text={'-10%'} color="red" placement="start" /></>)}
                <img src={product.image} loading="lazy" />

            </Link>
            <Flex className="pt-4" vertical>
                {!type &&
                    (<>
                        <Typography.Title level={5} className="country">{product.origin}</Typography.Title>
                    </>)}
                <Typography.Title level={4} className="title">{product.name}</Typography.Title >
                {!type &&
                    (<>
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
                        </Typography.Text> </>)}
            </Flex>
            {!type && <Button icon={<ShoppingOutlined />} className="buy" onClick={addToCart}>add to cart</Button>}

        </Flex>
    );
}
export default ProductGrid;