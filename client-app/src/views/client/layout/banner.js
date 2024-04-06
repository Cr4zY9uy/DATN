import "./../style/banner.css";
import { Carousel } from "react-bootstrap";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
function Banner() {

    return (
        <Carousel>
            <Carousel.Item interval={2000}>
                <img src={"./data/banner/banner-home-1.png"} alt="banner1" />

            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img src={"./data/banner/banner-home-2.png"} alt="banner1" />

            </Carousel.Item>
        </Carousel>
    );
}
export default Banner;