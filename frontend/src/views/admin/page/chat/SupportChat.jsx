import { Button, Card, Flex, Form, Input, Layout, Typography } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { MessageRender } from './MessageRender'
import { SendOutlined } from '@ant-design/icons'
import './SupportChat.css'
import { useParams } from 'react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { detail_room, send_message } from '../../../../services/chat_service'
import Notification from '../../../../utils/configToastify'
import { io } from 'socket.io-client'
import { UserContext } from '../../../../store/user'
const END_POINT = "http://localhost:8081";
export const SupportChat = () => {
    const { Footer, Content } = Layout
    const { chat_id } = useParams()
    const [message, setMessage] = useState([])
    const [info, setInfo] = useState({})
    const [typing, setTyping] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const [dataReceive, setDataReceive] = useState({})
    const [receiveMessage, setReceiveMessage] = useState({})
    const { state } = useContext(UserContext)
    const [form] = Form.useForm()
    const contentRef = useRef(null);

    const { data, refetch, isSuccess } = useQuery({
        queryKey: ['chat_support_admin_detail', chat_id],
        queryFn: () => detail_room(chat_id),
    })
    const socket = io(END_POINT);

    useEffect(() => {
        if (!isSuccess) {
            setLoading(true)
            return
        }
        setMessage(data?.data?.message.map(item => ({
            content: item?.content,
            role: item?.userId?.role,
            id: item?._id
        })))

        setInfo({ name: data?.data?.roomId?.firstName + " " + data?.data?.roomId?.lastName })
        setLoading(false)
        socket.emit("join chat", chat_id);

        return () => {
            setMessage([])
            setInfo({})
        }
    }, [data, isSuccess])

    const { mutate } = useMutation({
        mutationFn: (data) => send_message(data),
        onSuccess: (data) => {
            socket.emit("new message", { ...data.data, sender: state?.currentUser?.user_id })
            setDataReceive(data?.data)
        },
        onError: () => Notification({ message: "Send message fail", type: "error" })
    })


    const onFinish = (e) => {
        mutate({ ...e, roomId: chat_id })
        form.setFieldValue('content', '')

    }


    useEffect(() => {
        socket.emit("setup", state?.currentUser?.user_id);
        socket.on("connected", () => setSocketConnected(true));
        return () => socket.off('connected');

    }, [state, socket]);
    const [uni, setUni] = useState([])

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight + (68 * uni.length);
        }
    }, [message, uni]);

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (newMessageRecieved) {
                const rawData = newMessageRecieved?.message.map(item => ({ content: item?.content, id: item?._id, role: item?.userId?.role }))
                const filteredArr1 = rawData.filter(item => !message.includes(item));
                setUni(filteredArr1)
            }
        });
    }, [socket, message]);
    useEffect(() => {
        document.title = "Supports"

    }, [])
    return (
        <Flex className='admin_chat_box'>
            <Card title={info?.name} style={{ width: "100%" }}>
                <Layout>

                    <Content className='chatbox_body' ref={contentRef}>
                        <MessageRender message={message} append={uni} />
                    </Content>
                    <Footer className='_footer'>
                        <Form onFinish={onFinish} form={form}>
                            <Flex gap={10} style={{ padding: "10px" }} justify='space-between'>
                                <Form.Item style={{ width: "90%" }} name='content'>
                                    <Input className='chatbox_footer--input' placeholder='Type here' />
                                </Form.Item>
                                <Form.Item>
                                    <Button htmlType='submit' type='primary' icon={<SendOutlined />}>Send</Button>
                                </Form.Item>
                            </Flex>
                        </Form>
                    </Footer>
                </Layout>
            </Card>
        </Flex>
    )
}
