import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Header from '~/components/Header/header';
import Sidebar from '~/components/Sidebar/sidebar';
import Item from '~/components/ProductItem/item';
import Search from '~/components/Search/search';
import images from '~/assets/images';

const cx = classNames.bind(styles);
const Product = (props) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('inner')}>
                <Search />
                <main className={cx('main-content')}>
                    <Sidebar />
                    <div className={cx('product-content')}>
                        <div className={cx('product-list')}>
                            <Item thumb={images.productImg3} title="One 2 pro Neverland Edition" />
                            <Item thumb={images.productImg2} />
                            <Item thumb={images.productImg4} />
                            <Item thumb={images.productImg5} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Product;
