import {
    HeartOutlined,
    MinusOutlined,
    PlusOutlined,
    UserOutlined
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Empty, Flex, Form, Image, Input, Rate, Tabs, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Banner_Big from "../layout/banner_big";
import Hot from "../layout/hot";
import LastView from "../layout/last_view";
import Product_LSView from "../layout/product_LSView";
import "./../style/product_detail.css";
import { useQuery } from "@tanstack/react-query";
import { detailProduct, recommendProduct } from "../../../services/product_service";
import clsx from "clsx";
import { ACTION_PRODUCT_LASTVIEW, LastViewProductContext } from "../../../store/productLastView";
import { ACTION_CART, CartContext } from "../../../store/cart";
import Notification from "../../../utils/configToastify";
import { UserContext } from "../../../store/user";

function ProductDetail() {
    const lastView = useContext(LastViewProductContext)
    const cart = useContext(CartContext)
    const [recommendProducts, setRecommendProducts] = useState([])
    const { id } = useParams();
    const [form] = Form.useForm()
    const handleSubmit = (e) => {
        console.log(e);
    }

    const user = useContext(UserContext)
    const info = user?.state?.currentUser
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [product, setProduct] = useState({})
    const [mainImage, setMainImage] = useState('')
    const [productCategory, setProductCategory] = useState([]);

    const detailProductClient = useQuery({
        queryKey: ['detail_product_client', id],
        queryFn: () => detailProduct(id)
    })

    const getRecommendProduct = useQuery({
        queryKey: ['recommend_product', id],
        queryFn: () => recommendProduct(id)
    })

    useEffect(() => {
        if (!detailProductClient?.isSuccess) return
        const rawData = detailProductClient?.data?.data
        setProduct({
            id: rawData?._id,
            quantity: rawData?.quantity?.inTrade,
            images: rawData?.images,
            name: rawData?.name,
            unit: rawData?.unit,
            origin: rawData?.origin,
            category: rawData?.categoryId?.name,
            price: rawData?.price,
            description: rawData?.description
        })
        setMainImage(rawData?.images[0])
        return () => {
            setProduct({})
        }
    }, [detailProductClient?.isSuccess, detailProductClient?.data])

    useEffect(() => {
        if (!getRecommendProduct?.isSuccess) return
        const rawData = getRecommendProduct?.data?.data
        setRecommendProducts(rawData?.map(item => ({
            mainImage: item?.images[0],
            name: item?.name,
            id: item?._id
        })))
        return () => {
            setRecommendProducts([])
        }
    }, [getRecommendProduct?.isSuccess, getRecommendProduct?.data])


    const items = [
        {
            key: '1',
            label: 'Description',
            children: product?.description,
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

    const handleImageClick = (index) => {
        setActiveImageIndex(index);
        setMainImage(product.images[index]);
    };

    const [quantity, setQuantity] = useState(1);
    const minus = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };


    const plus = () => {
        if (quantity < product.quantity) {
            setQuantity(prevQuantity => prevQuantity + 1);
        } else {
            setQuantity(product.quantity);
        }
    }

    useEffect(() => {
        if (product && mainImage !== '')
            lastView?.dispatch({ type: ACTION_PRODUCT_LASTVIEW.ADD_PRODUCT, payload: { ...product, mainImage: mainImage } })
    }, [product, mainImage])
    console.log(123);

    const addToCart = () => {
        if (info) {
            cart?.dispatch({ type: ACTION_CART.ADD_CART, payload: { ...product, quantityBuy: quantity } })
            Notification({ message: "Add to cart successully!", type: "success" })
        }
        else {
            Notification({ message: "You have to login first!", type: "error" })

        }
    };


    return (
        <Flex vertical>
            <Banner_Big info={product?.name} />
            <Flex className="product_detail-client container" vertical align="center">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <NavLink to={'/'}>HOME</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <NavLink to={`/client/product/${product?.id}`}>{String(product?.name).toUpperCase()}</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Flex className="detail d-flex" justify="space-between">
                    <Flex className="view" vertical gap={40}>
                        <div className="img-group last_view d-flex flex-column">
                            <h5>LAST VIEW PRODUCTS</h5>
                            <hr />
                            {lastView?.state?.lastViewProduct !== undefined && lastView?.state?.lastViewProduct.length >= 2 ?
                                lastView?.state?.lastViewProduct?.filter(item => item.id !== product.id && item.id !== undefined).slice(-3).map((item, index) => (
                                    <LastView product={item} key={index} />
                                )) : <Empty description={'No product'} />
                            }
                        </div>
                        <div className="img-group last_view d-flex flex-column mt-5">
                            <h5>RECOMMEND PRODUCTS</h5>
                            <hr />
                            {/* {
                                [...Array(10)].slice(-3).map((item, index) => (
                                    <Hot product={{ product_id: '8ahsd', title: 'keo keo thom ngon vo cung luon nhe cac ban oi asd asd as', price: 129, price_promotion: 0.1 }} key={index} />
                                ))
                            } */}
                            {recommendProducts?.length >= 1 ?
                                recommendProducts.slice(1, 5).map((item, index) => (
                                    <LastView product={item} key={index} />
                                )) : <Empty description={'No product'} />
                            }
                        </div>
                    </Flex>
                    <div className="wrap_detail_sum">
                        <Flex className="d-flex" gap={'large'}>
                            <Flex vertical gap={'small'} className="image_group">
                                {product?.images?.map((item, index) => (
                                    <img src={item}
                                        alt={product?.name + index}
                                        onClick={() => handleImageClick(index)}
                                        className={clsx("small_image", { "image_active": index === activeImageIndex })}
                                        key={index} loading="lazy" />
                                ))}
                            </Flex>
                            <Flex gap={40}>
                                <div className="img-product">
                                    <Image src={mainImage} loading="lazy" className="main_image" />
                                </div>

                                <Flex className="info">

                                    <Flex vertical gap="large">
                                        <div>
                                            <Typography.Title level={1} className="title">{product?.name}</Typography.Title>
                                            <Flex gap={30}>
                                                <Typography.Title level={3}>
                                                    {product?.price * (1 - parseFloat(0.1))}$
                                                    {product?.price === 0 ? "" : <span className="discount">{`${1000}$`}</span>}
                                                </Typography.Title>
                                                <Button shape="circle" className="fav"><HeartOutlined /></Button>
                                            </Flex>
                                            <hr />
                                            <p>Stock status: <span className="stock_status">{product?.quantity === 0 ? `Out of stock` : `In stock`}</span></p>
                                            <p>Category: <span className="category">{product?.category}</span></p>
                                            <p>Unit: <span className="category">{product?.unit}</span></p>
                                            <Rate allowHalf defaultValue={2.5} />
                                            <hr />
                                        </div>
                                        <Flex vertical gap={8} style={{ height: "30vh" }}>
                                            <Flex className='form-group' gap={7}>
                                                <Input value={quantity < product?.quantity ? quantity : product?.quantity} className="form-control quantity" style={{ textAlign: "center", width: "100%" }} onChange={(e) => {
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
                                                <Button variant="warning" className="cart" onClick={addToCart}>Add to cart</Button>
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
                                <Avatar size={50} src={info?.image ? info?.image : ""} icon={<UserOutlined />} />
                                <Form
                                    form={form}
                                    layout="horizontal"
                                    onFinish={handleSubmit}
                                    style={{ width: "60%" }}
                                >
                                    <Form.Item
                                        name="comment"
                                        hasFeedback
                                        style={{ marginBottom: 0 }}
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

export default ProductDetail; 