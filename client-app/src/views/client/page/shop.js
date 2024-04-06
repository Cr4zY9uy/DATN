import "../style/shop.css"
import { Pagination } from "antd";
import { Breadcrumb, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
function Shop() {
    document.title = "Shop";
    return (
        <div className="shop">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={'/'}>HOME</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <NavLink to={'/shop'}>SHOP</NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className='products_filter '>
                <div className="filterCAP">
                    <div className='clear'>
                        <span className='clear_all'>Clear all</span>
                    </div>
                    <div className='filterCate'>
                        <h5>Filter by Category</h5>
                        <p className='cate_hidden'></p>
                        <span className='categories'
                        >All categories</span>
                        <span className='coffee' >Nice</span>
                    </div>
                    <div className='filterPrice'>
                        <h5>Filter by Price</h5>
                        <p className='price_hidden'>$</p>
                        <span>100$ - 500$</span>
                        <span >500$ - 1000$</span>
                        <span>1000$ - 2000$</span>
                    </div>
                </div>
                <div className="products_cate d-flex flex-column">
                    <div className='result'><h3>Showing <span>1 - 10</span> of 100 results</h3></div>
                    <div className="products_result d-flex row text-center">
                        <div className="shop_item col-4">
                            <img src="./data/fruits/pineapple1.png" alt="pineapple" />
                            <h4>Apple 1</h4>
                            <p>10$<span className="discount">50$</span></p>
                            <Button variant="outline-warning"><i class="bi bi-cart-check-fill"></i>Add to cart</Button>
                        </div>
                        <div className="shop_item col-4">
                            <img src="./data/fruits/pineapple1.png" alt="pineapple" />
                            <h4>Apple 1</h4>
                            <p>10$<span className="discount">50$</span></p>
                            <Button variant="outline-warning"><i class="bi bi-cart-check-fill"></i>Add to cart</Button>
                        </div>
                        <div className="shop_item col-4">
                            <img src="./data/fruits/pineapple1.png" alt="pineapple" />
                            <h4>Apple 1</h4>
                            <p>10$<span className="discount">50$</span></p>
                            <Button variant="outline-warning"><i class="bi bi-cart-check-fill"></i>Add to cart</Button>
                        </div>
                        <div className="shop_item col-4">
                            <img src="./data/fruits/pineapple1.png" alt="pineapple" />
                            <h4>Apple 1</h4>
                            <p>10$<span className="discount">50$</span></p>
                            <Button variant="outline-warning"><i class="bi bi-cart-check-fill"></i>Add to cart</Button>
                        </div>
                    </div>
                    <Pagination style={{ textAlign: "center", paddingTop: 70 }} defaultCurrent={1} total={50} pageSize={9} />
                </div>
            </div>
        </div>

    );
}
export default Shop;