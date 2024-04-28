import {
    UserOutlined
} from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Avatar, Flex, Layout, Popover } from "antd";
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../../services/user_service';
import { ACTION, UserContext } from '../../../store/user';
import Notification from '../../../utils/configToastify';
import "./../style/header.css";
function HeaderClient() {

    const { Header } = Layout
    const { dispatch } = useContext(UserContext)

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

    const content = (
        <Flex vertical gap={5} style={{ textDecoration: 'none' }}>
            <NavLink style={{ color: "#000" }}>Infomation</NavLink>
            <NavLink style={{ color: "#000" }}>Change password</NavLink>
            <NavLink style={{ color: "#000" }} onClick={mutate}>Logout</NavLink>
        </Flex>
    );
    return (
        <Header className="header">
            <Flex justify="flex-end" align="center" style={{ height: "100%" }}>
                <Popover content={content} arrow={false}>
                    <Avatar size='large' icon={<UserOutlined />} />
                </Popover>
            </Flex>
        </Header>
    );
}


export default HeaderClient;