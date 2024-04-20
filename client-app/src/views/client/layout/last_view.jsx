import { Flex, Typography } from 'antd';
import '../style/last_view.css';
import { Link } from 'react-router-dom';

function LastView(props) {
    const product = props.product;
    return (
        <Flex className="last_view_item d-flex align-items-center">
            <Link to={`/product/${product.product_id}`}>
                <img src="/data/banner/banner-home-1.png" loading="lazy" />
            </Link>
            <Typography.Text level={4} ellipsis={true}>{product.title}</Typography.Text>
        </Flex>
    );
}
export default LastView;