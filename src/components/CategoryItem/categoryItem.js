import classNames from 'classnames/bind';
import styles from './Category.module.scss';

const cx = classNames.bind(styles);
const CategoryItem = (props) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>{props.title}</div>
            <span className={cx('icon')}>
                <i className="fa fa-arrow-right"></i>
            </span>
        </div>
    );
};

export default CategoryItem;
