import { Layout } from 'antd'
import Navbar from '../views/admin/layout/navbar';
import HeaderClient from '../views/admin/layout/header';
import { Outlet } from 'react-router';
import Copyright from '../views/client/layout/copyright';
export const LayoutAdmin = () => {
    const { Header, Content, Sider, Footer } = Layout;

    return (
        <Layout hasSider style={{
            minHeight: '100vh',
        }}>
            <Navbar />
            <Layout style={{
                minWidth: "calc(100%-200px)  !important",
                maxWidth: "calc(100%-200px) !important",
                width: "calc(100%-200px) !important"

            }}>
                <HeaderClient />
                <Content style={{ backgroundColor: "#fff", padding: "20px", marginLeft: "200px" }}>
                    <Outlet />
                </Content>
                <Copyright />
            </Layout>
        </Layout >
    )
}
