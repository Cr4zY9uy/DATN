import Table from 'react-bootstrap/Table';
import "./../style/order_list.css";
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';
import checkParent from '../../../functions/checkboxAll';
import { FormOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Store } from 'react-notifications-component';
import { delete_order_all, list_order } from '../../../services/order_service';
import DeleteModal from '../layout/modal_del';
import convertToDate from '../../../functions/convertDate';
import { Pagination } from 'antd';
import { refreshAccessToken } from '../../../services/user_service';
function OrderList() {
    document.title = "Order list";
    const [type, setType] = useState("");
    const [delID, setDelID] = useState("");
    const [order, setOrder] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [delStatus, setDelStatus] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(() => {
        cate_list();
        setType("order");
    }, [delStatus, page])
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleModalOk = () => {
        setIsModalOpen(false);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };
    const onDelete = () => {
        setDelStatus(true);
    }
    const cate_list = async () => {
        try {
            const rs = await list_order(page);
            setOrder(rs.data.order_list);
            setDelStatus(false);
            setTotalProducts(rs.data.total_product);
            if (rs.status !== 200) {
                console.log(rs.statusText)
            }
        } catch (err) {
            if (err.response) {
                console.log(err.response.status);
            }
        }
    }

    const delete_all = async () => {
        try {
            const res = await delete_order_all();
            if (res.status === 200) {
                Store.addNotification({
                    title: "Warning!!",
                    message: "You delete all orders successfully!",
                    type: "warning",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 1000,
                        onScreen: true
                    }
                });
            }
            else if (res.status === 401 && res.data.message === "jwt expired") {
                Store.addNotification({
                    title: "Warning!!",
                    message: "You can retry to delete all orders now!",
                    type: "warning",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                });
                try {
                    const rs = await refreshAccessToken();
                    if (rs.status !== 201) {
                        Store.addNotification({
                            title: "Failure!!",
                            message: "You can't delete all orders right now!",
                            type: "danger",
                            insert: "top",
                            container: "top-right",
                            animationIn: ["animate__animated", "animate__fadeIn"],
                            animationOut: ["animate__animated", "animate__fadeOut"],
                            dismiss: {
                                duration: 2000,
                                onScreen: true
                            }
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                Store.addNotification({
                    title: "Failure!!",
                    message: "You can't delete all orders right now!",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container order_list">
            <h2 className='caption'>
                <MenuUnfoldOutlined />
                Order list</h2>
            <Table bordered hover>

                <thead>

                    <tr>
                        <th colSpan={2} className='wrap_delete'>
                            <div className='d-flex'>
                                <div className='wrap' onClick={checkParent}>
                                    <div className='wrap_parent d-flex align-items-center'><input type='checkbox' className='parent' onClick={checkParent} /></div>
                                </div>
                                <div className="del">
                                    <Button variant='danger' onClick={delete_all}><i className="bi bi-trash-fill"></i></Button>
                                </div>
                            </div>
                        </th>

                    </tr>
                    <tr>
                        <th></th>
                        <th>Email</th>
                        <th>SubTotal</th>
                        <th>Shipping</th>
                        <th>Discount</th>
                        <th>Tax</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Create at</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((item) => (
                        <tr key={item.order_id}>
                            <td><input type='checkbox' className='child' /></td>
                            <td>{item.email.split('@')[0]}@<br />
                                {item.email.split('@')[1]}</td>
                            <td>
                                {
                                    item.products.reduce((total, product) => total + product.price * product.quantity, 0)
                                }$                            </td>
                            <td>{item.shipping_cost}$</td>
                            <td>{item.discount * 100}%</td>
                            <td>
                                {item.products[0].tax}$
                            </td>
                            <td>
                                {
                                    item.shipping_cost + item.products.reduce((tax, product) => (1 + product.tax) * product.price * product.quantity, 0)
                                }$
                            </td>
                            <td>{item.order_status}</td>
                            <td>{item.payment_method}</td>
                            <td>{convertToDate(item.createdAt)}</td>
                            <td>
                                <div className='d-flex'>
                                    <Button variant='danger' style={{ marginRight: "10px" }} onClick={() => {
                                        showModal();
                                        setDelID(item.order_id)
                                    }}><i className="bi bi-trash-fill"></i></Button>
                                    <Button variant='warning' onClick={() => { navigate(`/order/edit/${item.order_id}`) }}><FormOutlined /></Button>
                                </div>
                            </td>
                        </tr>))
                    }
                </tbody>
            </Table>
            <Pagination
                total={totalProducts}
                pageSize={9}
                current={page}
                onChange={(page) => setPage(page)} />
            <DeleteModal status={isModalOpen} onOk={handleModalOk} onCancel={handleModalCancel} type_del={type} id_del={delID} onDel={onDelete} />
        </div>
    );
}
export default OrderList;