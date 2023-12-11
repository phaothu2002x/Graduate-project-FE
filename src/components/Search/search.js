import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useState } from 'react';
import { fetchProducts } from '~/services/searchService';

const cx = classNames.bind(styles);
const Search = (props) => {
    const { currentLimit, currentPage, setTotalPage } = props;

    const defaultOption = '1';
    const [searchValue, setSearchValue] = useState('');
    const [orderOption, setOrderOption] = useState(defaultOption);
    const handleSearchChanged = (value) => {
        setSearchValue(value);
    };

    const handleSearchClicked = () => {
        SearchProduct();
    };

    const handleOptionChanged = (e) => {
        setOrderOption(e.target.value);
    };

    const buildData = {
        q: searchValue,
        order: orderOption,
        page: currentPage,
        limit: currentLimit,
    };

    const SearchProduct = async () => {
        let response = await fetchProducts(buildData);
        if (response && response.EC === 0) {
            props.setProductData(response.DT.product);
            setTotalPage(response.DT.totalPages);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <input
                    type="text"
                    spellCheck="false"
                    className={cx('form-control', 'search-input')}
                    placeholder="Search Your Product Name"
                    value={searchValue}
                    onChange={(e) => {
                        handleSearchChanged(e.target.value);
                    }}
                />
                <button className={cx('btn', 'search-btn')} type="button" id="button-addon1" onClick={handleSearchClicked}>
                    Search
                </button>
                <select className={cx('form-select', 'order-by')} defaultValue={orderOption} onChange={handleOptionChanged}>
                    <option value="1">Order by</option>
                    <option value="1">(Lasted)</option>
                    <option value="2">(Oldest)</option>
                </select>
            </div>
        </div>
    );
};

export default Search;
