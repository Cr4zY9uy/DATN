import { Breadcrumb, Flex, Pagination } from "antd";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Banner_Big from "../layout/banner_big";
import ProductGrid from "../layout/product_grid";
import "./../style/category.css";
function Category() {
    const { category_id } = useParams();
    // const [product, setProduct] = useState([]);
    const [page, setPage] = useState(1);
    // const [totalProducts, setTotalProducts] = useState(10)
    // const load_product_cate = async () => {
    //     try {
    //         const rs = await product_by_cate(name, page);
    //         setProduct(rs.data.product_list);
    //         setTotalProducts(rs.data.total_product);
    //     } catch (err) {
    //         console.log(err.message);
    //     }
    // }

    // useEffect(() => {
    //     load_product_cate();
    // }, [name, page])

    useEffect(() => {
        document.title = category_id;
        return () => {
            document.title = ""
        }
    }, [category_id])
    return (
        <>
            <Banner_Big info={category_id} />
            <Flex className="category_page" vertical>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <NavLink to={'/'}>HOME</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <NavLink to={`/category/${name}`}>{name}</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Flex className="category_pagination" justify="center"><p className=" text-left">Showing <b>1</b> - <b>10</b> results of <b>10</b> results</p></Flex>
                <Flex className="category_items" wrap="wrap" gap="50px">
                    {[...Array(10)].slice(1, 7).map((item, index) => {
                        return <ProductGrid products={{ product_id: 1, title: "Keo bong gon cuc ngon", price: 1024133, price_promotion: 0.1, qty: 10 }} key={index} />
                    })}
                </Flex>
                <Flex justify="center">
                    <Pagination
                        total={15}
                        pageSize={9}
                        current={page}
                        hideOnSinglePage
                        showSizeChanger={false}
                        onChange={(page) => setPage(page)} />

                </Flex>
            </Flex>
        </>
    );
}
export default Category;