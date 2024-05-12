import { Breadcrumb, Flex, Pagination, Empty } from 'antd'
import { NavLink } from 'react-router-dom'
import ProductGrid from '../layout/product_grid'
import { useContext, useEffect, useState } from 'react';
import '../style/Wishlist.css'
import { FavouriteContext } from '../../../store/favourite';
import { useQuery } from '@tanstack/react-query';
import { getFavourite } from '../../../services/favourite_service';

export const Wishlist = () => {
    const [page, setPage] = useState(1);
    const { dispatch, state } = useContext(FavouriteContext)

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
            <Flex className="wishlist_item" wrap="wrap" gap="50px" style={{ marginBottom: "100px" }}>
                {state?.favourite && state?.favourite.length !== 0 ? (
                    state?.favourite.map((item, index) => (
                        <ProductGrid type={'wishlist'} products={{ ...item, id: item?._id, image: item.images ? item?.images[0] : item.image }} key={index} />
                    ))
                ) : (
                    <Flex justify='center' style={{ width: "100%" }}>
                        <Empty description={"No product in wishlist"} />
                    </Flex>

                )}
            </Flex>
        </Flex>
    )
}
