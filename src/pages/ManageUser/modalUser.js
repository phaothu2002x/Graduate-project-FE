import './ModalUser.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchRole } from '~/services/userService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ModalUser = (props) => {
    const [userRole, setUserRole] = useState([]);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        getRole();
    }, []);

    const getRole = async () => {
        let res = await fetchRole();
        if (res && res.data && res.data.EC === 0) {
            setUserRole(res.data.DT);
        } else {
            toast.error(res.data.EM);
        }
    };

    return (
        <>
            <Modal show={true} size="lg" onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="heading">{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body">
                        <div className="row">
                            <div className="col-sm-6 col-12 form-group">
                                <label htmlFor="email">
                                    Email: (<span className="red">*</span>)
                                </label>
                                <input id="email" className="form-control input" type="email" placeholder="Enter email" />
                            </div>
                            <div className="col-sm-6 col-12 form-group">
                                <label htmlFor="username">
                                    Phone number: (<span className="red">*</span>)
                                </label>
                                <input id="username" className="form-control input" type="text" />
                            </div>
                            <div className="col-sm-6 col-12 form-group">
                                <label htmlFor="username">
                                    Username: (<span className="red">*</span>)
                                </label>
                                <input id="username" className="form-control input" type="text" placeholder="Enter email" />
                            </div>
                            <div className="col-sm-6 col-12 form-group">
                                <label htmlFor="password">
                                    Password: (<span className="red">*</span>)
                                </label>
                                <input id="password" className="form-control input" type="password" />
                            </div>
                            <div className="col-sm-6 col-12 form-group">
                                <label>
                                    Role: (<span className="red">*</span>)
                                </label>
                                <select className="form-select input">
                                    {userRole.length > 0 &&
                                        userRole.map((role, index) => {
                                            return (
                                                <option key={`role-${index}`} value={role.id}>
                                                    {role.name}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose} className="action-btn">
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleClose} className="action-btn">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUser;
