import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Select, Switch, Table } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { listCategory, updateCategory } from '../../../../../services/category_service';
import Notification from '../../../../../utils/configToastify';
import useDebounce from '../../../../../utils/useDebounce';
import DeleteModal from '../../../layout/modal_del';
import './CategoryList.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ModalContext } from '../../../../../store/modal/provider';
import { ACTION } from '../../../../../store/modal';
import { queryClient } from '../../../../../main';

export const CategoryList = () => {
  const { dispatch } = useContext(ModalContext)

  const [form] = Form.useForm()
  const [delID, setDelID] = useState("");
  const [page, setPage] = useState(1);
  const [typeDelete, setTypeDelete] = useState('')

  const [sortName, setSortName] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [type, setType] = useState("");
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const searchType = useDebounce(type, 500)
  const searchName = useDebounce(name, 500)
  const searchDescription = useDebounce(description, 500)
  const searchSortName = useDebounce(sortName, 500)
  const searchSortOrder = useDebounce(sortOrder, 500)

  const [totalProducts, setTotalProducts] = useState(0);
  const [items, setItems] = useState([])


  const { mutate } = useMutation({
    mutationFn: (data) => updateCategory(data),
    onSuccess: () => {
      Notification({ message: "Update status of category sucessfully", type: 'success' });
      queryClient.invalidateQueries({ queryKey: ['category_admin'] })
    },
    onError: (error) => {
      Notification({ message: `${error.response.data.message}`, type: "error" })
    }
  })

  const { data, isSuccess } = useQuery({
    queryKey: ['category_admin', page, searchDescription, searchName, searchSortName, searchSortOrder, searchType],
    queryFn: () => listCategory(page,
      searchName !== undefined ? searchName : '',
      searchDescription !== undefined ? searchDescription : '',
      searchType !== undefined ? searchType : '',
      searchSortOrder, searchSortName),
    enabled: !!searchDescription || !!searchName || !!page || !!searchSortName || !!searchSortOrder || !!searchType
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
  }, [searchDescription, searchName, searchSortName, searchSortOrder, searchType])


  useEffect(() => {

    if (!isSuccess) return
    setItems(
      data?.data?.docs?.map((item) => ({
        key: item?._id,
        name: item?.name,
        image: item?.image,
        description: item?.description,
        isActive: item?.isActive,
        order: item?.order
      }))
    );

    setTotalProducts(data?.data?.totalDocs)

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
      render: (text) => <img src={text} width={70} height={70} />

    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      width: 90,
      render: (value, row) => <Switch value={value} onChange={(e) => mutate({ id: row.key, isActive: e })} />
    },
    {
      title: 'Order',
      dataIndex: 'order',
      width: 100,
      sorter: true,
      align: 'center',

    },
    {
      title: 'Action',
      width: 100,
      key: 'x',
      render: (text, row) => <Flex justify='center' className='delete' gap={5}>
        <Button danger type='primary' icon={<DeleteOutlined />} onClick={() => { dispatch({ type: ACTION.OPEN_MODAL }); setDelID(row.key), setTypeDelete('categoryOne') }} />
        <Button icon={<EyeOutlined />} onClick={() => onEdit(row.key)} />
      </Flex>,
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate()

  const onAdd = () => {
    navigate('/admin/category/create')
  }
  const onEdit = (id) => {
    navigate(`/admin/category/${id}`)
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
    setDescription(mappedFields['description'])
    setName(mappedFields['name'])
    setType(mappedFields['type'])
  };

  const onChange = (_pagination, _filters, sorter, _extra) => {
    const { field, order } = sorter;
    let newSortName = '';
    let newSortOrder = '';

    if (order !== undefined) {
      if (field === 'name') {
        newSortName = order;
      } else if (field === 'order') {
        newSortOrder = order;
      }
    }
    setSortName(newSortName);
    setSortOrder(newSortOrder);
  };
  return (
    <Flex vertical gap={"middle"} className='category_list'>
      <Flex>
        <Form form={form} onFieldsChange={onFieldsChange} style={{ width: "100%" }}>
          <Flex gap={'middle'} width="100%">
            <Form.Item
              name="name"
              style={{ width: "33%" }}
            >
              <Input type="text" placeholder="Name" size="large" />
            </Form.Item>
            <Form.Item
              style={{ width: "51%" }}
              name="description"
            >
              <Input type="text" placeholder="Description" size="large" />
            </Form.Item>
            <Form.Item
              name="type"
              style={{ width: "15%" }}
            >
              <Select placeholder="Type" size="large" allowClear>
                <Select.Option value={0} >Deactivate</Select.Option>
                <Select.Option value={1}>Activate</Select.Option>
              </Select>
            </Form.Item>
          </Flex>

        </Form>
      </Flex>
      <Flex justify='space-between'>
        <Button danger type='primary' disabled={selectedRowKeys.length === 0} icon={<DeleteOutlined />} onClick={() => { dispatch({ type: ACTION.OPEN_MODAL }), setTypeDelete("categoryList") }} />
        <Button type='primary' icon={<PlusOutlined />} onClick={onAdd}> Add new category</Button>
      </Flex>
      <Table
        bordered
        columns={columns}
        dataSource={items}
        rowHoverable
        rowSelection={rowSelection}
        pagination={{ hideOnSinglePage: true, pageSize: 6, total: totalProducts, defaultCurrent: 1, showSizeChanger: false, onChange: setPage }}
        onChange={onChange}
      />
      <DeleteModal type_del={typeDelete} id_del={delID} />

    </Flex>
  )
}
