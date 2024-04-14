import '../style/hot.css';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router-dom';

function Hot(props) {
    const product = props.product;
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dv7ni8uod'
        }
    });
    return (
        <div className="hot_item d-flex align-items-center">
            <Link to={`/product/${product.product_id}`}><AdvancedImage cldImg={cld.image(product.thumbnail)} /></Link>
            <div>
                <h4>{product.title.length > 13 ? product.title.substring(0, 13) + '...' : product.title}
                </h4>
                <h5>
                    {product.price * (1 - parseFloat(product.price_promotion))}$
                    {product.price_promotion === 0 ? "" : <span className="discount">{`${product.price}$`}</span>}
                </h5>
            </div>
        </div>
    );
}
export default Hot;