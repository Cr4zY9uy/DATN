import "./../style/navbar.css"
import { NavLink } from "react-router-dom";
import {
    FolderOutlined,
    FolderOpenOutlined,
    FileZipOutlined,
    UserOutlined,
    UsergroupDeleteOutlined,
} from '@ant-design/icons';
import { Menu, ConfigProvider, Layout } from 'antd';
import { useContext } from "react";
import { AppContext } from "../../../context/app_context";
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
function Navbar() {
    const { isOpen } = useContext(AppContext);
    const { Sider } = Layout;
    const items = [
        getItem('Product & Category', '1', <FolderOpenOutlined />, [
            getItem(<NavLink to={"/category"}>Category</NavLink>, '2', <FolderOutlined />),
            getItem(<NavLink to={"/product"}>Product</NavLink>, '3', <FileZipOutlined />)
        ]),
        getItem('Order manager', 'sub1', <UsergroupDeleteOutlined />, [
            getItem(<NavLink to={"/order"}>Order</NavLink>, '4', <UserOutlined />),
        ]),
    ];

    return (

        <ConfigProvider
            theme={{
                token: {
                    fontSize: 16
                }
            }}
        >
            <Sider trigger={null} collapsible collapsed={isOpen} className="side_bar">
                <div className="logo"><NavLink to={"/"}>S-cart <span>admin</span></NavLink></div>
                <Menu
                    mode="inline"
                    theme="light"
                    items={items}
                />
            </Sider>

        </ConfigProvider>
    );

}
export default Navbar;