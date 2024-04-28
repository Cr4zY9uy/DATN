import "./../style/banner.css";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
function Banner() {

    return (
        <Carousel
            autoplay
            autoplaySpeed={2000}
            arrows
            prevArrow={<LeftOutlined />}
            nextArrow={<RightOutlined />}
            effect="fade"
        >
            <div>
                <img src={"/data/banner/banner-home-1.png"} alt="banner1" height='100%' width='100%' />
            </div>
            <div>
                <img src={"/data/banner/banner-home-2.png"} alt="banner1" height='100%' width='100%' />
            </div>
        </Carousel>
    );
}
export default Banner;