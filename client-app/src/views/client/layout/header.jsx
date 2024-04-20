import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { list_category } from "../../../services/category_service";
import "./../style/header.css";
import Modal_Search from "./modal_search";
import { BellOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Button, Flex, Popover } from "antd";
import { logout } from "../../../services/user_service";
import Notification from "../../../utils/configToastify";
function Headers(props) {
    const navigate = useNavigate();
    const [searchView, setSearchView] = useState(false);
    const [openPopover, setOpenPopover] = useState(false)
    const [category, setCategory] = useState([]);
    const toggleSearchView = () => {
        setSearchView(!searchView);
    };
    const hanldeLogout = async () => {
        try {
            const rs = await logout();
            if (rs.status) {
                Notification({ message: "Logout successully!", type: "success" });
                navigate('/', { replace: true })
            }
        } catch (error) {
            Notification({ message: `${error.response.data.message}`, type: "error" })

        }

    }

    const notification = (
        <Flex vertical>
            <Flex className="notification">Products 1 is available</Flex>
            <Flex className="notification">Products 2 is available</Flex>
        </Flex>
    )
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
                                    {/* {category.map((item) => (
                                    <Link key={item.category_id} to={`/category/${item.name}`}>{item.name}</Link>
                                ))} */}
                                    <Link to={'/client/category/asdoniasd'}>
                                        jasbkabsd
                                    </Link>
                                    <Link>
                                        jasbkabsd  asdfe f2f2
                                    </Link>
                                    <Link>
                                        jasa213d  412 f2f2
                                    </Link>
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
                                        {/* {category.map((item) => (
                                    <Link key={item.category_id} to={`/category/${item.name}`}>{item.name}</Link>
                                ))} */}
                                        <Link to={'user'}>
                                            Infomation
                                        </Link>
                                        <Link to={'user/change-password'}>
                                            Change password
                                        </Link>
                                        <Link to={'user/wishlist'}>
                                            Wishlist
                                        </Link>
                                        <Link onClick={hanldeLogout}>
                                            Logout
                                        </Link>
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
const mapStateToProps = (state) => {
    return {
        state: state.cart_reducer
    }
}
export default Headers; 