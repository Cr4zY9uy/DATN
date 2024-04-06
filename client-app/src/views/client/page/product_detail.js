import { Tabs } from "antd";
import {
    PlusOutlined,
    MinusOutlined
} from "@ant-design/icons";
import "./../style/product_detail.css";
import { Breadcrumb, Button } from "react-bootstrap";
import Product_LSView from "../layout/product_LSView";
import { NavLink, useParams } from "react-router-dom";
import Banner_Big from "../layout/banner_big";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import CART_ACTION from "../../../redux/cart/cart_action";
import { product_by_cate, product_detail, product_hot } from "../../../services/product_service";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { Store } from "react-notifications-component";
import PRODUCT_ACTION from "../../../redux/product/product_action";
import LastView from "../layout/last_view";
import Hot from "../layout/hot";
function ProductDetail(props) {
    const { id } = useParams();
    const products = props.state[1].products;
    const [hot, setHot] = useState([]);
    const [product, setProduct] = useState({});
    const [productRelated, setProductRelated] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const minus = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
        if (quantity === 0) setQuantity(0)
    };
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dv7ni8uod'
        }
    });

    const plus = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        if (quantity >= product.qty - 1) {
            setQuantity(product.qty);
        }
    }
    const items = [
        {
            key: '1',
            label: 'Description',
            children: product.description
        }
    ];
    const addToCart = () => {
        const cart = props.state[0].cart;
        const existingItemIndex = cart.findIndex(cartItem => cartItem.product_id === product.product_id);
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ ...product, quantity: quantity });
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
    const load_product_hot = async () => {
        try {
            const rs = await product_hot();
            setHot(rs.data.product_list);
        } catch (error) {
            console.log(error.message);
        }
    }
    const load_product = async () => {
        try {
            const rs = await product_detail(id);
            setProduct(rs.data.product);
            const existingItemIndex = products.findIndex(item => item.product_id === rs.data.product.product_id);
            if (existingItemIndex === -1) {
                products.push({ ...rs.data.product });
                props.addToProduct(products);
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
    const load_product_cate = async () => {
        try {
            const rs = await product_by_cate(product.category_name);
            setProductRelated(rs.data.product_list);
        }
        catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        load_product();
    }, [id])
    useEffect(() => {
        document.title = product.title;
    }, [product])
    useEffect(() => {
        load_product_hot();
    }, [])
    useEffect(() => {
        if (product.category_name) {
            load_product_cate();
        }
    }, [product.category_name])
    return (
        <div>
            <Banner_Big info={product.title} />
            <div className="product_detail-client container">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <NavLink to={'/'}>HOME</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <NavLink to={`/product/${product.product_id}`}>{product.title}</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="detail d-flex">
                    <div className="view">
                        <div className="img-group last_view d-flex flex-column">
                            <h5>LAST VIEW PRODUCTS</h5>
                            <hr />
                            {
                                products.filter(item => item.product_id !== product.product_id).slice(-3).map((item, index) => {
                                    return <LastView product={item} key={index} />
                                })
                            }
                        </div>
                        <div className="img-group last_view d-flex flex-column mt-5">
                            <h5>RECOMMEND PRODUCTS</h5>
                            <hr />
                            {
                                hot.filter(item => item.qty > 0).slice(0, 3).map((item, index) => {
                                    return <Hot product={item} key={index} />
                                })
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-column align-items-center wrap_detail_sum">
                        <div className="d-flex">
                            <div className="img-product">
                                <AdvancedImage cldImg={cld.image(product.thumbnail)} />
                            </div>

                            <div className="info">
                                <div>
                                    <h1>{product.title}</h1>
                                    <h5>
                                        {product.price * (1 - parseFloat(product.price_promotion))}$
                                        {product.price_promotion === 0 ? "" : <span className="discount">{`${product.price}$`}</span>}
                                    </h5>
                                    <hr />
                                    <p>Stock status: <span className="">{product.qty === 0 ? `Out of stock` : `In stock`}</span></p>
                                    <p>Category: <span>{product.category_name}</span></p>
                                    <hr />
                                </div>
                                <div>
                                    <div className='form-group d-flex align-items-center justify-content-start'>
                                        <input value={quantity} className="form-control quantity" style={{ textAlign: "center" }} readOnly />
                                        <div className="d-flex flex-column justify-content-between ms-2" style={{ height: "100%", width: "30%" }}>
                                            <Button variant="light" onClick={plus}>
                                                <PlusOutlined />
                                            </Button>
                                            <Button variant="light" onClick={minus}>
                                                <MinusOutlined />
                                            </Button >

                                        </div>
                                    </div>
                                    <Button variant="warning" style={{ width: "43%", height: "10vh", marginTop: 15 }} disabled={product.qty === 0 ? true : false} onClick={addToCart}> Add to cart</Button>
                                </div>
                            </div>
                        </div>
                        <Tabs defaultActiveKey="1" items={items} style={{ width: "70%", marginLeft: 60 }} />
                    </div>
                </div>
                <div className="product_relate-list ">
                    <h2>You may like</h2>
                    <div className="relate_list row">
                        {productRelated.filter(item => item.product_id !== id).slice(0, 3).map((item, index) => {
                            return <Product_LSView product={item} key={index} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        state: [state.cart_reducer, state.product_reducer]
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (cart) => {
            dispatch({ type: CART_ACTION.ADD_CART, payload: cart });
        },
        addToProduct: (products) => {
            dispatch({ type: PRODUCT_ACTION.ADD_PRODUCT, payload: products })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail); 