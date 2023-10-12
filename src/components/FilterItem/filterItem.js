import classNames from 'classnames/bind';
import styles from './Filter.module.scss';

const cx = classNames.bind(styles);

const FilterItem = (props) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>{props.title}:</div>
            <select className={cx('form-select', 'filter-items')}>
                <option selected>keyboard</option>
                <option value="1">Key caps</option>
                <option value="2">Others</option>
            </select>
        </div>
    );
};

export default FilterItem;
