import { useQuery } from '@tanstack/react-query'
import { Button, Flex, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { list_room } from '../../../../services/chat_service'
import { EyeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'

export const ManageChat = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const { data, isSuccess } = useQuery({
        queryKey: ['list_chat_admin'],
        queryFn: () => list_room()
    })
    const onEdit = (id) => {
        navigate(`/admin/customer-support/${id}`)
    }


    const columns = [
        {
            title: 'Customer',
            dataIndex: 'customer',
            width: 400,
        },
        {
            title: 'Room Id',
            dataIndex: 'roomId',
            width: 400,
            hidden: true
        },
        {
            title: 'Action',
            width: 100,
            key: 'x',
            align: 'center',
            render: (text, row) => <Flex justify='center' className='delete' gap={5}>
                <Button icon={<EyeOutlined />} onClick={() => onEdit(row.roomId)} />
            </Flex>,
        },
    ];

    useEffect(() => {
        if (!isSuccess) return
        setItems(data?.data.map(item => ({
            key: item?._id,
            roomId: item?.roomId?._id,
            customer: item?.roomId?.firstName + " " + item?.roomId?.lastName
        })))
        return () => {
            setItems([])
        }
    }, [isSuccess, data])

    return (
        <Flex vertical gap={"middle"} className='banner_list' style={{ overflowY: "scroll" }}>
            <Table
                bordered
                columns={columns}
                dataSource={items}
                rowHoverable
                pagination={false}
            />
        </Flex>
    )
}
