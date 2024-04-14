import Table from 'react-bootstrap/Table';
import "./../style/product_list.css";
import { FormOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';
import checkParent from '../../../functions/checkboxAll';
import { useNavigate } from 'react-router';
import { Cloudinary } from '@cloudinary/url-gen';
import { useEffect, useState } from 'react';
import { Store } from 'react-notifications-component';
import { delete_product_all, paginate_product } from '../../../services/product_service';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import DeleteModal from '../layout/modal_del';
import { Pagination } from 'antd';
import { refreshAccessToken } from '../../../services/user_service';
function ProductList() {
    document.title = "Product list";
    const [type, setType] = useState("");
    const [product, setProduct] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [delID, setDelID] = useState("");
    const [delStatus, setDelStatus] = useState(false);
    useEffect(() => {
        product_list();
        setType("product")
    }, [delStatus, page])
    const showModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleModalOk = () => {
        setIsModalOpen(false);
    };
    const onDelete = () => {
        setDelStatus(true);
    }
    const handleModalCancel = () => {
        setIsModalOpen(false);
    };
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dv7ni8uod'
        }
    });

    const product_list = async () => {
        try {
            const rs = await paginate_product(page);
            setProduct(rs.data.product_list);
            setDelStatus(false)
            setTotalProducts(rs.data.total_product)
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
            const res = await delete_product_all();
            if (res.status === 200) {
                Store.addNotification({
                    title: "Warning!!",
                    message: "You delete all products successfully!",
                    type: "warning",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 1500,
                        onScreen: true
                    }
                });
            }
            else if (res.status === 401 && res.data.message === "jwt expired") {
                Store.addNotification({
                    title: "Warning!!",
                    message: "You can retry to delete all products now!",
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
                            message: "You can't delete all products right now!",
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
                    message: "You can't delete all products right now!",
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

    const handleCheckboxChange = () => {
        const checkboxes = document.querySelectorAll('.child');
        let count = 0;
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked === true) {
                count++;
            }
        }
        return !(count === checkboxes.length);
    }

    return (
        <div className="container product_list">
            <h2 className='caption'><MenuUnfoldOutlined />Product list</h2>
            <Table bordered hover responsive="lg">
                <thead>
                    <tr>
                        <th colSpan={2} className='wrap_delete'>
                            <div className='d-flex'>
                                <div className='wrap' onClick={checkParent}>
                                    <div className='wrap_parent d-flex align-items-center'><input type='checkbox' className='parent' onClick={checkParent} /></div>
                                </div>
                                <div className="del">
                                    <Button variant='danger'
                                        onClick={delete_all}><i className="bi bi-trash-fill"></i></Button>
                                </div>
                            </div>
                        </th>
                        <th colSpan={9} className='wrap_insert'>
                            <Button variant='success' onClick={() => { navigate('/product/add') }}><i className="bi bi-plus-lg"></i></Button>
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>QTY</th>
                        <th>Description</th>
                        <th>Price Promo</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {product?.map((item) => {
                        return (

                            <tr key={item.product_id}>
                                <td><input type='checkbox' className='child' /></td>
                                <td>{item.product_id}</td>
                                <td>{item.title}</td>
                                <td>
                                    <AdvancedImage cldImg={cld.image(item.thumbnail).resize(fill().width(100).height(100))} />
                                </td>
                                <td>{item.category_name}</td>
                                <td>{item.price}</td>
                                <td>{item.qty}</td>
                                <td>{item.description}</td>
                                <td>{item.price_promotion}</td>
                                <td>{item.status === 1 ? <div className='product_hot'>HOT</div> : ""}</td>
                                <td>
                                    <div className='d-flex'>
                                        <Button variant='danger' style={{ marginRight: "10px" }} onClick={() => {
                                            showModal();
                                            setDelID(item.product_id)
                                        }}><i className="bi bi-trash-fill"></i></Button>
                                        <Button variant='warning' onClick={() => { navigate(`/product/edit/${item.product_id}`) }}><FormOutlined /></Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
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
export default ProductList;
