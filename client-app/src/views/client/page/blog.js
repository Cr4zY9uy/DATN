import "../style/blog.css"
import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";
function Blog_Page() {

    return (
        <div className="blog_page container">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={'/'}>HOME</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <NavLink to={'/blog'}>BLOG</NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="wrap_blog d-flex flex-column">
                <div className="item d-flex">
                    <div className="img_hover_zoom">
                        <img src="./data/blog/blog1.png" alt="apple1" />
                    </div>
                    <div className="wrap_info">
                        <p>2022-12-23 03:12:31</p>
                        <h4>Apple 1</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
                <div className="item d-flex">
                    <div className="img_hover_zoom">
                        <img src="./data/blog/blog1.png" alt="apple1" />
                    </div>
                    <div className="wrap_info">
                        <p>2022-12-23 03:12:31</p>
                        <h4>Apple 1</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
                <div className="item d-flex">
                    <div className="img_hover_zoom">
                        <img src="./data/blog/blog1.png" alt="apple1" />
                    </div>
                    <div className="wrap_info">
                        <p>2022-12-23 03:12:31</p>
                        <h4>Apple 1</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog_Page;