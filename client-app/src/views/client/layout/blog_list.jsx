import { Flex, Typography } from "antd";
import "./../style/blog_list.css";
function Blog() {
    return (
        <Flex className="blog_list" vertical>
            <Typography.Title level={1}>blogs</Typography.Title>
            <Flex className="blogs container" justify="space-between" >
                <Flex className="blog" vertical>
                    <Flex className="img_hover_zoom">
                        <img src="/data/blog/blog1.png" alt="apple1" />
                    </Flex>
                    <Flex className="info" vertical>
                        <Typography.Text>2022-12-23 03:12:31</Typography.Text>
                        <Typography.Title level={4}>Apple 1</Typography.Title>
                        <Typography.Text style={{ textIndent: "20px" }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography.Text>
                    </Flex>
                </Flex>
                <Flex className="blog">
                    <Flex className="img_hover_zoom">
                        <img src="/data/blog/blog2.png" alt="apple1" />
                    </Flex>
                    <Flex className="info" vertical>
                        <Typography.Text>2022-12-23 03:12:31</Typography.Text>
                        <Typography.Title level={4}>Apple 1</Typography.Title>
                        <Typography.Text style={{ textIndent: "20px" }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography.Text>
                    </Flex>
                </Flex>
                <Flex className="blog">
                    <Flex className="img_hover_zoom">
                        <img src="/data/blog/blog3.png" alt="apple1" />
                    </Flex>
                    <Flex className="info" vertical>
                        <Typography.Text>2022-12-23 03:12:31</Typography.Text>
                        <Typography.Title level={4}>Apple 1</Typography.Title>
                        <Typography.Text style={{ textIndent: "20px" }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography.Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
export default Blog;