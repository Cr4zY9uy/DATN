import { Breadcrumb, Flex, Pagination } from 'antd'
import { NavLink } from 'react-router-dom'
import ProductGrid from '../layout/product_grid'
import { useState } from 'react';
import '../style/Wishlist.css'

export const Wishlist = () => {
    const [page, setPage] = useState(1);

    return (
        <Flex className='wishlist' vertical justify='center'>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={'/'}>HOME</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <NavLink to={`/user/wishlist`}>WISHLIST</NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Flex className="wishlist_item" wrap="wrap" gap="50px">
                {[...Array(10)].slice(1, 7).map((item, index) => {
                    return <ProductGrid type={'wishlist'} products={{ product_id: 1, title: "Keo bong gon cuc ngon", price: 1024133, price_promotion: 0.1, qty: 10 }} key={index} />
                })}
            </Flex>
            <Flex justify="center" style={{ margin: "30px 0 100px" }}>
                <Pagination
                    total={15}
                    pageSize={9}
                    current={page}
                    hideOnSinglePage
                    showSizeChanger={false}
                    onChange={(page) => setPage(page)} />
            </Flex>
        </Flex>
    )
}
