import classNames from 'classnames/bind';
import styles from './ManageProduct.module.scss';
import Header from '~/components/Header/header';
import PreviewItem from './previewItems/item';
import { useEffect, useState } from 'react';
import { fetchAllProduct } from '../../services/productService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
//=============
const cx = classNames.bind(styles);
const ManageProduct = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        let session = sessionStorage.getItem('account');
        // console.log(session);
        if (!session) {
            navigate('/login');
        }
    }, []);

    const [productData, setProductData] = useState([]);
    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        let response = await fetchAllProduct();

        if (response && response.EC === 0) {
            // toast.success(response.EM);
            setProductData(response.DT);
        } else if (response && response.EC !== 0) {
            toast.error(response.EM);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('inner')}>
                <div className={cx('heading')}>Manage Products!!!</div>

                <div className={cx('action-btn')}>
                    <button className={cx('btn btn-success', 'refresh-btn')}>
                        <span className={cx('refresh-icon')}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </span>
                        Refresh
                    </button>
                    <button className={cx('btn btn-primary', 'addNew-btn')}>
                        <span className={cx('addNew-icon')}>
                            <i className="fa fa-plus-square"></i>
                        </span>
                        Add New
                    </button>
                </div>

                <div className={cx('content')}>
                    {productData.map((item, index) => {
                        return (
                            <div key={`item-${item.id}`}>
                                <PreviewItem data={item} fetchProduct={fetchProduct} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;
