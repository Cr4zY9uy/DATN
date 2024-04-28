import { BellOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Badge, Button, Flex, Popover } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { optionCategory } from "../../../services/category_service";
import { logout } from "../../../services/user_service";
import { ACTION, UserContext } from "../../../store/user";
import Notification from "../../../utils/configToastify";
import "./../style/header.css";
import Modal_Search from "./modal_search";

function Headers() {
    const [searchView, setSearchView] = useState(false);
    const [openPopover, setOpenPopover] = useState(false)
    const [category, setCategory] = useState([]);
    const { dispatch, state } = useContext(UserContext)

    const toggleSearchView = () => {
        setSearchView(!searchView);
    };

    const { mutate } = useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            Notification({ message: "Logout successully!", type: "success" });
            dispatch({ type: ACTION.LOGOUT })
        },
        onError: (error) => {
            Notification({ message: `${error.response.data.message}`, type: "error" })
        }
    })

    const { data, isError } = useQuery({
        queryKey: ['category_list_client'],
        queryFn: () => optionCategory()
    })


    const notification = (
        <Flex vertical>
            <Flex className="notification">Products 1 is available</Flex>
            <Flex className="notification">Products 2 is available</Flex>
        </Flex>
    )

    useEffect(() => {
        if (isError) return

        setCategory(data?.data?.docs?.map((item) => ({
            name: item.name,
            id: item._id
        })));
        return () => {
            setCategory([])
        }
    }, [setCategory, isError, data, category])

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
                                        <NavLink key={item.id} to={`/category/${item.id}`}>{item.name}</NavLink>
                                    ))}

                                </div>
                            </Link>

                            <Link to={"shop"}>shop</Link>
                            <Link to={"blog"}>blogs</Link>
                        </div>
                        <div className="header-icon">
                            <div>
                                <button onClick={toggleSearchView}><SearchOutlined style={{ fontSize: '18px' }} /></button>
                            </div>

                            <div>
                                <button className="cart"><NavLink to={'cart'}><ShoppingCartOutlined style={{ fontSize: '18px' }} /></NavLink></button>
                                <div className="qty">0</div>
                            </div>
                            <>
                                <div className="main_menu">
                                    <UserOutlined style={{ fontSize: '18px' }} />
                                    <div className="user">
                                        {state.currentUser ? (<>
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
                                            <Link onClick={mutate}>
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
                                <div>
                                    <Popover content={notification} trigger={'click'} arrow={false} open={openPopover}>
                                    </Popover>
                                    <Badge dot={true} offset={[-10, 8]}>
                                        <Button icon={<BellOutlined style={{ fontSize: '18px' }} onClick={() => setOpenPopover(!openPopover)} />}></Button>
                                    </Badge>
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