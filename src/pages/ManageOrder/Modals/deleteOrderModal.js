import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames/bind';
import styles from './DeleteOrderModal.module.scss';
import { deleteOrder } from '~/services/orderService';
import { toast } from 'react-toastify';
// ===========

const cx = classNames.bind(styles);
const DeleteOrderModal = (props) => {
    const { id } = props.orderData;
    const handleConfirmDelete = async () => {
        //call api
        let response = await deleteOrder(id);
        if (response && response.EC === 0) {
            toast.success(response.EM);
        } else {
            toast.error(response.EM);
        }
        props.onHideDeleteModal();
    };

    return (
        <>
            <Modal show={props.showDeleteModal} onHide={props.handleClose} centered className={cx('modal-box')}>
                <Modal.Header closeButton>
                    <Modal.Title className={cx('modal-heading')}>Delete Order:</Modal.Title>
                </Modal.Header>
                <Modal.Body className={cx('modal-body')}>Are you sure to delete this Order!</Modal.Body>
                <Modal.Footer className={cx('modal-footer')}>
                    <Button className={cx('action-btn')} variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button className={cx('btn-danger', 'action-btn')} variant="primary" onClick={handleConfirmDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteOrderModal;
