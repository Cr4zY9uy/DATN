import Modal from 'antd/es/modal/Modal';
import '../style/modal_del.css';
import { Store } from 'react-notifications-component';
import { Button } from 'react-bootstrap';
import { delete_category_id } from '../../../services/category_service';
import { delete_product_id } from '../../../services/product_service';
import { delete_order_id } from '../../../services/order_service';
import { refreshAccessToken } from '../../../services/user_service';
function DeleteModal(props) {
    const isModalOpen = props.status;
    const id_del = props.id_del;
    const type = props.type_del;
    
    const handleOk = async () => {
        try {
            let res = {};
            if (type === "category") {
                res = await delete_category_id(id_del);
            }
            if (type === "product") {
                res = await delete_product_id(id_del);
            }
            if (type === "order") {
                res = await delete_order_id(id_del);
            }
            if (res.status === 200) {
                Store.addNotification({
                    title: "Warning!!",
                    message: `You delete a ${type} successfully!`,
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

                props.onDel();
            }
            else if (res.status === 401 && res.data.message === "jwt expired") {
                console.log("fetched");
                Store.addNotification({
                    title: "Warning!!",
                    message: `You can retry to delete a ${type} now!`,
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
                        console.log("ferch11");
                        Store.addNotification({
                            title: "Failure!!",
                            message: `You can't delete a ${type} now!`,
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
                console.log("ferch12221");
                Store.addNotification({
                    title: "Failure!!",
                    message: `You can't delete a ${type} now!`,
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
        props.onOk();
    };

    const handleCancel = () => {
        props.onCancel();
    };

    return (
        <Modal open={isModalOpen} closable={false} footer={null} width={500} centered={true} className='deleteModal'>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <p className='words'>Do you want to DELETE this item?</p>
                <div>
                    <Button variant='danger' onClick={handleOk}>Delete</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </div>
            </div>
        </Modal >
    );
}
export default DeleteModal;