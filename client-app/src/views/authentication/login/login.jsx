import { GoogleOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input, Typography } from "antd";
import { login, loginByGoogle } from "../../../services/user_service";
import "./login.css";
import { Link, NavLink } from "react-router-dom";
import Notification from "../../../utils/configToastify";
function Login(props) {
    const hanldeLogin = async (e) => {
        try {
            const rs = await login(e);
            if (rs.status !== 200) {
                console.log('!ok');
            }
            else {
                sessionStorage.setItem("isLog", true)
                console.log(rs.data.user_id);
                // eslint-disable-next-line
                props.setUserId(rs.data.user_id)


            }
        } catch (error) {
            alert(error.message);
        }
    }

    const loginGoogle = async () => {
        try {
            console.log("Attempting Google login...");
            const rs = await loginByGoogle()
            console.log(rs);
            if (rs)
                Notification({ message: "Login fail", type: "error" })
        } catch (error) {
            Notification({ message: "Login fail", type: "error" })
        }
    }

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
                        <Link>Forget password?</Link>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login">Login</Button>
                        </Form.Item>
                        <Typography.Text>Don&apos;t have an account? <Link>Sign up</Link></Typography.Text>
                    </Flex>
                </Form>
                <Divider>Or</Divider>
                <Flex vertical align="center" className="button_group">
                    {/* <Button htmlType="button" className="google" style={{ backgroundColor: "#18228f" }} icon={<GoogleOutlined style={{ color: "#fff" }} />} type="primary"onClick={loginGoogle}  >Login by Google</Button> */}
                    <NavLink to={'http://localhost:8080/api/auth/google'}>Login google</NavLink>
                </Flex>

            </Flex>
        </Flex >
    );
}

export default Login;