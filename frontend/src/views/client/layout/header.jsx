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
import { CartContext } from "../../../store/cart";
import { LogContext } from "../../../store/typeLog/provider";
import { ACTION_LOG } from "../../../store/typeLog";

function Headers() {
    const [searchView, setSearchView] = useState(false);
    const [category, setCategory] = useState([]);

    const logGoogle = useContext(LogContext)
    const user = useContext(UserContext)
    const cart = useContext(CartContext)
    const navigate = useNavigate()

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
    console.log(1234);
    const handleLogout = () => {
        if (logGoogle?.state?.isLogByGoogle) {
            outGoogle.mutate()
        }
        else {
            mutate()
        }
    }

    const { data, isError } = useQuery({
        queryKey: ['category_list_client'],
        queryFn: () => optionCategory()
    })


    useEffect(() => {
        if (isError) return
        const rawData = data?.data?.data
        setCategory(rawData?.map((item) => ({
            name: item.name,
            id: item._id
        })));
        return () => {
            setCategory([])
        }
    }, [setCategory, isError, data])

    return (
        <>
            {!searchView && (
                <header>
                    <Flex style={{ height: "100%" }}>
                        <Flex className="header-logo" align="center">
                            <Link to={"home"} className="icon">
                                <img src="/data/logo/scart-mid.png" alt="logo" width={120} height={60} />
                            </Link>
                        </Flex>
                        <div className="header-link">
                            <Link to={"home"}>home</Link>
                            <Link className="main_menu">
                                <div>categories</div>
                                <div className="sub_menu">
                                    {category?.map((item) => (
                                        <NavLink key={item.id} to={`/client/category/${item.id}`}>{item.name}</NavLink>
                                    ))}

                                </div>
                            </Link>
                            <Link to={"shop"}>shop</Link>
                        </div>
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