import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Flex } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { optionCategory } from "../../../services/category_service";
import { logout, logoutGoogle } from "../../../services/user_service";
import { ACTION_USER, UserContext } from "../../../store/user";
import Notification from "../../../utils/configToastify";
import "./../style/header.css";
import Modal_Search from "./modal_search";
import { ACTION_CART, CartContext } from "../../../store/cart";
import { LogContext } from "../../../store/typeLog/provider";
import { ACTION_LOG } from "../../../store/typeLog";
import { getFavourite } from "../../../services/favourite_service";
import { ACTION_FAVOURITE, FavouriteContext } from "../../../store/favourite";
import { OrderContext } from "../../../store/order/provider";
import { ACTION_ORDER } from "../../../store/order";
import { truncate } from "../../../utils/ellipse";

function Headers() {
    const [searchView, setSearchView] = useState(false);
    const [category, setCategory] = useState([]);

    const logGoogle = useContext(LogContext)
    const user = useContext(UserContext)
    const cart = useContext(CartContext)
    const order = useContext(OrderContext)
    const favourite = useContext(FavouriteContext)

    const [fetched, setFetched] = useState(true)
    const navigate = useNavigate()
    console.log(1235689023);
    const getFavouriteNow = useQuery({
        queryKey: ['favourite'],
        queryFn: () => getFavourite(),
        refetchOnWindowFocus: false,
        enabled: fetched || !!user?.state?.currentUser
    })
    useEffect(() => {
        if (!getFavouriteNow?.isSuccess) return
        else {
            setFetched(false)
            const rawData = getFavouriteNow?.data?.data?.products
            favourite.dispatch({ type: ACTION_FAVOURITE.FETCH_FAVOURITE, payload: rawData })
        }
    }, [getFavouriteNow?.isSuccess, getFavouriteNow?.data])


    const handleCart = () => {
        if (!user?.state?.currentUser) Notification({ message: "You have to login first!", type: "error" })
        else
            navigate("/client/cart")
    }

    const toggleSearchView = () => {
        setSearchView(!searchView);
    };

    const { mutate } = useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            Notification({ message: "Logout successully!", type: "success" });
            user?.dispatch({ type: ACTION_USER.LOGOUT })
        },
        onError: (error) => {
            Notification({ message: `${error.response.data.message}`, type: "error" })
        }
    })

    const outGoogle = useMutation({
        mutationKey: ['logout_google'],
        mutationFn: () => logoutGoogle(),
        onSuccess: () => {
            Notification({ message: "Logout successully!", type: "success" });
            user?.dispatch({ type: ACTION_USER.LOGOUT })
            logGoogle.dispatch({ type: ACTION_LOG.OUT })
        },
        onError: (error) => {
            Notification({ message: `${error.response.data.message}`, type: "error" })
        }
    })
    const handleLogout = () => {
        if (logGoogle?.state?.isLogByGoogle) {
            outGoogle.mutate()
        }
        else {
            mutate()
        }
        order?.dispatch({ type: ACTION_ORDER.REMOVE_ORDER })
        cart?.dispatch({ type: ACTION_CART.REMOVE_CART })
        favourite?.dispatch({ type: ACTION_FAVOURITE.REMOVE_FAVOURITE })
    }

    const { data, isError } = useQuery({
        queryKey: ['category_list_client'],
        queryFn: () => optionCategory()
    })


    useEffect(() => {
        if (isError) return
        const rawData = data?.data?.data
        setCategory(rawData?.map((item) => ({
            name: truncate(item.name),
            id: item._id,
            order: item?.order,
            status: item?.isActive
        })));
        return () => {
            setCategory([])
        }
    }, [setCategory, isError, data])
    console.log(category?.sort((a, b) => a.order - b.order));

    return (
        <>
            {!searchView && (
                <header>
                    <Flex style={{ height: "100%" }} justify="space-between">
                        <Flex className="header-logo" align="center">
                            <Link to={"home"} className="icon">
                                <img src="/data/logo/scart-mid.png" alt="logo" width={120} height={60} />
                            </Link>
                        </Flex>
                        <Flex className="header-link" justify="space-between">
                            <Link to={"home"}>home</Link>
                            <Link className="main_menu" to={"#"}>
                                <div>categories</div>
                                <div className="sub_menu">
                                    {category?.filter(item => item?.status)?.sort((a, b) => a.order - b.order)?.map((item) => (
                                        <NavLink key={item.id} to={`/client/category/${item.id}`}>{item.name}</NavLink>
                                    ))}

                                </div>
                            </Link>
                            <Link to={"shop"}>shop</Link>
                        </Flex>
                        <div className="header-icon">
                            <div>
                                <button onClick={toggleSearchView}><SearchOutlined style={{ fontSize: '18px' }} /></button>
                            </div>

                            <div>
                                <button className="cart" onClick={handleCart}><NavLink><ShoppingCartOutlined style={{ fontSize: '18px' }} /></NavLink></button>
                                <div className="qty">{cart?.state?.currentCart?.length ?? 0}</div>
                            </div>
                            <>
                                <div className="main_menu">
                                    <UserOutlined style={{ fontSize: '18px' }} />
                                    <div className="user">
                                        {(user?.state.currentUser !== null && user?.state.currentUser !== undefined) ? (<>
                                            <Link to={'user'}>
                                                Infomation
                                            </Link>
                                            <Link to={'user/change-password'}>
                                                Change password
                                            </Link>
                                            <Link to={'user/wishlist'}>
                                                Wishlist
                                            </Link>
                                            <Link to={'user/orders'}>
                                                Orders
                                            </Link>
                                            <Link onClick={handleLogout}>
                                                Logout
                                            </Link>
                                        </>) : (
                                            <>
                                                <Link to={'/'}>
                                                    Login
                                                </Link>
                                                <Link to={'/register'}>
                                                    Sign up
                                                </Link>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </>
                        </div>
                    </Flex>
                </header >)}
            {searchView && <Modal_Search onClose={toggleSearchView} />}
        </>
    );
}

export default Headers; 