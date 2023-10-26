import classNames from 'classnames/bind';
import styles from './ManageProduct.module.scss';
import Header from '~/components/Header/header';
import PreviewItem from './previewItems/item';
import { useEffect, useState } from 'react';
import { fetchAllProduct } from '../../services/productService';
import { toast } from 'react-toastify';
//=============
const cx = classNames.bind(styles);
const ManageProduct = (props) => {
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
                            <div key={`item-${index}`}>
                                <PreviewItem data={item} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;
