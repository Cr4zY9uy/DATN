import { Flex } from 'antd'
import React from 'react'
import './Message.css'
import Typography from 'antd/es/typography/Typography'
export const Message = (props) => {

    const message = props?.message
    const uni = props?.append


    return (
        <Flex vertical className='message' gap={'30px'}>
            {message?.concat(uni)?.map((item) => {
                if (item?.role === 0) return <Flex justify='flex-end' key={item?.key}>
                    <Flex className='message_user' style={{ maxWidth: "85%" }} >
                        <Typography.Text>{item?.content}</Typography.Text>
                    </Flex>
                </Flex>
                else
                    return <Flex justify='flex-start' key={item?.key}>
                        <Flex className='message_admin' style={{ width: "85%" }}  >
                            <Typography.Text>{item?.content}</Typography.Text>
                        </Flex>
                    </Flex>
            })}
        </Flex>
    )
}
