import "./../style/product_hot.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
function Product_Hot(props) {
    const product = props.products;
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dv7ni8uod'
        }
    });
    return (
        <div className='item d-flex col-6' key={product.product_id}>
            <Link to={`/product/${product.product_id}`}><AdvancedImage cldImg={cld.image(product.thumbnail)} /></Link>
            <div className="pt-4">
                <h4>{product.title.substring(0, 23) + '...'}</h4>
                <p>
                    {product.price * (1 - parseFloat(product.price_promotion))}$
                    {product.price_promotion === 0 ? "" : <span className="discount">{`${product.price}$`}</span>}
                </p>                <div className="d-flex qty"><div>Already sold: <span>{Math.ceil(product.qty * 0.8)} </span></div>&nbsp;<div> Available: <span>{product.qty}</span></div></div>
                <ProgressBar variant="danger" now={80} />
            </div>
        </div>

    );
}
export default Product_Hot;