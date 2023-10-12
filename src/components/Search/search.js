import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);
const Search = (props) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <input type="text" spellCheck="false" className={cx('form-control', 'search-input')} placeholder="Search your product" />
                <button className={cx('btn', 'search-btn')} type="button" id="button-addon1">
                    Search
                </button>
                <select className={cx('form-select', 'order-by')}>
                    <option selected>Order by</option>
                    <option value="1">(A-Z)</option>
                    <option value="2">(Z-A)</option>
                </select>
            </div>
        </div>
    );
};

export default Search;
