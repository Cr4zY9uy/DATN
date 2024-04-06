import { Link } from "react-router-dom";
import "./../style/footer.css";
function Footer() {

    return (
        <div className="wrap-footer">
            <footer className="footer container">
                <div>
                    <img src="/data/logo/scart-mid.png" alt="logo" width={240} height={120} />
                    <p>S-Cart: An organic fruits store</p>
                    <hr></hr>
                </div>
                <div>
                    <h3>about us</h3>
                    <p>Address: Hoai Duc, Ha Noi</p>
                    <p>Hotline: 0928713123</p>
                    <p>Email: s-cart@ecommerce.com</p>
                </div>
                <div>
                    <h3>Service</h3>
                    <p>Privacy</p>
                    <p>Terms & Conditions</p>
                    <p>Payments</p>
                </div>
                <div>
                    <h3>QnA</h3>
                    <p>How to purchase</p>
                    <p>FAQ</p>
                    <p>What is S-cart?</p>
                </div>
            </footer>
        </div>
    );
}
export default Footer;