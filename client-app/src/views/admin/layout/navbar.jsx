import "./../style/navbar.css"
import { NavLink } from "react-router-dom";
import {
    FolderOutlined,
    FolderOpenOutlined,
    FileZipOutlined,
    UserOutlined,
    UsergroupDeleteOutlined,
    AccountBookOutlined,
    PieChartOutlined,
    WechatOutlined,
    AppstoreOutlined,
    HomeOutlined,
    MessageOutlined,
    PictureOutlined,
    ProjectOutlined,
    DollarOutlined,
} from '@ant-design/icons';
import { Menu, ConfigProvider, Layout, Flex } from 'antd';
import { useState } from "react";
// import { useContext } from "react";
// import { AppContext } from "../../../context/app_context";
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
    // const { isOpen } = useContext(AppContext);
    const { Sider } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    const items = [
        getItem('Overview', '1', <PieChartOutlined />),
        getItem('Product & Category', '2', <FolderOpenOutlined />, [
            getItem(<NavLink to={"/category"}>Category</NavLink>, '3', <FolderOutlined />),
            getItem(<NavLink to={"/product"}>Product</NavLink>, '4', <FileZipOutlined />)
        ]),
        getItem('Order & Customer', '5', <UsergroupDeleteOutlined />, [
            getItem(<NavLink to={"/order"}>Order</NavLink>, '6', < AccountBookOutlined />),
            getItem(<NavLink to={"/customer"}>Customer</NavLink>, '7', <UserOutlined />),
        ]),
        getItem('Banner', '9', <PictureOutlined />),
        getItem('Blog', '10', <ProjectOutlined />),
        getItem('Customer support', '11', <MessageOutlined />),
        getItem('Consignment', '12', <HomeOutlined />),

    ];

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className="side_bar" style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 100,
        }}>
            <Flex className="logo" justify="center"><NavLink to={"/admin"}>S-cart <span>admin</span></NavLink></Flex>
            <Menu
                mode="inline"
                theme="light"
                items={items}
            />
        </Sider>

    );

}
export default Navbar;