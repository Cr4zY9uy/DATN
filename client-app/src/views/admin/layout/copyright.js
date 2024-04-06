import "./../style/copyright.css"
import { Footer } from "antd/es/layout/layout";
function Copyright() {
    return (
        <Footer style={{ textAlign: 'center' }} className="wrap-copyright">
            <div>
                © 2024  S-Cart : An organic fruits store.  All rights reserved
            </div>
            <div>
                Powered by Anh Nguyen
            </div>
            <div>
                <a href="https://github.com/Cr4zY9uy/mern" target="_blank">Link Github</a>
            </div>
        </Footer>
    );
}
export default Copyright;