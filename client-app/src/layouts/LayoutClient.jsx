import { Layout } from 'antd'
import Headers from '../views/client/layout/header';
import Footers from '../views/client/layout/footer';
import Copyright from '../views/client/layout/copyright';
import { Outlet } from 'react-router';

export const LayoutClient = () => {
    const { Header, Content, Footer } = Layout;

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