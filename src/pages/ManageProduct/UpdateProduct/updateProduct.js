import classNames from 'classnames/bind';
import styles from './UpdateProduct.module.scss';
import Header from '~/components/Header/header';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { findProductById, findAllSelection } from '~/services/productService';
//=============
const cx = classNames.bind(styles);

const UpdateProduct = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const defaultProductData = {
        name: '',
        thumbnail: '',
        price: '',
        code: '',
        description: '',
    };
    const [productData, setProductData] = useState(defaultProductData);

    const [selectList, setSelectList] = useState({});
    const { brand, category, supplier } = selectList;

    //2 way binding radio
    const [brandChecked, setBrandChecked] = useState();
    const [categoryChecked, setCategoryChecked] = useState();
    const [supplierChecked, setSupplierChecked] = useState();

    //fetch product select, fetchallselection from db to render
    useEffect(() => {
        fetchProductItem();
        fetchAllSelection();
    }, []);

    const fetchProductItem = async () => {
        let response = await findProductById(id);
        // console.log(response);
        if (response && response.EC === 0) {
            // toast.success(response.EM);
            setProductData(response.DT);
            //=>> set default radio
            if (response.DT.Suppliers && response.DT.Suppliers.length > 0) {
                setSupplierChecked(response.DT.Suppliers[0].id);
            }
            if (response.DT.Brand) {
                setBrandChecked(response.DT.Brand.id);
            }
            if (response.DT.Category) {
                setCategoryChecked(response.DT.Category.id);
            }
        } else {
            toast.error(response.EM);
            navigate('/manage-products');
        }
    };

    const fetchAllSelection = async () => {
        let response = await findAllSelection();

        if (response && response.EC === 0) {
            toast(response.EM);
            setSelectList(response.DT);
        }
    };

    //2 way binding input with obj
    const handleOnChangeInput = (value, name) => {
        let _productData = _.cloneDeep(productData);
        _productData[name] = value;
        setProductData(_productData);
    };

    let dataChecked = {
        brand: brandChecked,
        category: categoryChecked,
        supplier: supplierChecked,
    };
    console.log('id:', dataChecked);
    // console.log('check data', productData); ok
    // console.log('check select list ', selectList); ok
    const handleSave = () => {};
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('inner')}>
                <div className={cx('heading')}>Update Products</div>
                <div className={cx('addNew-form')}>
                    <div className={cx('category')}>
                        <div className={cx('title')}>Product:</div>
                        <div className={cx('row', 'form-row')}>
                            <div className="mb-3 col-6">
                                <label htmlFor="name" className={cx('form-label', 'input-label')}>
                                    Product name
                                </label>
                                <input
                                    type="text"
                                    className={cx('form-control is-invalid', 'input')}
                                    id="name"
                                    placeholder="Enter product name"
                                    value={productData.name}
                                    onChange={(e) => handleOnChangeInput(e.target.value, 'name')}
                                />
                            </div>
                            <div className="mb-3 col-3">
                                <label htmlFor="price" className={cx('form-label', 'input-label')}>
                                    Product price
                                </label>
                                <input
                                    type="text"
                                    className={cx('form-control is-invalid', 'input')}
                                    id="price"
                                    placeholder="Enter product price"
                                    value={productData.price}
                                    onChange={(e) => handleOnChangeInput(e.target.value, 'price')}
                                />
                            </div>
                            <div className="mb-3 col-3">
                                <label htmlFor="code" className={cx('form-label', 'input-label')}>
                                    Product code
                                </label>
                                <input
                                    type="text"
                                    className={cx('form-control is-invalid', 'input')}
                                    id="code"
                                    placeholder="Enter product code"
                                    value={productData.code}
                                    onChange={(e) => handleOnChangeInput(e.target.value, 'code')}
                                />
                            </div>
                        </div>
                        <div className={cx('row', 'form-row')}>
                            <div className={cx('form-floating col-6', 'textarea-form')}>
                                <textarea
                                    className={cx('form-control is-invalid', 'input')}
                                    placeholder="Enter product image here"
                                    id="thumbnail"
                                    value={productData.thumbnail}
                                    onChange={(e) => handleOnChangeInput(e.target.value, 'thumbnail')}
                                ></textarea>
                                <label htmlFor="thumbnail" className={cx('form-label', 'input-label')}>
                                    Enter product Thumbnail
                                </label>
                            </div>
                            <div className={cx('form-floating col-6', 'textarea-form')}>
                                <textarea
                                    className={cx('form-control is-invalid', 'input')}
                                    placeholder="Enter Product Description"
                                    id="description"
                                    value={productData.description}
                                    onChange={(e) => handleOnChangeInput(e.target.value, 'description')}
                                ></textarea>
                                <label htmlFor="description" className={cx('form-label', 'input-label')}>
                                    Enter Product description
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={cx('category')}>
                        <div className={cx('row')}>
                            <div className={cx('title', 'col-6')}>Product Category:</div>
                            <div className={cx('title', 'col-6')}>Product Type:</div>
                        </div>
                        <div className={cx('row', 'form-row')}>
                            {/* category input*/}
                            <div className="mb-3 col-6">
                                {selectList.category &&
                                    category.map((item) => (
                                        <div className="form-check" key={item.id}>
                                            <input
                                                className={cx('form-check-input', 'check-input')}
                                                type="radio"
                                                name="category"
                                                id={item.name}
                                                checked={categoryChecked === item.id}
                                                onChange={() => setCategoryChecked(item.id)}
                                            />
                                            <label className={cx('form-check-label', 'input-name')} htmlFor={item.name}>
                                                {item.name}
                                            </label>
                                        </div>
                                    ))}
                            </div>
                            {/* type input */}
                            <div className="mb-3 col-6">
                                <div className="form-check">
                                    <input
                                        className={cx('form-check-input', 'check-input')}
                                        type="checkbox"
                                        id="gaming"
                                        value={1}
                                        // onClick={(e) => handleTypeCheck(e)}
                                    />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="gaming">
                                        Gamings
                                    </label>
                                </div>
                                <div className="form-check ">
                                    <input
                                        className={cx('form-check-input', 'check-input')}
                                        type="checkbox"
                                        id="mechanical"
                                        value={2}
                                        // onClick={(e) => handleTypeCheck(e)}
                                    />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="mechanical">
                                        Mechanical
                                    </label>
                                </div>
                                <div className="form-check ">
                                    <input
                                        className={cx('form-check-input', 'check-input')}
                                        type="checkbox"
                                        id="wireless"
                                        value={3}
                                        // onClick={(e) => handleTypeCheck(e)}
                                    />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="wireless">
                                        Wireless
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('category')}>
                        <div className={cx('row')}>
                            <div className={cx('title', 'col-6')}>Product Supplier:</div>
                            <div className={cx('title', 'col-6')}>Product Brand:</div>
                        </div>
                        <div className={cx('row', 'form-row')}>
                            {/* supplier input */}
                            <div className="mb-3 col-6">
                                {selectList.supplier ? (
                                    supplier.map((item) => (
                                        <div className="form-check" key={item.id}>
                                            <input
                                                className={cx('form-check-input', 'check-input')}
                                                type="radio"
                                                name="supplier"
                                                id={item.country}
                                                checked={supplierChecked === item.id}
                                                onChange={() => setSupplierChecked(item.id)}
                                            />
                                            <label className={cx('form-check-label', 'input-name')} htmlFor={item.country}>
                                                {item.country}
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                            {/* brand checked */}
                            <div className="mb-3 col-6">
                                {selectList.brand ? (
                                    brand.map((item) => (
                                        <div className="form-check" key={item.id}>
                                            <input
                                                className={cx('form-check-input', 'check-input')}
                                                type="radio"
                                                name="brand"
                                                id={item.name}
                                                // defaultChecked={productData.Brand.id}
                                                // value={item.id}
                                                checked={brandChecked === item.id}
                                                onChange={() => setBrandChecked(item.id)}
                                            />
                                            <label className={cx('form-check-label', 'input-name')} htmlFor={item.name}>
                                                {item.name}
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={cx('category')} style={{ display: 'none' }}>
                        <div className={cx('title', 'col-6')}>Promotion:</div>
                        <div className={cx('row', 'form-row')}>
                            <div className="mb-3 col-3">
                                <label htmlFor="value" className={cx('form-label', 'input-label')}>
                                    Value (%)
                                </label>
                                <input type="text" className={cx('form-control', 'input')} id="value" placeholder="Enter Value (%)" />
                            </div>
                            <div className="mb-3 col-3">
                                <label htmlFor="expire" className={cx('form-label', 'input-label')}>
                                    Expire At
                                </label>
                                <input type="text" className={cx('form-control', 'input')} id="expire" placeholder="Enter date" />
                            </div>
                        </div>
                    </div>
                </div>
                <button className={cx('btn btn-primary', 'save-btn')} onClick={() => handleSave()}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default UpdateProduct;
