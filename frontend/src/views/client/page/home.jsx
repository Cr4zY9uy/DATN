import { useQuery } from "@tanstack/react-query";
import { Flex, Skeleton, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { listProduct } from "../../../services/product_service";
import { loginByGoogle } from "../../../services/user_service";
import Banner from "../layout/banner";
import { Countdown } from "../layout/CountDown";
import Product_Hot from "../layout/product_hot";
import Product_List from "../layout/product_list";
import RecommendedProduct from "../layout/RecommendedProduct";
import { ACTION_USER, UserContext } from "../../../store/user";
import Notification from "../../../utils/configToastify";
import { LogContext } from "../../../store/typeLog/provider";

function Home() {
    document.title = "Home";
    const { dispatch } = useContext(UserContext)
    const logGoogle = useContext(LogContext)
    const [productHot, setProductHot] = useState([]);
    const [productNew, setProductNew] = useState([]);
    const [isLoadingSale, SetIsLoadingSale] = useState(true)
    const [isLoadingNew, SetIsLoadingNew] = useState(true)

    const { data, isSuccess } = useQuery({
        queryKey: ['home'],
        queryFn: () => listProduct(1, '', '', '', '', '', 'descend')
    })


    useEffect(() => {
        if (!isSuccess) return
        const rawData = data?.data?.products?.docs
        setProductHot(rawData?.map(item => ({
            name: item?.name,
            price: item?.price,
            image: item?.images[0],
            id: item?._id,
            origin: item?.origin
        })))
        setProductNew(rawData?.map(item => ({
            name: item?.name,
            price: item?.price,
            image: item?.images[0],
            id: item?._id,
            origin: item?.origin
        })))
        SetIsLoadingNew(false)
        SetIsLoadingSale(false)
        return () => {
            setProductNew([])
            setProductHot([])
            SetIsLoadingNew(false)
            SetIsLoadingSale(false)
        }
    }, [isSuccess, data, SetIsLoadingNew, SetIsLoadingSale])

    const getUser = useQuery({
        queryKey: ['getUser_google'],
        queryFn: () => loginByGoogle(),
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!logGoogle?.state?.isLogByGoogle
    })

    useEffect(() => {
        if (logGoogle?.state?.isLogByGoogle) {
            if (!getUser?.isSuccess) return
            else {
                Notification({ message: "Login successfully!", type: "success" })
                dispatch({ type: ACTION_USER.LOGIN, payload: getUser?.data?.data })
            }
        }
    }, [getUser?.isSuccess, getUser?.data, getUser?.error, dispatch])
    return (
        <Flex vertical>
            <Banner />
            <RecommendedProduct />
            <Countdown />
            <Flex className="product_hot container text-center" vertical >
                <Flex gap='large'>
                    {productHot.slice(1, 2).map((item, index) => {
                        return <Skeleton key={index} loading={isLoadingSale} active>
                            <Product_Hot products={item} key={item.id} />
                        </Skeleton>
                    })}
                </Flex>
            </Flex>
            <Flex className="product_list container" vertical>
                <Typography.Title level={1}>new products</Typography.Title>
                <Flex className="products" gap='large'>
                    {productNew.slice(1, 5).map((item, index) => {
                        return <Skeleton loading={isLoadingNew} active key={index}>
                            <Product_List products={item} key={item.id} />
                        </Skeleton>
                    })}
                </Flex>
            </Flex>
        </Flex>
    );
}
export default Home;