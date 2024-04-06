import { Link, NavLink, useNavigate } from "react-router-dom";
import "./../style/header.css";
import { useEffect, useState } from "react";
import Modal_Search from "./modal_search";
import { list_category } from "../../../services/category_service";
import { connect } from "react-redux";
function Header(props) {
    const navigate = useNavigate();
    const cart = props.state?.cart;
    const [searchView, setSearchView] = useState(false);
    const [category, setCategory] = useState([]);
    const toggleSearchView = () => {
        setSearchView(!searchView);
    };
    window.scrollTo(0, 0);
    const cate_list = async () => {
        try {
            const rs = await list_category();
            setCategory(rs.data.category_list);
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
        cate_list();
    }, [])
    return (
        <header>
            <div className="headers container" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className="header-logo d-flex align-items-center">
                    <Link to={"/"} className="icon">
                        <img src="/data/logo/scart-mid.png" alt="logo" width={120} height={60} />
                    </Link>
                </div>
                <div className="header-link">
                    <Link to={"/"}>home</Link>
                    <Link className="main_menu">
                        <div>categories</div>
                        <div className="sub_menu">
                            {category.map((item) => (
                                <Link key={item.category_id} to={`/category/${item.name}`}>{item.name}</Link>
                            ))}
                        </div>
                    </Link>

                    {/* <Link to={"/shop"}>shop</Link> */}
                    <Link to={"/blog"}>blogs</Link>
                </div>
                <div className="header-icon">
                    <div>
                        <button onClick={toggleSearchView}><i className="bi bi-search"></i></button>
                    </div>
                    <div>
                        <button><NavLink to={'/cart'}><i className="bi bi-cart3"></i></NavLink></button>
                        <div className="qty">{cart?.length ? cart?.length : '0'}</div>
                    </div>
                </div>

            </div>
            {searchView && <Modal_Search onClose={toggleSearchView} />}
        </header >
    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        state: state.cart_reducer
    }
}
export default connect(mapStateToProps, null)(Header); 