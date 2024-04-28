import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import "./../style/product_LSView.css";
function Product_LSView(props) {
    const product = props.product;

    // const addToCart = () => {
    //     const cart = props.state.cart;
    //     console.log(1);
    //     const existingItemIndex = cart.findIndex(cartItem => cartItem.product_id === product.product_id);
    //     if (existingItemIndex !== -1) {
    //         cart[existingItemIndex].quantity += 1;
    //     } else {
    //         cart.push({ ...product, quantity: 1 });
    //     }
    //     props.addToCart(cart);

    // };
    return (
        <Flex className='item_related' vertical gap={30}>
            <Flex vertical align="center">
                <Link to={`/product/${product.product_id}`}>
                    <img src="/data/banner/banner-home-1.png" loading="lazy" />
                </Link>
                <Typography.Title className="title" level={4} ellipsis={true} style={{ maxWidth: "70%" }}>{product.title}</Typography.Title>
                <p>
                    {Math.ceil(product.price * (1 - parseFloat(product.price_promotion)))}$
                    {product.price_promotion === 0 ? "" : <span className="discount">{`${product.price}$`}</span>}
                </p>
            </Flex>
            <Flex className="button_group" justify="space-evenly">
                <Button shape="circle"><ShoppingCartOutlined /></Button>
                <Button shape="circle"><HeartOutlined /></Button>
            </Flex>
        </Flex>

    );
}

export default Product_LSView; 