import { useEffect, useState } from "react";
import { paginate_product, product_hot } from "../../../services/product_service";
import Banner from "../layout/banner";
import Blog from "../layout/blog_list";
import Product_Hot from "../layout/product_hot";
import Product_List from "../layout/product_list";
import { Flex, Typography } from "antd";
import RecommendedProduct from "../layout/RecommendedProduct";
import { Countdown } from "../layout/CountDown";

function Home() {
    document.title = "Home";
    const [product_status, setProductHot] = useState([]);
    const [product_new, setProductNew] = useState([]);
    const product_hot_list = async () => {
        try {
            const rs = await product_hot();
            setProductHot(rs.data.product_list);
            if (rs.status !== 200) {
                console.log(rs.statusText)
            }
        } catch (err) {
            if (err.response) {
                console.log(err.response.status);
            }
        }
    }
    const product_new_list = async () => {
        try {
            const rs = await paginate_product();
            setProductNew(rs.data.product_list);
            if (rs.status !== 200) {
                console.log(rs.statusText)
            }
        } catch (err) {
            if (err.response) {
                console.log(err.response.status);
            }
        }
    }

    useEffect(() => {
        product_hot_list();
        product_new_list();
    }, [])
    return (
        <Flex vertical>
            <Banner />
            <RecommendedProduct />
            <Countdown />
            <Flex className="product_hot container text-center" vertical >
                <Flex gap='large'>
                    {[...Array(10)].slice(4, 6).map((item, index) => {
                        return <Product_Hot products={{ product_id: 1, title: "Keo bong gon cuc ngon", price: 1024133, price_promotion: 0.1, qty: 10 }} key={index} />
                    })}
                </Flex>
            </Flex>
            <Flex className="product_list container" vertical>
                <Typography.Title level={1}>new products</Typography.Title>
                <Flex className="products" gap='large'>
                    {[...Array(10)].slice(1, 5).map((item, index) => {
                        return <Product_List products={{ product_id: 1, title: "Keo bong gon", price: 1024133, price_promotion: 0.1, qty: 10 }} key={index} />
                    })}
                </Flex>
            </Flex>
            <Blog />
        </Flex>
    );
}
export default Home;