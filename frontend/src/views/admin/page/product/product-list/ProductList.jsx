import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Flex, Form, Image, Input, Select, Switch, Table, Typography } from 'antd';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { queryClient } from '../../../../../main';
import { optionCategory } from '../../../../../services/category_service';
import { listProduct, updateProduct } from '../../../../../services/product_service';
import { ACTION_MODAL } from '../../../../../store/modal';
import { ModalContext } from '../../../../../store/modal/provider';
import Notification from '../../../../../utils/configToastify';
import useDebounce from '../../../../../utils/useDebounce';
import DeleteModal from '../../../layout/modal_del';
import './ProductList.css';

export const ProductList = () => {
  const { dispatch } = useContext(ModalContext)

  const [form] = Form.useForm()
  const [delID, setDelID] = useState("");
  const [page, setPage] = useState(1);
  const [typeDelete, setTypeDelete] = useState('')
  const [options, setOptions] = useState([])

  const [categories, setCategories] = useState([])
  const [sortTitle, setSortTitle] = useState('')
  const [origin, setOrigin] = useState("");
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')



  const searchOrigin = useDebounce(origin, 500)
  const searchTitle = useDebounce(title, 500)
  const searchCategory = useDebounce(category, 500)
  const searchSortTitle = useDebounce(sortTitle, 500)

  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([])


  const { mutate } = useMutation({
    mutationFn: (data) => updateProduct(data),
    onSuccess: () => {
      Notification({ message: "Update status of product sucessfully", type: 'success' });
      queryClient.invalidateQueries({ queryKey: ['product_admin'] })
    },
    onError: (error) => {
      Notification({ message: `${error.response.data.message}`, type: "error" })
    }
  })

  const optionsCategories = useQuery({
    queryKey: ["categories_option"],
    queryFn: () => optionCategory()
  })

  const queryCountry = useQuery({
    queryKey: ['countries'],
    queryFn: () => axios.get('https://countriesnow.space/api/v0.1/countries/iso')
  })

  useEffect(() => {
    if (!queryCountry?.isSuccess) return
    const rawData = queryCountry?.data?.data?.data
    setOptions(rawData?.map(item => ({ value: item?.name, text: item?.name })))

  }, [queryCountry?.isSuccess, queryCountry?.data])

  const { data, isSuccess } = useQuery({
    queryKey: ['product_admin', page, searchCategory, searchTitle, searchSortTitle, searchOrigin],
    queryFn: () => listProduct(page,
      searchTitle !== undefined ? searchTitle : '',
      searchOrigin !== undefined ? searchOrigin : '',
      searchCategory !== undefined ? searchCategory : '',
      searchSortTitle),
    enabled: !!searchOrigin || !!searchTitle || !!page || !!searchSortTitle || !!searchCategory
  })

  useEffect(() => {
    setPage(1)

    return () => {
      setPage(1)
    }
  }, [])

  useEffect(() => {
    setPage(1)

    return () => {
      setPage(1)
    }
  }, [searchOrigin, searchTitle, searchSortTitle, searchCategory])


  useEffect(() => {

    if (!isSuccess) return
    const rawData = data?.data?.products;
    setItems(
      rawData?.docs?.map((item) => ({
        key: item?._id,
        name: item?.name,
        image: item?.images,
        category: item?.categoryId?.name,
        price: item?.price,
        origin: item?.origin,
        isActive: item?.isActive,
        unit: item?.unit
      }))
    );

    setTotal(rawData?.totalDocs)

    return () => {
      setItems([])
    }

  }, [data, isSuccess]);



  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 200,
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      width: 100,
      render: (text) => <Image src={text[0]} width={70} height={70} />

    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: 100,
      align: 'center',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      width: 100,
      align: 'center',
    },
    {
      title: 'Origin',
      dataIndex: 'origin',
      width: 100,
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: 100,
      sorter: (a, b) => a.price - b.price,
      align: 'center',
      render: (text) => <Typography.Text>{text}$</Typography.Text>
    },

    {
      title: 'Active',
      dataIndex: 'isActive',
      width: 90,
      render: (value, row) => <Switch value={value} onChange={(e) => mutate({ id: row.key, isActive: e })} />
    },
    {
      title: 'Action',
      width: 100,
      key: 'x',
      render: (text, row) => <Flex justify='center' className='delete' gap={5}>
        <Button danger type='primary' icon={<DeleteOutlined />} onClick={() => { dispatch({ type: ACTION_MODAL.OPEN_MODAL }); setDelID(row.key), setTypeDelete('productOne') }} />
        <Button icon={<EyeOutlined />} onClick={() => onEdit(row.key)} />
      </Flex>,
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate()

  const onAdd = () => {
    navigate('/admin/product/create')
  }
  const onEdit = (id) => {
    navigate(`/admin/product/${id}`)
  }

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)
    setDelID(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFieldsChange = (_, fields) => {
    const mappedFields = fields.reduce((acc, item) => {
      acc[item.name[0]] = item.value;
      return acc;
    }, {});
    setCategory(mappedFields['category'])
    setTitle(mappedFields['title'])
    setOrigin(mappedFields['origin'])
  };

  const onChange = (_pagination, _filters, sorter, _extra) => {
    const { _field, order } = sorter;
    setSortTitle(order);
  };

  useEffect(() => {
    if (!optionsCategories?.isSuccess) return
    const rawData = optionsCategories?.data?.data?.data
    setCategories(rawData?.map(item => ({ value: item?._id, label: item?.name })))

  }, [optionsCategories?.isSuccess, optionsCategories?.data])

  return (
    <Flex vertical gap={"middle"} className='banner_list'>
      <Flex>
        <Form form={form} onFieldsChange={onFieldsChange} style={{ width: "100%" }}>
          <Flex gap={'middle'} width="100%">
            <Form.Item
              name="title"
              style={{ width: "33%" }}
            >
              <Input type="text" placeholder="Title" size="large" />
            </Form.Item>
            <Form.Item
              style={{ width: "51%" }}
              name="origin"
            >
              <Select placeholder="Country" size="large" options={options} allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => (option?.text ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.text ?? '').toLowerCase().localeCompare((optionB?.text ?? '').toLowerCase())
                } />
            </Form.Item>
            <Form.Item
              style={{ width: "51%" }}
              name="category"
            >
              <Select placeholder="Category" size="large" options={categories} allowClear />
            </Form.Item>
          </Flex>

        </Form>
      </Flex>
      <Flex justify='space-between'>
        <Button danger type='primary' disabled={selectedRowKeys.length === 0} icon={<DeleteOutlined />} onClick={() => { dispatch({ type: ACTION_MODAL.OPEN_MODAL }), setTypeDelete("productList") }} />
        <Button type='primary' icon={<PlusOutlined />} onClick={onAdd}> Add new product</Button>
      </Flex>
      <Table
        bordered
        columns={columns}
        dataSource={items}
        rowHoverable
        rowSelection={rowSelection}
        pagination={{ hideOnSinglePage: true, pageSize: 6, total: total, defaultCurrent: 1, showSizeChanger: false, onChange: setPage }}
        onChange={onChange}
      />
      <DeleteModal type_del={typeDelete} id_del={delID} />

    </Flex>
  )
}
