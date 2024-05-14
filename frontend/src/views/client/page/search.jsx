import { Flex, Pagination } from "antd";
import { Breadcrumb } from "antd";
import { NavLink, useSearchParams } from "react-router-dom";
import Product_Grid from "../layout/product_grid";
import "./../style/search.css";
import Banner_Big from "../layout/banner_big";
import { useEffect, useState } from "react";
import { product_by_code, product_by_name, searchProduct } from "../../../services/product_service";
import ProductGrid from "../layout/product_grid";
import { useQuery } from "@tanstack/react-query";
function Search() {
    const [searchInput] = useSearchParams();
    const keyword = searchInput.get('keyword')
    const [totalProducts, setTotalProducts] = useState(0);
    const [page, setPage] = useState(1);
    const [product, setProduct] = useState([]);

    const { data, isSuccess } = useQuery({
        queryKey: ['search_product', keyword],
        queryFn: () => searchProduct(searchInput, page)
    })


    useEffect(() => {
        if (!isSuccess) return
        const rawData = data?.hits
        setProduct(rawData?.hits?.map(item => ({
            id: item?._id,
            name: item?._source?.name,
            price: item?._source?.price,
            quantity: item?._source?.quantity?.inTrade,

        })))
        setTotalProducts(rawData?.total?.value)

    }, [isSuccess, data])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [searchInput]);

    useEffect(() => {
        document.title = "Search for " + keyword;
    }, [keyword])


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
                <div className="results_pagination">
                    <p className=" text-left">Showing <b>1</b> - <b>{product.length}</b> results of <b>{totalProducts}</b> results</p>
                </div>
                <Flex className="category_items" wrap="wrap" gap="50px">
                    {[...Array(10)].slice(1, 7).map((item, index) => {
                        return <ProductGrid products={{ product_id: 1, title: "Keo bong gon cuc ngon", price: 1024133, price_promotion: 0.1, qty: 10 }} key={index} />
                    })}
                </Flex>
                <Flex justify="center">
                    <Pagination
                        showSizeChanger={false}
                        total={100}
                        pageSize={8}
                        current={page}
                        hideOnSinglePage
                        onChange={(page) => setPage(page)} />
                </Flex>
            </div>
        </Flex>
    );
}
export default Search;