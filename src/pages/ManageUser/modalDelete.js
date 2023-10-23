import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalDelete.scss';
const ModalDelete = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="heading">Confirm Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete this user: {props.dataModal.email} </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose} className="action-btn">
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.confirmDelete} className="action-btn">
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDelete;
