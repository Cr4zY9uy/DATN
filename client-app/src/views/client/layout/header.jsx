import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { list_category } from "../../../services/category_service";
import "./../style/header.css";
import Modal_Search from "./modal_search";
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Flex } from "antd";
function Headers(props) {
    const navigate = useNavigate();
    const [searchView, setSearchView] = useState(false);
    const [category, setCategory] = useState([]);
    const toggleSearchView = () => {
        setSearchView(!searchView);
    };

    return (
        <>
            <header>
                <Flex style={{ height: "100%" }}>
                    <div className="header-logo d-flex align-items-center">
                        <Link to={"home"} className="icon">
                            <img src="/data/logo/scart-mid.png" alt="logo" width={120} height={60} />
                        </Link>
                    </div>
                    <div className="header-link">
                        <Link to={"home"}>home</Link>
                        <Link className="main_menu">
                            <div>categories</div>
                            <div className="sub_menu">
                                {/* {category.map((item) => (
                                    <Link key={item.category_id} to={`/category/${item.name}`}>{item.name}</Link>
                                ))} */}
                                <Link>
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
                            <button onClick={toggleSearchView}><SearchOutlined style={{ fontSize: '16px' }} /></button>
                        </div>
                        <div>
                            <button className="cart"><NavLink to={'cart'}><ShoppingCartOutlined style={{ fontSize: '16px' }} /></NavLink></button>
                            <div className="qty">0</div>
                        </div>
                        <div className="main_menu">
                            <UserOutlined style={{ fontSize: '16px' }} />
                            <div className="user">
                                {/* {category.map((item) => (
                                    <Link key={item.category_id} to={`/category/${item.name}`}>{item.name}</Link>
                                ))} */}
                                <Link>
                                    Infomation
                                </Link>
                                <Link>
                                    Wishlist
                                </Link>
                                <Link>
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </Flex>
            </header >
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