import { Layout } from 'antd'
import Headers from '../views/client/layout/header';
import Footers from '../views/client/layout/footer';
import Copyright from '../views/client/layout/copyright';
import { Outlet } from 'react-router';
import { Widget, addResponseMessage } from 'react-chat-widget'
import 'react-chat-widget/lib/styles.css';
import { useEffect } from 'react';
import { useState } from 'react';

export const LayoutClient = () => {
    const { Header, Content, Footer } = Layout;
    useEffect(() => {
        addResponseMessage('Welcome to this awesome chat!');
    }, []);
    const [chatWindowOpen, setChatWindowOpen] = useState(true);

    const handleToggle = (chatWindowOpen) => {
        setChatWindowOpen(!chatWindowOpen);
    };

    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        addResponseMessage("asd");
    };
    return (
        <Layout>
            <Header style={{ backgroundColor: 'rgb(255, 255, 255)', zIndex: 30, padding: 0 }}>
                <Headers />
            </Header>
            <Content>
                <Outlet />
            </Content>
            <Widget
                handleNewUserMessage={handleNewUserMessage}
                title="Chat with Scart"
                subtitle=""
                handleToggle={handleToggle}

            />
            <Footer>
                <Footers />
                <Copyright />

            </Footer>
        </Layout>

    );
}