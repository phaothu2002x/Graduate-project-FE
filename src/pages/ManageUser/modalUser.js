import './ModalUser.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createUser, fetchRole } from '~/services/userService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash'; // dung trong viec ko merge dc state react
const ModalUser = (props) => {
    const defaultUserData = {
        email: '',
        username: '',
        phone: '',
        password: '',
        role: '',
    };
    const [userData, setUserData] = useState(defaultUserData);

    const handleOnChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    };

    //=>control role state
    const [userRole, setUserRole] = useState([]);
    useEffect(() => {
        getRole();
    }, []);

    const getRole = async () => {
        let res = await fetchRole();
        if (res && res.data && res.data.EC === 0) {
            setUserRole(res.data.DT);
            if (res.data.DT && res.data.DT.length > 0) {
                let role = res.data.DT;
                // console.log('>>> check role', role);
                setUserData({ ...userData, role: role[0].id });
            }
        } else {
            toast.error(res.data.EM);
        }
    };

    //validate
    const defaultValidInput = { email: true, username: true, phone: true, password: true, role: true };
    const [validInput, setValidInput] = useState(defaultValidInput);

    const checkValidateInput = () => {
        setValidInput(defaultValidInput);
        let arr = ['email', 'phone', 'username', 'password', 'role'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInput = _.cloneDeep(defaultValidInput);
                _validInput[arr[i]] = false;
                setValidInput(_validInput);

                toast.error(`empty input ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    };

    const handleConfirmUser = async () => {
        //create user
        let check = checkValidateInput();
        if (check === true) {
            let response = await createUser({ ...userData, roleId: userData['role'] });
            if (response.data.EC === 0) {
                props.onHide();
                setUserData({ ...defaultUserData, role: userRole[0].id });
            } else {
                toast.error('create user ERROR');
            }
        }
    };

    return (
        <>
            <Modal show={props.show} size="lg" onHide={props.onHide} centered>
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
                                <input
                                    value={userData.email}
                                    onChange={(e) => handleOnChangeInput(e.target.value, 'email')}
                                    id="email"
                                    className={validInput.email ? 'form-control input' : 'form-control input is-invalid'}
                                    type="email"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="col-sm-6 col-12 form-group">
                                <label htmlFor="username">
                                    Phone number: (<span className="red">*</span>)
                                </label>
                                <input
                                    onChange={(e) => handleOnChangeInput(e.target.value, 'phone')}
                                    value={userData.phone}
                                    id="username"
                                    className={validInput.phone ? 'form-control input' : 'form-control input is-invalid'}
                                    type="text"
                                    placeholder="Enter Phone"
                                />
                            </div>
                            <div className="col-sm-6 col-12 form-group">
                                <label htmlFor="username">
                                    Username: (<span className="red">*</span>)
                                </label>
                                <input
                                    value={userData.username}
                                    onChange={(e) => handleOnChangeInput(e.target.value, 'username')}
                                    id="username"
                                    className={validInput.username ? 'form-control input' : 'form-control input is-invalid'}
                                    type="text"
                                    placeholder="Enter Username"
                                />
                            </div>
                            <div className="col-sm-6 col-12 form-group">
                                <label htmlFor="password">
                                    Password: (<span className="red">*</span>)
                                </label>
                                <input
                                    onChange={(e) => handleOnChangeInput(e.target.value, 'password')}
                                    value={userData.password}
                                    id="password"
                                    className={validInput.password ? 'form-control input' : 'form-control input is-invalid'}
                                    type="password"
                                    placeholder="Enter Password"
                                />
                            </div>
                            <div className="col-sm-6 col-12 form-group">
                                <label>
                                    Role: (<span className="red">*</span>)
                                </label>
                                <select
                                    className={validInput.role ? 'form-select input' : 'form-select input is-invalid'}
                                    onChange={(e) => handleOnChangeInput(e.target.value, 'role')}
                                >
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
                    <Button variant="secondary" onClick={props.onHide} className="action-btn">
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()} className="action-btn">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUser;
