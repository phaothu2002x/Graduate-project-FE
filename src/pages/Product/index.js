import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Header from '~/components/Header';

const cx = classNames.bind(styles);
const Product = (props) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('inner')}>
                <h1>Product page</h1>
            </div>
        </div>
    );
};

export default Product;
