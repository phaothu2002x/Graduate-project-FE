import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './DeleteCommentModal.scss';

import { toast } from 'react-toastify';
import { deleteProductComment } from '~/services/commentService';

// ===========

const DeleteCommentModal = (props) => {
    const handleConfirmDelete = async () => {
        //call api

        // console.log('id', props.commentId);
        let response = await deleteProductComment(props.commentId);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            props.fetchAllComments();
        } else if (response && response.EC !== 0) {
            toast.error(response.EM);
        }
        props.handleClose();
    };

    return (
        <>
            <Modal show={props.showDeleteCommentModal} onHide={props.handleClose} centered className="modalDeleteComment-box">
                <Modal.Header closeButton>
                    <Modal.Title className="modal-heading">Delete This Comment:</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">Are you sure to delete this Comment!</Modal.Body>
                <Modal.Footer className="modal-footer">
                    <Button className="action-btn" variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button className="btn-danger action-btn" variant="primary" onClick={handleConfirmDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteCommentModal;
