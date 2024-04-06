import { useState } from "react";
import "./../style/login.css";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { login } from "../../../services/user_service";
import USER_ACTION from "../../../redux/user/user_action";
import { connect } from "react-redux";
import { Store } from "react-notifications-component";
function Login(props) {
    const [info, setInfo] = useState({});
    const navigate = useNavigate();
    if (typeof JSON.parse(sessionStorage.getItem("isLog")) !== 'boolean') {
        sessionStorage.setItem("isLog", false)
    } else {
        if (JSON.parse(sessionStorage.getItem("isLog")) === true) {
            sessionStorage.setItem("isLog", true)

        }
    }

    const hanldeInput = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    }

    const hanldeLogin = async (e) => {
        e.preventDefault();
        try {
            const rs = await login(info);
            if (rs.status !== 200) {
                Store.addNotification({
                    title: "Failure!!",
                    message: "You login unsuccessfully!",
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
                props.login(rs.data);
                sessionStorage.setItem("isLog", true)
                Store.addNotification({
                    title: "Sucess!!",
                    message: "You login successfully!",
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
                
                navigate("/admin");

            }
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <div className="login_wrap d-flex justify-content-center align-items-center">
            <div className="login_panel">
                <div className="wrap_logo d-flex justify-content-center align-items-center"><img src="/images/icon/scart-mid.png" alt="logo" /></div>
                <h2>Login to the system</h2>
                <div className="wrap_input">
                    <form onSubmit={hanldeLogin}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Username"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Username" name="username" onChange={hanldeInput} required />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" name="password" onChange={hanldeInput} required />
                        </FloatingLabel>
                        <div className="d-flex justify-content-center">
                            <Button size="lg" variant="primary" type="submit">Login</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: rs => { dispatch({ type: USER_ACTION.LOGIN, payload: rs }) }
    }
}
export default connect(null, mapDispatchToProps)(Login);