import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames/bind';
import styles from './DeleteModal.module.scss';

// ===========

const cx = classNames.bind(styles);
const DeleteModal = (props) => {
    return (
        <>
            <Modal show={props.showDeleteModal} onHide={props.handleClose} centered className={cx('modal-box')}>
                <Modal.Header closeButton>
                    <Modal.Title className={cx('modal-heading')}>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body className={cx('modal-body')}>Are you sure to delete this product ID: {props.id}</Modal.Body>
                <Modal.Footer className={cx('modal-footer')}>
                    <Button className={cx('action-btn')} variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button className={cx('btn-danger', 'action-btn')} variant="primary" onClick={props.handleConfirmDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteModal;
