import { Link } from "react-router-dom";
import { Badge, Button, Flex, Typography } from "antd";
import "./../style/product_grid.css";
import { HeartOutlined, ShoppingOutlined } from "@ant-design/icons";
function ProductGrid(props) {
    const product = props?.products;
    const type = props?.type
    return (
        <Flex className='item' key={product.product_id} vertical>
            <Link to={`/client/product/${product.product_id}`}>
                {!type &&
                    (<><Button className="favourite" icon={<HeartOutlined />} />
                        <Badge.Ribbon text={'-10%'} color="red" placement="start" /></>)}
                <img src="/data/banner/banner-home-1.png" loading="lazy" />

            </Link>
            <Flex className="pt-4" vertical>
                {!type &&
                    (<>
                        <Typography.Title level={5} className="country">Korea</Typography.Title>
                    </>)}
                <Typography.Title level={4} className="title">{product.title}</Typography.Title >
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
            {!type && <Button icon={<ShoppingOutlined />} className="buy">add to cart</Button>}

        </Flex>
    );
}
export default ProductGrid;