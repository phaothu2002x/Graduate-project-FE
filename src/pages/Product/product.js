import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Header from '~/components/Header/header';
import Sidebar from '~/components/Sidebar/sidebar';
import Item from '~/components/ProductItem/item';
import Search from '~/components/Search/search';
import images from '~/assets/images';

//from manage product
import { useState, useEffect } from 'react';
import { fetchAllProduct } from '../../services/productService';
import { toast } from 'react-toastify';

// ===========
const cx = classNames.bind(styles);
const Product = (props) => {
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
                <Search />
                <main className={cx('main-content')}>
                    <Sidebar />
                    <div className={cx('product-content')}>
                        <div className={cx('product-list')}>
                            {/* <Item thumb={images.productImg3} title="One 2 pro Neverland Edition" />
                            <Item thumb={images.productImg2} />
                            <Item thumb={images.productImg4} />
                            <Item thumb={images.productImg5} /> */}
                            {productData.map((item, index) => {
                                return (
                                    <div key={`item-${item.id}`}>
                                        <Item data={item} fetchProduct={fetchProduct} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Product;
