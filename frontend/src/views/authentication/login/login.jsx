import { GoogleOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input, Typography } from "antd";
import { login } from "../../../services/user_service";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../../../utils/configToastify";
import { useContext, useEffect } from "react";
import { ACTION_USER, UserContext } from "../../../store/user";
import { useMutation } from "@tanstack/react-query";
import { LogContext } from "../../../store/typeLog/provider";
import { ACTION_LOG } from "../../../store/typeLog";
function Login() {
    const { dispatch } = useContext(UserContext)
    const logGoogle = useContext(LogContext)
    const navigate = useNavigate()
    const { mutate } = useMutation({
        mutationKey: ['login'],
        mutationFn: (data) => login(data),
        onSuccess: (response) => {
            console.log(response);
            Notification({ message: "Login successfully!", type: "success" })
            dispatch({ type: ACTION_USER.LOGIN, payload: response.data })
            if (response.data.role === 0)
                navigate('/client')
            navigate('/admin')
        },
        onError: (error) => {
            Notification({ message: `${error.response.data.message}`, type: "error" })
        }
    })

    const loginByGoogle = () => {
        logGoogle.dispatch({ type: ACTION_LOG.IN })
        window.open('http://localhost:8081/api/auth/google', '_self')
    }


    const hanldeLogin = (e) => {
        mutate(e)
    }

    useEffect(() => { document.title = "Login" }, [])



    return (

        <Flex className="login_wrap" justify="center" align="center">
            <Flex className="login_panel" vertical align="center">
                <Flex className="wrap_logo d-flex justify-content-center align-items-center" align="center" justify="center"><img src="/images/icon/scart-mid.png" alt="logo" /></Flex>
                <Typography.Title level={2}>Login</Typography.Title>
                <Form
                    style={{ width: "100%", padding: "0 20px" }}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 100 }}
                    layout="horizontal"
                    onFinish={hanldeLogin}>
                    <Form.Item
                        name="email"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please input!',
                            }, {
                                min: 6,
                                message: "At least 6 characters"
                            },
                            {
                                type: 'email',
                                message: 'Please input an email address'
                            }
                        ]}
                    >
                        <Input type="email" placeholder="Email" size="large" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please input!',
                            }, {
                                min: 6,
                                message: "At least 6 characters"
                            }
                        ]}
                    >
                        <Input.Password visibilityToggle placeholder="Password" size="large" />
                    </Form.Item>
                    <Flex vertical align="center" justify="center" className="button_group">
                        <Link to={'/forget-password'}>Forget password?</Link>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login">Login</Button>
                        </Form.Item>
                        <Typography.Text>Don&apos;t have an account? <Link to={'/register'}>Sign up</Link></Typography.Text>
                    </Flex>
                </Form>
                <Divider>Or</Divider>
                <Flex vertical align="center" className="button_group">
                    <Button icon={<GoogleOutlined />} className="google" style={{ backgroundColor: "#18228f", lineHeight: "30px", color: "white", marginBottom: "30px" }}
                        onClick={loginByGoogle}
                    >Login by google</Button>
                </Flex>

            </Flex>
        </Flex >
    );
}

export default Login;