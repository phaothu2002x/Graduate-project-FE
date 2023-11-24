import './ModalUser.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createUser, fetchRole, updateCurrentUser } from '~/services/userService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash'; // dung trong viec ko merge dc state react
const ModalUser = (props) => {
    const { action, dataModalUser } = props;
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

    useEffect(() => {
        if (action === 'UPDATE') {
            // console.log(dataModalUser);

            setUserData({ ...dataModalUser, role: dataModalUser.Role ? dataModalUser.Role.id : '' });
        }
    }, [dataModalUser]);

    useEffect(() => {
        if (action === 'CREATE') {
            if (userRole && userRole.length > 0) {
                setUserData({ ...userData, role: userRole[0].id });
            }
        }
    }, [action]);

    const getRole = async () => {
        let res = await fetchRole();
        if (res && res.EC === 0) {
            setUserRole(res.DT);
            if (res.DT && res.DT.length > 0) {
                let role = res.DT;
                // console.log('>>> check role', role);
                setUserData({ ...userData, role: role[0].id });
            }
        } else {
            toast.error('Get role failed');
        }
    };

    //validate
    const defaultValidInput = { email: true, username: true, phone: true, password: true, role: true };
    const [validInput, setValidInput] = useState(defaultValidInput);

    const checkValidateInput = () => {
        if (action === 'UPDATE') {
            return true;
        }

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
            let response =
                action === 'CREATE'
                    ? await createUser({ ...userData, roleId: userData['role'] })
                    : await updateCurrentUser({ ...userData, roleId: userData['role'] });

            if (response && response.EC === 0) {
                props.onHide();
                setUserData({ ...defaultUserData, role: userRole && userRole.length > 0 ? userRole[0].id : '' });
            }
            if (response && response.EC !== 0) {
                toast.error(response.EM);
                let _validInput = _.cloneDeep(defaultValidInput);
                _validInput[response.DT] = false;
                setValidInput(_validInput);
            }
        }
    };

    ///handle modal close
    const handleCloseModalUser = () => {
        props.onHide();
        setUserData(defaultUserData);
        setValidInput(defaultValidInput);
    };

    return (
        <>
            <Modal show={props.show} size="lg" onHide={() => handleCloseModalUser()} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="heading">{props.action === 'CREATE' ? 'Create new user' : 'Update user'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body">
                        <div className="row">
                            <div className="col-sm-6 col-12 form-group">
                                <label htmlFor="email">
                                    Email: (<span className="red">*</span>)
                                </label>
                                <input
                                    disabled={action === 'CREATE' ? false : true}
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
                                    disabled={action === 'CREATE' ? false : true}
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
                                {action === 'CREATE' && (
                                    <>
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
                                    </>
                                )}
                            </div>

                            <div className="col-sm-6 col-12 form-group">
                                <label>
                                    Role: (<span className="red">*</span>)
                                </label>
                                <select
                                    className={validInput.role ? 'form-select input' : 'form-select input is-invalid'}
                                    onChange={(e) => handleOnChangeInput(e.target.value, 'role')}
                                    value={userData.role}
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
                    <Button variant="secondary" onClick={() => handleCloseModalUser()} className="action-btn">
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
