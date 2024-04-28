import React from 'react'
import { Flex, Table } from 'antd'
export const CategoryList = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (text) => <img />
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
    },
    {
      title: 'Order',
      dataIndex: 'order',
    },
  ];
  const data = [
    {
      key: '1129josdn-oioasndi98',
      name: 'Berry',
      image: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1129josdn-oioasndi98',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '1129josdn-oioasndi98',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
    {
      key: '1129josdn-oioasndi98',
      name: 'Disabled User',
      age: 99,
      address: 'Sydney No. 1 Lake Park',
    },
  ];
 
  return (
    <Flex> 
      <Table>
        
      </Table>
    </Flex>
  )
}
