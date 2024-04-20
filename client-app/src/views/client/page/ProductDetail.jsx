import {
    HeartFilled,
    HeartOutlined,
    MinusOutlined,
    PlusOutlined,
    UserOutlined
} from "@ant-design/icons";
import { Avatar, Flex, Form, Image, Input, Rate, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import { Breadcrumb, Button } from "antd";
import { connect } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import CART_ACTION from "../../../redux/cart/cart_action";
import PRODUCT_ACTION from "../../../redux/product/product_action";
import { product_by_cate, product_detail, product_hot } from "../../../services/product_service";
import Banner_Big from "../layout/banner_big";
import Hot from "../layout/hot";
import LastView from "../layout/last_view";
import Product_LSView from "../layout/product_LSView";
import "./../style/product_detail.css";
function ProductDetail(props) {
    const { id } = useParams();
    const [form] = Form.useForm()
    const handleSubmit = (e) => {
        console.log(e);
    }
    const items = [
        {
            key: '1',
            label: 'Description',
            children: 'When the grapes begin to bear fruit, farmers prune away 40-50% of the grapes on the trellis to ensure fruit quality. Grape pruners to be experienced middle-aged people, they can identify which bunches of grapes to prune and which ones to keep.',
        },
        {
            key: '2',
            label: 'Comments',
            children:
                <Flex gap={25} vertical className="comments">
                    <Flex align='center' gap={50}>
                        <Avatar size={50} src="http://res.cloudinary.com/dv7ni8uod/image/upload/v1713456414/shop/spbuqhgkocky3aef2rtk.webp" icon={<UserOutlined />} />
                        <Typography.Text style={{ fontSize: "16px" }}>Very good. nice service</Typography.Text>
                    </Flex>
                    <Flex align='center' gap={50}>
                        <Avatar size={50} src="http://res.cloudinary.com/dv7ni8uod/image/upload/v1713456414/shop/spbuqhgkocky3aef2rtk.webp" icon={<UserOutlined />} />
                        <Typography.Text style={{ fontSize: "16px" }}>Very good. nice service</Typography.Text>
                    </Flex>
                    <Flex align='center' gap={50}>
                        <Avatar size={50} src="" icon={<UserOutlined />} />
                        <Typography.Text style={{ fontSize: "16px" }}>Very good. nice service</Typography.Text>
                    </Flex>

                </Flex>,
        }
    ];
    const [main, setMain] = useState('/data/banner/banner-home-1.png')
    // const products = props.state[1].products;
    // const [hot, setHot] = useState([]);
    // const [product, setProduct] = useState({});
    // const [productRelated, setProductRelated] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const minus = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
        if (quantity === 0) setQuantity(0)
    };

    const hanldeImage = (e) => {
        setMain(e.target.src)
        e.target.src = main;
    }
    const plus = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        // if (quantity >= product.qty - 1) {
        //     setQuantity(product.qty);
        // }
    }
    // const items = [
    //     {
    //         key: '1',
    //         label: 'Description',
    //         children: product.description
    //     }
    // ];
    // const addToCart = () => {
    //     const cart = props.state[0].cart;
    //     const existingItemIndex = cart.findIndex(cartItem => cartItem.product_id === product.product_id);
    //     if (existingItemIndex !== -1) {
    //         cart[existingItemIndex].quantity += quantity;
    //     } else {
    //         cart.push({ ...product, quantity: quantity });
    //     }
    //     props.addToCart(cart);
    //     Store.addNotification({
    //         title: "Sucess!!",
    //         message: "You add to cart successfully!",
    //         type: "success",
    //         insert: "top",
    //         container: "top-right",
    //         animationIn: ["animate__animated", "animate__fadeIn"],
    //         animationOut: ["animate__animated", "animate__fadeOut"],
    //         dismiss: {
    //             duration: 1500,
    //             onScreen: true
    //         }
    //     });
    // };
    // const load_product_hot = async () => {
    //     try {
    //         const rs = await product_hot();
    //         setHot(rs.data.product_list);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }
    // const load_product = async () => {
    //     try {
    //         const rs = await product_detail(id);
    //         setProduct(rs.data.product);
    //         const existingItemIndex = products.findIndex(item => item.product_id === rs.data.product.product_id);
    //         if (existingItemIndex === -1) {
    //             products.push({ ...rs.data.product });
    //             props.addToProduct(products);
    //         }
    //     }
    //     catch (error) {
    //         console.log(error.message);
    //     }
    // }
    // const load_product_cate = async () => {
    //     try {
    //         const rs = await product_by_cate(product.category_name);
    //         setProductRelated(rs.data.product_list);
    //     }
    //     catch (error) {
    //         console.log(error.message);
    //     }
    // }
    // useEffect(() => {
    //     load_product();
    // }, [id])
    // useEffect(() => {
    //     document.title = product.title;
    // }, [product])
    // useEffect(() => {
    //     load_product_hot();
    // }, [])
    // useEffect(() => {
    //     if (product.category_name) {
    //         load_product_cate();
    //     }
    // }, [product.category_name])
    return (
        <Flex vertical>
            <Banner_Big info={"helo"} />
            <Flex className="product_detail-client container" vertical align="center">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <NavLink to={'/'}>HOME</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <NavLink to={`/product/qw`}>{"product.title"}</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Flex className="detail d-flex" justify="space-between">
                    <Flex className="view" vertical gap={40}>
                        <div className="img-group last_view d-flex flex-column">
                            <h5>LAST VIEW PRODUCTS</h5>
                            <hr />
                            {/* {.filter(item => item.product_id !== product.product_id) */
                                [...Array(10)].slice(-3).map((item, index) => (
                                    <LastView product={{ product_id: '8ahsd', title: 'keo keo thom ngon' }} key={index} />
                                ))
                            }
                        </div>
                        <div className="img-group last_view d-flex flex-column mt-5">
                            <h5>RECOMMEND PRODUCTS</h5>
                            <hr />
                            {/* {.filter(item => item.product_id !== product.product_id) */
                                [...Array(10)].slice(-3).map((item, index) => (
                                    <Hot product={{ product_id: '8ahsd', title: 'keo keo thom ngon vo cung luon nhe cac ban oi asd asd as', price: 129, price_promotion: 0.1 }} key={index} />
                                ))
                            }
                        </div>
                    </Flex>
                    <div className="wrap_detail_sum">
                        <Flex className="d-flex" gap={'large'}>
                            <Flex vertical gap={'small'} className="image_group">
                                <img src="http://res.cloudinary.com/dv7ni8uod/image/upload/v1713456414/shop/spbuqhgkocky3aef2rtk.webp" alt="prodct1" onClick={hanldeImage} />
                                <img src="http://res.cloudinary.com/dv7ni8uod/image/upload/v1713456675/shop/pou4elirpyrhkzwtciay.png" alt="prodct1" onClick={hanldeImage} />
                                <img src="http://res.cloudinary.com/dv7ni8uod/image/upload/v1713456699/shop/buihuxwefgd6ibpu7wui.png" alt="prodct1" onClick={hanldeImage} />
                            </Flex>
                            <Flex gap={40}>
                                <div className="img-product">
                                    <Image src={main} loading="lazy" className="main_image" />
                                </div>

                                <Flex className="info">

                                    <Flex vertical gap="large">
                                        <div>
                                            <Typography.Title level={1} className="title">Keo beo ngon vo cung</Typography.Title>
                                            <Flex gap={30}>
                                                <Typography.Title level={3}>
                                                    {1000 * (1 - parseFloat(0.1))}$
                                                    {1000 === 0 ? "" : <span className="discount">{`${1000}$`}</span>}
                                                </Typography.Title>
                                                <Button shape="circle" className="fav"><HeartOutlined /></Button>
                                            </Flex>
                                            <hr />
                                            <p>Stock status: <span className="stock_status">{10 === 0 ? `Out of stock` : `In stock`}</span></p>
                                            <p>Category: <span className="category">Hoa qua co mui</span></p>
                                            <Rate allowHalf defaultValue={2.5} />
                                            <hr />
                                        </div>
                                        <Flex vertical gap={8} style={{ height: "30vh" }}>
                                            <Flex className='form-group' gap={7}>
                                                <Input value={quantity} className="form-control quantity" style={{ textAlign: "center", width: "100%" }} onChange={(e) => {
                                                    if (e.target.value > 0)
                                                        setQuantity(e.target.value)
                                                }} />
                                                <Flex vertical justify="space-between">
                                                    <Button variant="light" onClick={plus} style={{ height: "45%" }}>
                                                        <PlusOutlined />
                                                    </Button>
                                                    <Button variant="light" onClick={minus} style={{ height: "45%" }}>
                                                        <MinusOutlined />
                                                    </Button >
                                                </Flex>
                                            </Flex>
                                            <Flex style={{ height: "50%" }}>
                                                <Button variant="warning" className="cart"> Add to cart</Button>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Tabs defaultActiveKey="1" items={items} />
                        <Flex gap={30} style={{ width: "100%" }} vertical className="submit_comment">

                            <Typography.Title level={2}>Submit your comment</Typography.Title>
                            <Flex style={{ width: "100%" }} align="center" gap={50}>
                                <Avatar size={50} src="" icon={<UserOutlined />} />
                                <Form
                                    form={form}
                                    layout="horizontal"
                                    onFinish={handleSubmit}
                                    style={{ width: "60%" }}
                                >
                                    <Form.Item
                                        name="comment"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input!',
                                            },
                                            {
                                                min: 3,
                                                message: "At least 3 characters"
                                            },
                                            {
                                                max: 150,
                                                message: "At max 50 characters"
                                            }
                                        ]}
                                    >
                                        <Input type="text" placeholder="Type your comment here" size="large" style={{ marginBottom: "0px" }} />
                                    </Form.Item>
                                </Form>
                            </Flex>
                        </Flex>
                        <Flex className="product_relate-list" vertical>
                            <Typography.Title level={2}>You may like</Typography.Title>
                            <Flex className="relate_list" gap="large">
                                {
                                    [...Array(10)].slice(-3).map((item, index) => (
                                        <Product_LSView product={{ product_id: '8ahsd', title: 'keo keo thom ngon luon he ban oi', price: 129, price_promotion: 0.1 }} key={index} />
                                    ))
                                }
                            </Flex>
                        </Flex>
                    </div>
                </Flex>

            </Flex>
        </Flex>
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
export default ProductDetail; 