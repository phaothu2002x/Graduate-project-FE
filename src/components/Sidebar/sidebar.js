import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { findAllSelectionSidebar } from '~/services/productService';
import { useEffect, useState } from 'react';
import { fetchFilter } from '~/services/searchService';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

const Sidebar = (props) => {
    const { currentLimit, currentPage, setTotalPage, setProductData, fetchProduct } = props;

    const [categoryData, setCategoryData] = useState([]);
    const [brandData, setBrandData] = useState([]);
    const [supplierData, setSupplierData] = useState([]);
    //for 2way bindings
    const defaultSelect = 0;
    const [categoryCheck, setCategoryCheck] = useState([]);
    const [brandSelect, setBrandSelect] = useState(defaultSelect);

    useEffect(() => {
        fetchAllSelection();
    }, []);

    const fetchAllSelection = async () => {
        let response = await findAllSelectionSidebar();
        if (response && response.EC === 0) {
            setCategoryData(response.DT.category);
            setCategoryCheck(response.DT.category.map((item) => item.id));
            setBrandData(response.DT.brand);
            setSupplierData(response.DT.supplier);
        }
    };

    const handleCategoryChanged = (id) => {
        setCategoryCheck((prev) => {
            const isChecked = categoryCheck.includes(id);
            if (isChecked) {
                return categoryCheck.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleSelectChanged = (e, name) => {
        if (name === 'brand') {
            setBrandSelect(e.target.value);
        }
    };

    const buildData = {
        category: categoryCheck,
        brand: brandSelect,
        page: currentPage,
        limit: currentLimit,
    };

    const findFilter = async () => {
        // console.log('data:', buildData);
        let response = await fetchFilter(buildData);
        if (response && response.EC === 0) {
            setProductData(response.DT.product);
            setTotalPage(response.DT.totalPages);
        }
    };
    const filterCheck = () => {
        if ((brandSelect === 0 || brandSelect === '0') && categoryCheck.length === 0) {
            return false;
        }
        return true;
    };

    const handleFilterClicked = () => {
        let check = filterCheck();
        // console.log(check);
        // console.log(categoryCheck, brandSelect);
        if (check) {
            findFilter();
        } else {
            fetchProduct();
        }
    };

    return (
        <div className={cx('wrapper', 'animate__animated animate__fadeInLeft')}>
            <h1 className={cx('title')}>See more Products...</h1>

            <div className={cx('category-list')}>
                <h2 className={cx('category-title')}>Category</h2>
                {categoryData &&
                    categoryData.length > 0 &&
                    categoryData.map((item, index) => (
                        <div className={cx('category-item')} key={index}>
                            <label className={cx('form-check-label')} htmlFor={item.name}>
                                {item.name}
                            </label>
                            <div className={cx('form-check form-switch')}>
                                <input
                                    className={cx('form-check-input')}
                                    type="checkbox"
                                    checked={categoryCheck.includes(item.id)}
                                    id={item.name}
                                    onChange={() => handleCategoryChanged(item.id)}
                                />
                            </div>
                        </div>
                    ))}
            </div>

            <div className={cx('filter-list')}>
                <h2>Filter: </h2>
                <div className={cx('filter-item')}>
                    <div className={cx('filter-title')}>Brand:</div>
                    <select
                        className={cx('form-select', 'filter-choice')}
                        value={brandSelect}
                        onChange={(e) => handleSelectChanged(e, 'brand')}
                    >
                        <option value="0">--select--</option>
                        {brandData &&
                            brandData.length > 0 &&
                            brandData.map((item, index) => (
                                <option value={item.id} key={index}>
                                    {item.name}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            <div className={cx('filter-action')}>
                <button type="button" className={cx('btn btn-primary', 'filter-btn')} onClick={handleFilterClicked}>
                    Update
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
