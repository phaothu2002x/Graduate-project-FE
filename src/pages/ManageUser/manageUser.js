import classNames from 'classnames/bind';
import styles from './User.module.scss';
import Header from '~/components/Header/header';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

const ManageUser = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        let session = sessionStorage.getItem('account');
        console.log(session);
        if (!session) {
            navigate('/');
        }
    });

    return (
        <>
            <Header />
            <h1> Welcome manage user page</h1>
        </>
    );
};

export default ManageUser;
