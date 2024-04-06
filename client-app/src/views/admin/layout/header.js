import "./../style/header.css";
import { useContext } from "react";
import { Button } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons'
import { connect } from "react-redux";
import USER_ACTION from "../../../redux/user/user_action";
import { useNavigate } from "react-router";
import { logout } from "../../../services/user_service";
import { AppContext } from "../../../context/app_context";
import { Store } from "react-notifications-component";
function Header(props) {
    const user = props.state.currentUser.name;
    const navigate = useNavigate();
    const { isOpen, setIsOpen } = useContext(AppContext);

    const LogOut = async () => {
        try {
            const rs = await logout();
            if (rs.status !== 200) {
                Store.addNotification({
                    title: "Failure!!",
                    message: "You logout unsuccessfully!",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                });

            }
            else {
                props.logOut();
                sessionStorage.setItem("isLog", false)
                Store.addNotification({
                    title: "Sucess!!",
                    message: "You logout successfully!",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                });
                navigate("/");
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="header">
            <div className="d-flex justify-content-between align-items-center" style={{ height: "10vh" }}>
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        marginBottom: 16,
                    }}
                >   {isOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <div className="d-flex align-items-center icon_wrap ">
                    <div className="home" onClick={() => { navigate("/admin") }}><i className="bi bi-house-door-fill"></i></div>
                    <div className="wrap_admin  d-flex justity-content-center align-items-center"><img src="/images/icon/admin.png" alt="logo" />
                        <div className="sub_menu">
                            <div>{user}</div>
                            <div onClick={LogOut} style={{ borderTop: "0.01rem solid rgb(27, 149, 255)" }}>
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        state: state.user_reducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => {
            dispatch({ type: USER_ACTION.LOGOUT })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);