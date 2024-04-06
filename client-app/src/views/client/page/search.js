import { Pagination } from "antd";
import { Breadcrumb } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import Product_Grid from "../layout/product_grid";
import "./../style/search.css";
import Banner_Big from "../layout/banner_big";
import { useEffect, useState } from "react";
import { product_by_code, product_by_name } from "../../../services/product_service";
function Search() {
    const { input } = useParams();
    const { option } = useParams();
    const [totalProducts, setTotalProducts] = useState(0);
    const [page, setPage] = useState(1);
    const [product, setProduct] = useState([]);

    const load_product = async () => {
        let rs;
        try {
            if (option === "name") {
                rs = await product_by_name(input, page);
                setProduct(rs.data.product);
                setTotalProducts(rs.data.total_product)

            }
            if (option === "code") {
                rs = await product_by_code(input, page);
                setProduct(rs.data.product);
            }
        } catch (err) {
            console.log(err.message)
        }

    }
    useEffect(() => {
        document.title = "Search for " + input;
    }, [input])

    useEffect(() => {
        load_product();
    }, [option, input, page])

    return (
        <div className="search">
            <Banner_Big info={input} />
            <div className="container search_page d-flex flex-column align-items-center">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <NavLink to={'/'}>HOME</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <NavLink to={'/search'}>SEARCH</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="results_pagination">{product.length !== 0 ? <p className=" text-left">Showing <b>1</b> - <b>{product.length}</b> results of <b>{totalProducts}</b> results</p>
                    : <p className=" text-left">Nothing to show</p>
                }</div>
                <div className="text-center">
                    <div className="searchResult row">
                        {product.map((item, index) => { return <Product_Grid product={item} key={index} /> })}
                    </div>
                </div>
                <Pagination total={totalProducts}
                    pageSize={8}
                    current={page}
                    onChange={(page) => setPage(page)} />
            </div>
        </div>
    );
}
export default Search;