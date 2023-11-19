import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './UpdateModal.scss';

import { updateOrderStatus } from '~/services/orderService';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
const UpdateStatusModal = (props) => {
    const { orderData } = props;

    const [statusValue, setStatusValue] = useState(orderData.status || '');
    useEffect(() => {
        setStatusValue(orderData.status || '');
    }, [orderData]);

    const handleConfirmSave = async () => {
        //call api
        let response = await updateOrderStatus(orderData.id, statusValue);
        if (response && response.EC === 0) {
            toast.success(response.EM);
        }
        props.onHide();
    };

    return (
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h2 className="heading">Change Order Status</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="status-form">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter status of order here"
                        value={statusValue}
                        onChange={(e) => setStatusValue(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-footer">
                    <Button variant="secondary" onClick={props.handleClose} className="btn">
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleConfirmSave();
                        }}
                        className="btn"
                    >
                        Save Changes
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateStatusModal;
