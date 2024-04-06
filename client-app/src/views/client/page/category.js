import { Pagination } from "antd";
import { Breadcrumb } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import Product_Grid from "../layout/product_grid";
import "./../style/category.css";
import Banner_Big from "../layout/banner_big";
import { useEffect, useState } from "react";
import { product_by_cate } from "../../../services/product_service";
function Category() {
    const { name } = useParams();
    const [product, setProduct] = useState([]);
    const [page, setPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(10)
    const load_product_cate = async () => {
        try {
            const rs = await product_by_cate(name, page);
            setProduct(rs.data.product_list);
            setTotalProducts(rs.data.total_product);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        load_product_cate();
    }, [name, page])
    
    useEffect(() => {
        document.title = name;
    }, [name])
    return (
        <div className="category">
            <Banner_Big info={name} />
            <div className="container category_page d-flex flex-column align-items-center">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <NavLink to={'/'}>HOME</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <NavLink to={`/category/${name}`}>{name}</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="category_pagination"><p className=" text-left">Showing <b>1</b> - <b>{product.length}</b> results of <b>{totalProducts}</b> results</p></div>
                <div className="searchResult row">
                    {product.map((item, index) => {
                        return <Product_Grid product={item} key={index} />
                    })}
                </div>
                <Pagination
                    total={totalProducts}
                    pageSize={9}
                    current={page}
                    onChange={(page) => setPage(page)} />
            </div>
        </div>
    );
}
export default Category;