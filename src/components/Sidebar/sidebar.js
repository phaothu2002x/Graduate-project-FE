import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import CategoryItem from '../CategoryItem/categoryItem';
import FilterItem from '../FilterItem/filterItem';
const cx = classNames.bind(styles);

const Sidebar = (props) => {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>See more Products...</h1>

            <div className={cx('category-list')}>
                <h2>Category</h2>
                <CategoryItem title="All" />
                <CategoryItem title="keyboard" />
                <CategoryItem title="Key caps" />
            </div>

            <div className={cx('filter-list')}>
                <h2>Filter: </h2>
                <FilterItem title="Category" />
                <FilterItem title="Type" />
            </div>

            <div className={cx('filter-action')}>
                <button type="button" className={cx('btn btn-primary', 'filter-btn')}>
                    Find
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
