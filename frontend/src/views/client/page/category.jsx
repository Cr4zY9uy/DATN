import { Breadcrumb, Flex, Pagination } from "antd";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Banner_Big from "../layout/banner_big";
import ProductGrid from "../layout/product_grid";
import "./../style/category.css";
import { useQuery } from "@tanstack/react-query";
import { productByCategory } from "../../../services/product_service";
function Category() {
    const { category_id } = useParams();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    console.log(page);
    const [categoryName, setCategoryName] = useState('')
    const [total, setTotal] = useState(0)

    const { isSuccess, data } = useQuery({
        queryKey: ['product_by_cate', category_id, page],
        queryFn: () => productByCategory(category_id, page),
        enabled: !!page || !!category_id
    })

    useEffect(() => {
        if (!isSuccess) return
        const rawData = data?.data?.products
        setProducts(rawData?.docs?.map(item => ({
            id: item?._id,
            name: item?.name,
            price: item?.price,
            origin: item?.origin,
            image: item?.images[0]
        })))
        setCategoryName(rawData?.docs[0]?.categoryId?.name)
        setTotal(rawData?.totalDocs)
    }, [isSuccess, data])

    useEffect(() => {
        document.title = categoryName.toUpperCase();
        return () => {
            document.title = ""
        }
    }, [categoryName])
    return (
        <>
            <Banner_Big info={categoryName.toUpperCase()} />
            <Flex className="category_page" vertical>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <NavLink to={'/client'}>HOME</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <NavLink to={`/client/category/${category_id}`}>{categoryName.toUpperCase()}</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Flex className="category_pagination" justify="center"><p className=" text-left">Showing <b>{total !== 0 ? 1 : 0}</b> - <b>{total < 6 ? total : 6}</b> results of <b>{total}</b> results</p></Flex>
                <Flex className="category_items" wrap="wrap" gap="50px">
                    {products.map((item) => {
                        return <ProductGrid products={item} key={item.id} />
                    })}
                </Flex>
                <Flex justify="center">
                    <Pagination
                        total={total}
                        pageSize={6}
                        current={page}
                        defaultCurrent={1}
                        hideOnSinglePage
                        showSizeChanger={false}
                        onChange={(page) => setPage(page)} />

                </Flex>
            </Flex>
        </>
    );
}
export default Category;