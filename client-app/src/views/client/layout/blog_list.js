import "./../style/blog_list.css";
function Blog() {
    return (
        <div className="blog_list ">
            <h1>blogs</h1>
            <div className="blogs container">
                <div className="blog">
                    <div className="img_hover_zoom">
                        <img src="./data/blog/blog1.png" alt="apple1" />
                    </div>                    <p>2022-12-23 03:12:31</p>
                    <h4>Apple 1</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="blog">
                    <div className="img_hover_zoom">
                        <img src="./data/blog/blog2.png" alt="apple1" />
                    </div>                    <p>2022-12-23 03:12:31</p>
                    <h4>Apple 1</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

                <div className="blog">
                    <div className="img_hover_zoom">
                        <img src="./data/blog/blog3.png" alt="apple1" />
                    </div>
                    <p>2022-12-23 03:12:31</p>
                    <h4>Apple 1</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
        </div>
    );
}
export default Blog;