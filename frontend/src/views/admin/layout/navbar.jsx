import {
    AccountBookOutlined,
    FileZipOutlined,
    FolderOpenOutlined,
    FolderOutlined,
    HomeOutlined,
    MessageOutlined,
    PercentageOutlined,
    PictureOutlined,
    PieChartOutlined,
    ProjectOutlined,
    UserOutlined,
    UsergroupDeleteOutlined
} from '@ant-design/icons';
import { Flex, Layout, Menu } from 'antd';
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
    const location = useLocation()
    const [current, setCurrent] = useState('overview');
    useEffect(() => {
        if (location.pathname === '/admin') setCurrent('overview')
        else
            setCurrent(location.pathname.split('/')[2]);
        return () => {
            setCurrent('overview')
        }
    }, [location.pathname])
    console.log(location.pathname.startsWith('/admin/category'));

    const items = [
        getItem(<NavLink to={"overview"}>Overview</NavLink>, 'overview', <PieChartOutlined />),
        getItem('Product & Category', '2', <FolderOpenOutlined />, [
            getItem(<NavLink to={"category"}>Category</NavLink>, 'category', <FolderOutlined />),
            getItem(<NavLink to={"product"}>Product</NavLink>, 'product', <FileZipOutlined />)
        ]),
        getItem('Order & Customer', '5', <UsergroupDeleteOutlined />, [
            getItem(<NavLink to={"orders"}>Order</NavLink>, 'orders', < AccountBookOutlined />),
            getItem(<NavLink to={"customers"}>Customer</NavLink>, 'customers', <UserOutlined />),
        ]),
        getItem(<NavLink to={"banner"}>Banner</NavLink>, 'banner', <PictureOutlined />),
        getItem(<NavLink to={"users"}>User</NavLink>, 'users', <ProjectOutlined />),
        getItem(<NavLink to={"customer-support"}>Customer support</NavLink>, 'customer-support', <MessageOutlined />),
        getItem(<NavLink to={"consignment"}>Consignment</NavLink>, 'consignment', <HomeOutlined />),
        getItem(<NavLink to={"sales"}>Sales</NavLink>, 'sales', <PercentageOutlined />),

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
                selectedKeys={[current]}
            />
        </Sider>

    );

}
export default Navbar;