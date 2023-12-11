import classNames from 'classnames/bind';
import styles from './Category.module.scss';

const cx = classNames.bind(styles);
const CategoryItem = (props) => {
    return (
        <div className={cx('categoryItem-wrapper')}>
            <div className={cx('title')}>{props.title}</div>
        </div>
    );
};

export default CategoryItem;
