import Banner from "../layout/banner";
import Blog from "../layout/blog_list";
import Product_Hot from "../layout/product_hot";
import Product_List from "../layout/product_list";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { paginate_product, product_hot } from "../../../services/product_service";
import { useEffect, useState } from "react";
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
        <>
            <Banner />
            <div className="product_hot container text-center ">
                <h1>Hot sales</h1>
                <div className="pruduct_hot_list row d-flex justify-content-between">
                    {product_status.slice(4, 6).map((item, index) => {
                        return <Product_Hot products={item} key={index} />
                    })}
                </div>
            </div>
            <div className="product_list container">
                <h1>new products</h1>
                <div className="products">
                    {product_new.filter(product => product.qty > 0).slice(1, 5).map((item, index) => {
                        return <Product_List products={item} key={index} />
                    })}
                </div>
            </div>

            <Blog />
        </>
    );
}
export default Home;