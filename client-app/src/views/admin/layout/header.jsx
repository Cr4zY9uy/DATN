import "./../style/header.css";
import { useContext } from "react";
import { Avatar, Button, Flex, Layout } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { connect } from "react-redux";
import USER_ACTION from "../../../redux/user/user_action";
import { useNavigate } from "react-router";
import { logout } from "../../../services/user_service";
function HeaderClient(props) {
    // const user = props.state.currentUser.name;
    const navigate = useNavigate();
    // const { isOpen, setIsOpen } = useContext(AppContext);
    const { Header } = Layout
    const LogOut = async () => {
        // try {
        //     const rs = await logout();
        //     if (rs.status !== 200) {
        //         Store.addNotification({
        //             title: "Failure!!",
        //             message: "You logout unsuccessfully!",
        //             type: "danger",
        //             insert: "top",
        //             container: "top-right",
        //             animationIn: ["animate__animated", "animate__fadeIn"],
        //             animationOut: ["animate__animated", "animate__fadeOut"],
        //             dismiss: {
        //                 duration: 2000,
        //                 onScreen: true
        //             }
        //         });

        //     }
        //     else {
        //         props.logOut();
        //         sessionStorage.setItem("isLog", false)
        //         Store.addNotification({
        //             title: "Sucess!!",
        //             message: "You logout successfully!",
        //             type: "success",
        //             insert: "top",
        //             container: "top-right",
        //             animationIn: ["animate__animated", "animate__fadeIn"],
        //             animationOut: ["animate__animated", "animate__fadeOut"],
        //             dismiss: {
        //                 duration: 2000,
        //                 onScreen: true
        //             }
        //         });
        //         navigate("/");
        //     }
        // } catch (error) {
        //     alert(error.message);
        // }
    }

    return (
        <Header className="header">
            <Flex justify="flex-end" align="center" style={{height:"100%"}}>
                <Avatar size='large' icon={<UserOutlined />} />
            </Flex>
        </Header>
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
export default HeaderClient;