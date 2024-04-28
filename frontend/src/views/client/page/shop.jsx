import { CloseOutlined, ShoppingOutlined, SortAscendingOutlined } from "@ant-design/icons";
import "../style/shop.css"
import { Flex, Pagination, Typography, Checkbox, Radio, Space, Tag, Select, Empty, Rate } from "antd";
import { Breadcrumb, Button } from "antd";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
function Shop() {
    const [categoryFilter, setCategoryFilter] = useState([])
    const [priceFilter, setPriceFilter] = useState('')
    const [isEmpty, setIsEmpty] = useState(false)
    const onChangeCategory = (checkedValues) => {
        setCategoryFilter(checkedValues)
    };
    const onChangePrice = (e) => {
        setPriceFilter(e.target.value);
        setIsEmpty(true)
    };

    useEffect(() => {
        document.title = "Shop";

        return () => {
            document.title = "";
        }
    }, [])

    const optionsCategory = [
        {
            label: 'Apple',
            value: 'Apple',
        },
        {
            label: 'Pear',
            value: 'Pear',
        },
        {
            label: 'Orange',
            value: 'Orange',
        },
    ];
    const handleChange = (value) => {
        console.log(value);
    };
    return (
        <Flex className="shop" vertical>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={'/client'}>HOME</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <NavLink to={'/client/shop'}>SHOP</NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Flex className='products_filter' justify="space-evenly">
                <Flex className="filterCAP">
                    <Flex className='filterCate'>
                        <Typography.Title level={5}>Categories</Typography.Title>
                        <Checkbox.Group options={optionsCategory} value={categoryFilter} onChange={onChangeCategory} />

                    </Flex>
                    <Flex className='filterPrice'>
                        <Typography.Title level={5}>Prices</Typography.Title>
                        <Radio.Group onChange={onChangePrice} value={priceFilter}>
                            <Space direction="vertical">
                                <Radio value={'0 - 100'}>0 - 100$</Radio>
                                <Radio value={'100 - 300'}>100 - 300$</Radio>
                                <Radio value={'300 - 500'}>300 - 500$</Radio>
                                <Radio value={'500 - '}>Over 500$</Radio>
                            </Space>
                        </Radio.Group>
                    </Flex>
                </Flex>
                <Flex className="products_cate d-flex flex-column" vertical>
                    <Flex justify='space-between' align="center" style={{ marginBottom: "10px" }}>
                        <Space className="filter_tag" >
                            {categoryFilter.length !== 0 && (
                                <Tag
                                    closable
                                    onClose={() => setCategoryFilter([])}
                                >
                                    {categoryFilter.join(', ')}
                                </Tag>
                            )}
                            {priceFilter && (
                                <Tag closable onClose={() => setPriceFilter('')}>
                                    {priceFilter !== '500 - ' ? priceFilter : 'Over 500'}$
                                </Tag>
                            )}
                            {(categoryFilter.length !== 0 && priceFilter != '') &&
                                (<Typography.Link onClick={() => {
                                    setCategoryFilter([]), setPriceFilter(''), setIsEmpty(false)

                                }}>
                                    Clear all
                                </Typography.Link>
                                )}
                        </Space>
                        <Select
                            placeholder="Sort"
                            removeIcon={<CloseOutlined />}
                            suffixIcon={<SortAscendingOutlined />}
                            labelInValue
                            allowClear
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'price_asc',
                                    label: 'Price ascending',
                                },
                                {
                                    value: 'price_dec',
                                    label: 'Price descending',
                                },
                                {
                                    value: 'newer',
                                    label: 'Newer',
                                },
                                {
                                    value: 'older',
                                    label: 'Older',
                                },
                                {
                                    value: 'name_asc',
                                    label: 'Name: A-Z',
                                },
                                {
                                    value: 'name_dec',
                                    label: 'Name: Z-A',
                                },
                            ]}
                        />
                    </Flex>
                    <Flex className="products_result d-flex row text-center" gap="16px" vertical>
                        {isEmpty ? <Empty /> :
                            <>
                                <Flex className='result'><h3>Showing <span>1 - 10</span> of 100 results</h3></Flex>
                                <Flex gap={"16px"}>
                                    <Flex className="shop_item col-4" vertical align="center">
                                        <img src="/data/fruits/pineapple1.png" alt="pineapple" />
                                        <Typography.Title level={4}>Apple 1</Typography.Title>
                                        <Typography.Text className="discount">10$<span className="price">50$</span></Typography.Text>
                                        <Rate allowHalf disabled defaultValue={2} />
                                        <Button icon={<ShoppingOutlined />} >add to cart</Button>
                                    </Flex>

                                    <Flex className="shop_item col-4" vertical align="center">
                                        <img src="/data/fruits/pineapple1.png" alt="pineapple" />
                                        <Typography.Title level={4}>Apple 1</Typography.Title>
                                        <Typography.Text className="discount">10$<span className="price">50$</span></Typography.Text>
                                        <Rate allowHalf disabled defaultValue={2} />
                                        <Button icon={<ShoppingOutlined />} >add to cart</Button>
                                    </Flex>
                                    <Flex className="shop_item col-4" vertical align="center">
                                        <img src="/data/fruits/pineapple1.png" alt="pineapple" />
                                        <Typography.Title level={4}>Apple 1</Typography.Title>
                                        <Typography.Text className="discount">10$<span className="price">50$</span></Typography.Text>
                                        <Rate allowHalf disabled defaultValue={2} />
                                        <Button icon={<ShoppingOutlined />} >add to cart</Button>
                                    </Flex>
                                </Flex>
                            </>
                        }
                        <Pagination style={{ textAlign: "center", padding: "70px 0" }} defaultCurrent={1} total={50} pageSize={5} hideOnSinglePage showSizeChanger={false}
                        />

                    </Flex>
                </Flex>
            </Flex>
        </Flex>

    );
}
export default Shop;