import "../style/order_success.css"
import { Breadcrumb } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
function Order_Success(props) {
    const orderList = props.state.order;
    const order = orderList[orderList.length - 1];
    document.title = "Order success";
    return (
        <div className="order_success container">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={'/'}>HOME</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <NavLink to={'/order_success'}>ORDER SUCCESS</NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>
            <h1>ORDER SUCCESS</h1>
            <h1>THANK YOU FOR YOUR PURCHASE!
            </h1>
            <h2>YOUR ORDER ID: {order.order_id}
            </h2>
        </div>
    );
}
const mapStateToProps = (state, ownState) => {
    return {
        state: state.order_reducer
    }
}
export default connect(mapStateToProps, null)(Order_Success);