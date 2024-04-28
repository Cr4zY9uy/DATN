import {
    AccountBookOutlined,
    FileZipOutlined,
    FolderOpenOutlined,
    FolderOutlined,
    HomeOutlined,
    MessageOutlined,
    PictureOutlined,
    PieChartOutlined,
    ProjectOutlined,
    UserOutlined,
    UsergroupDeleteOutlined
} from '@ant-design/icons';
import { Flex, Layout, Menu } from 'antd';
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./../style/navbar.css";

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
            getItem(<NavLink to={"category"}>Category</NavLink>, '3', <FolderOutlined />),
            getItem(<NavLink to={"product"}>Product</NavLink>, '4', <FileZipOutlined />)
        ]),
        getItem('Order & Customer', '5', <UsergroupDeleteOutlined />, [
            getItem(<NavLink to={"order"}>Order</NavLink>, '6', < AccountBookOutlined />),
            getItem(<NavLink to={"customer"}>Customer</NavLink>, '7', <UserOutlined />),
        ]),
        getItem(<NavLink to={"banner"}>Banner</NavLink>, '9', <PictureOutlined />),
        getItem(<NavLink to={"blog"}>Blog</NavLink>, '10', <ProjectOutlined />),
        getItem(<NavLink to={"customer-support"}>Customer support</NavLink>, '11', <MessageOutlined />),
        getItem(<NavLink to={"consignment"}>Consignment</NavLink>, '12', <HomeOutlined />),

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