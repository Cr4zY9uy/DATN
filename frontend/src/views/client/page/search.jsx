import { Empty, Flex, Pagination } from "antd";
import { Breadcrumb } from "antd";
import { NavLink, useSearchParams } from "react-router-dom";
import Product_Grid from "../layout/product_grid";
import "./../style/search.css";
import Banner_Big from "../layout/banner_big";
import { useEffect, useState } from "react";
import { product_by_code, product_by_name, searchProduct } from "../../../services/product_service";
import ProductGrid from "../layout/product_grid";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
function Search() {
    const [searchInput] = useSearchParams();
    const keyword = searchInput.get('keyword')
    const [totalProducts, setTotalProducts] = useState(0);
    const [page, setPage] = useState(1);
    const [product, setProduct] = useState([]);

    const { data, isSuccess } = useQuery({
        queryKey: ['search_product', keyword, page],
        queryFn: () => searchProduct(searchInput, page)
    })


    useEffect(() => {
        if (!isSuccess) return
        setProduct(data?.data?.item?.map(is => ({
            id: is?._id,
            name: is?.name,
            origin: is?.origin,
            price: is?.price,
            image: is?.images[0],
            quantity: is?.quantity?.inTrade,
            pricePromotion: is?.sales?.length !== 0 ?
                new Date(dayjs(is?.sales[is?.sales.length - 1]?.dueDate)).getTime() < new Date().getTime() ?
                    0 :
                    is?.sales[is?.sales.length - 1]?.pricePromotion || 0
                : 0

        })))
        setTotalProducts(data?.data?.total)

    }, [isSuccess, data])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [searchInput]);

    useEffect(() => {
        document.title = "Search for " + keyword;
    }, [keyword])


    useEffect(() => {
        setPage(1)
    }, [keyword])
    console.log(data?.data);
    return (
        <Flex className="search" vertical align='center'>
            <Banner_Big info={keyword} />
            <div className="container search_page">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <NavLink to={'/'}>HOME</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <NavLink to={'/search'}>SEARCH</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {product.length === 0 ? <Empty description={"No product found"} /> :
                    <Flex vertical gap={"20px"}>
                        <Flex className="results_pagination" style={{ width: "100%" }} justify="center">
                            <p className=" text-left">Showing <b>1</b> - <b>{product.length}</b> results of <b>{totalProducts}</b> results</p>
                        </Flex>
                        <Flex className="category_items" wrap="wrap" gap="50px">
                            {product.map((item, index) => {
                                return <ProductGrid products={item} key={index} />
                            })}
                        </Flex>
                        <Flex justify="center">
                            <Pagination
                                showSizeChanger={false}
                                total={totalProducts}
                                pageSize={6}
                                current={page}
                                hideOnSinglePage
                                onChange={setPage} />
                        </Flex>
                    </Flex>}
            </div>
        </Flex>
    );
}
export default Search;