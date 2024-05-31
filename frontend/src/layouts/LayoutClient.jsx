import { Layout } from 'antd';
import { Outlet } from 'react-router';
import Copyright from '../views/client/layout/copyright';
import Footers from '../views/client/layout/footer';
import Headers from '../views/client/layout/header';
import { avoidDoubleClick } from '../utils/avoidDoubleClick';
import { useContext, useEffect } from 'react';
import { ChatWidget } from '../views/client/page/ChatWidget/ChatWidget';
import { UserContext } from '../store/user';

export const LayoutClient = () => {
    const { Header, Content, Footer } = Layout;

    const { state } = useContext(UserContext)

    useEffect(() => {
        avoidDoubleClick()
    }, [])

    return (
        <Layout>
            <Header style={{ backgroundColor: 'rgb(255, 255, 255)', zIndex: 30, padding: 0 }}>
                <Headers />
            </Header>
            <Content>
                <Outlet />
            </Content>

            {state?.currentUser && <ChatWidget />}
            <Footer>

                <Footers />
                <Copyright />

            </Footer>
        </Layout>

    );
}