import classNames from 'classnames/bind';
import styles from './CreateProduct.module.scss';
import Header from '~/components/Header/header';
import { useState } from 'react';
import { createNewProduct } from '~/services/productService';
import _ from 'lodash';
//=============
const cx = classNames.bind(styles);

const CreateProduct = (props) => {
    const defaultProductData = {
        name: '',
        thumbnail: '',
        price: '',
        code: '',
        description: '',
    };
    const [productData, setProductData] = useState(defaultProductData);

    const [cateChecked, setCateChecked] = useState();
    const [supChecked, setSupChecked] = useState();
    const [brandChecked, setBrandChecked] = useState();
    const [typeChecked, setTypeChecked] = useState([]);

    const handleTypeCheck = (e) => {
        let isChecked = e.target.checked;
        if (isChecked) {
            setTypeChecked((prev) => [...prev, e.target.value]);
        } else {
            setTypeChecked(typeChecked.filter((item) => item !== e.target.value));
        }
    };

    const handleOnChangeInput = (value, name) => {
        let _productData = _.cloneDeep(productData);
        _productData[name] = value;
        setProductData(_productData);
    };

    const handleSave = async () => {
        let data = {
            name: productData.name,
            thumbnail: productData.thumbnail,
            price: productData.price,
            description: productData.description,
            code: productData.code,
            cateChecked,
            supChecked,
            brandChecked,
            typeChecked,
        };
        //call api
        await createNewProduct(data);
        console.log('check checked input:', data);
    };

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('inner')}>
                <div className={cx('heading')}>Create Products</div>
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
                                    className={cx('form-control', 'input')}
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
                                    className={cx('form-control', 'input')}
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
                                    className={cx('form-control', 'input')}
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
                                    className={cx('form-control', 'input')}
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
                                    className={cx('form-control', 'input')}
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
                                <div className="form-check">
                                    <input
                                        className={cx('form-check-input', 'check-input')}
                                        type="radio"
                                        name="category"
                                        id="keyboards"
                                        value={1}
                                        onClick={(e) => setCateChecked(e.target.value)}
                                    />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="keyboards">
                                        Keyboards
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className={cx('form-check-input', 'check-input')}
                                        type="radio"
                                        name="category"
                                        id="keycaps"
                                        value={2}
                                        onClick={(e) => setCateChecked(e.target.value)}
                                    />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="keycaps">
                                        KeyCaps
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className={cx('form-check-input', 'check-input')}
                                        type="radio"
                                        name="category"
                                        id="switch"
                                        value={3}
                                        onClick={(e) => setCateChecked(e.target.value)}
                                    />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="switch">
                                        Switches
                                    </label>
                                </div>
                            </div>
                            {/* type input */}
                            <div className="mb-3 col-6">
                                <div className="form-check">
                                    <input
                                        className={cx('form-check-input', 'check-input')}
                                        type="checkbox"
                                        id="gaming"
                                        value={1}
                                        onClick={(e) => handleTypeCheck(e)}
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
                                        onClick={(e) => handleTypeCheck(e)}
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
                                        onClick={(e) => handleTypeCheck(e)}
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
                                <div className="form-check">
                                    <input
                                        className={cx('form-check-input', 'check-input')}
                                        type="radio"
                                        name="supplier"
                                        id="vietnam"
                                        value={1}
                                        onClick={(e) => setSupChecked(e.target.value)}
                                    />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="vietnam">
                                        Viet Nam
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className={cx('form-check-input', 'check-input')}
                                        type="radio"
                                        name="supplier"
                                        id="USA"
                                        value={2}
                                        onClick={(e) => setSupChecked(e.target.value)}
                                    />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="USA">
                                        USA
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className={cx('form-check-input', 'check-input')}
                                        type="radio"
                                        name="supplier"
                                        id="German"
                                        value={3}
                                        onClick={(e) => setSupChecked(e.target.value)}
                                    />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="German">
                                        German
                                    </label>
                                </div>
                            </div>
                            {/* brand checked */}
                            <div className="mb-3 col-6">
                                <div className="form-check">
                                    <input
                                        className={cx('form-check-input', 'check-input')}
                                        type="radio"
                                        name="brand"
                                        id="corsair"
                                        value={1}
                                        onClick={(e) => setBrandChecked(e.target.value)}
                                    />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="corsair">
                                        Corsair
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className={cx('form-check-input', 'check-input')}
                                        type="radio"
                                        name="brand"
                                        id="akko"
                                        value={2}
                                        onClick={(e) => setBrandChecked(e.target.value)}
                                    />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="akko">
                                        Akko
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className={cx('form-check-input', 'check-input')}
                                        type="radio"
                                        name="brand"
                                        id="logitech"
                                        value={3}
                                        onClick={(e) => setBrandChecked(e.target.value)}
                                    />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="logitech">
                                        Logitech
                                    </label>
                                </div>
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

export default CreateProduct;
