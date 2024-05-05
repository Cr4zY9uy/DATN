import { Layout } from 'antd';
import { Outlet } from 'react-router';
import Copyright from '../views/client/layout/copyright';
import Footers from '../views/client/layout/footer';
import Headers from '../views/client/layout/header';
import { avoidDoubleClick } from '../utils/avoidDoubleClick';
import { useEffect } from 'react';

export const LayoutClient = () => {
    const { Header, Content, Footer } = Layout;

    useEffect(() => {
        avoidDoubleClick();
    }, []);

    return (
        <Layout>
            <Header style={{ backgroundColor: 'rgb(255, 255, 255)', zIndex: 30, padding: 0 }}>
                <Headers />
            </Header>
            <Content>
                <Outlet />
            </Content>

            <Footer>
                <Footers />
                <Copyright />

            </Footer>
        </Layout>

    );
}