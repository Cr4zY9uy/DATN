import '../style/last_view.css';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router-dom';

function LastView(props) {
    const product = props.product;
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dv7ni8uod'
        }
    });
    return (
        <div className="last_view_item d-flex align-items-center">
            <Link to={`/product/${product.product_id}`}><AdvancedImage cldImg={cld.image(product.thumbnail)} /></Link>
            <h4>{product.title.length > 13 ? product.title.substring(0, 13) + '...' : product.title}</h4>
        </div>
    );
}
export default LastView;