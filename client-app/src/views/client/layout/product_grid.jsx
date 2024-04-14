import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage } from '@cloudinary/react';
import "./../style/product_grid.css";
function Product_Grid(props) {
    const product = props.product;
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dv7ni8uod'
        }
    });
    return (
        <div className="search_item col-4">
            <Link to={`/product/${product.product_id}`}><AdvancedImage cldImg={cld.image(product.thumbnail)} /></Link>
            <h4>{product.title}</h4>
            <p>  {Math.ceil(product.price * (1 - parseFloat(product.price_promotion)))}$
                {product.price_promotion === 0 ? "" : <span className="discount">{`${product.price}$`}</span>}</p>
        </div>
    );
}
export default Product_Grid;