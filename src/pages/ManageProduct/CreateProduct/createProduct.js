import classNames from 'classnames/bind';
import styles from './CreateProduct.module.scss';
import Header from '~/components/Header/header';
import { useEffect, useState } from 'react';
import { createNewProduct, findType, findAllSelection } from '~/services/productService';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
//=============
const cx = classNames.bind(styles);

const CreateProduct = (props) => {
    const navigate = useNavigate();
    const defaultRadioValue = 1;

    const defaultProductData = {
        name: '',
        thumbnail: '',
        price: '',
        code: '',
        description: '',
    };
    // check validate input
    const defaultValidInput = {
        name: true,
        price: true,
        code: true,
        thumbnail: true,
        description: true,
    };

    const [productData, setProductData] = useState(defaultProductData);
    const [validInput, setValidInput] = useState(defaultValidInput);

    const [cateChecked, setCateChecked] = useState(defaultRadioValue);
    const [supChecked, setSupChecked] = useState(defaultRadioValue);
    const [brandChecked, setBrandChecked] = useState(defaultRadioValue);

    const [typeSelect, setTypeSelect] = useState([]);
    const [isTypeChecked, setIsTypeChecked] = useState(true);

    //render from db
    const [typeList, setTypeList] = useState([]);
    const [selectList, setSelectList] = useState({});
    const { brand, category, supplier } = selectList;

    useEffect(() => {
        fetchAllSelection();
    }, []);

    useEffect(() => {
        fetchType();
        setTypeSelect([]);
    }, [cateChecked]);

    const fetchAllSelection = async () => {
        let response = await findAllSelection();
        if (response && response.EC === 0) {
            // toast(response.EM);
            setSelectList(response.DT);
        }
    };

    const fetchType = async () => {
        //call api
        let response = await findType(cateChecked);
        if (response && response.EC === 0) {
            setTypeList(response.DT);
        } else {
            toast.error(response.EM);
        }
    };

    const handleTypeCheck = (id) => {
        setTypeSelect((prev) => {
            if (typeSelect.includes(id)) {
                return typeSelect.filter((item) => item !== id);
            } else {
                setIsTypeChecked(true);
                return [...prev, id];
            }
        });
    };

    const handleOnChangeInput = (value, name) => {
        if (productData[name] !== '') {
            let _validInput = _.cloneDeep(defaultValidInput);
            _validInput[name] = true;
            setValidInput(_validInput);
        }
        let _productData = _.cloneDeep(productData);
        _productData[name] = value;
        setProductData(_productData);
    };

    //validation input
    const checkValidateInput = () => {
        setValidInput(defaultValidInput);
        let check = true;
        //for input
        let arr = ['name', 'price', 'code', 'thumbnail', 'description'];
        for (let i = 0; i < arr.length; i++) {
            if (!productData[arr[i]]) {
                let _validInput = _.cloneDeep(defaultValidInput);
                _validInput[arr[i]] = false;
                setValidInput(_validInput);
                toast.error(`empty input ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    };
    // validate selection check
    const checkValidSelection = () => {
        setIsTypeChecked(false);
        if (typeSelect.length > 0) {
            setIsTypeChecked(true);
            return true;
        }
        toast.error('empty Type');
        return false;
    };

    const handleSave = async () => {
        let check = checkValidateInput();
        let checkSelection = checkValidSelection();
        if (check === true && checkSelection === true) {
            let data = {
                name: productData.name,
                thumbnail: productData.thumbnail,
                price: productData.price,
                description: productData.description,
                code: productData.code,
                cateChecked,
                supChecked,
                brandChecked,
                typeSelect,
            };
            // console.log('check typecheck', data);
            // call api
            let response = await createNewProduct(data);
            if (response && response.EC === 0) {
                toast.success(response.EM);
                setProductData(defaultProductData);
                setTypeSelect([]);
                setBrandChecked(defaultRadioValue);
                setSupChecked(defaultRadioValue);
                //navigate
                // navigate('/manage-products');
            }
        }
    };
    // console.log('check typelist', typeList); .from db
    // console.log('check selectList', selectList); ok
    // console.log('typeselection', typeSelect);ok
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
                                    className={validInput.name ? cx('form-control', 'input') : cx('form-control is-invalid', 'input')}
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
                                    className={validInput.price ? cx('form-control', 'input') : cx('form-control is-invalid', 'input')}
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
                                    className={validInput.code ? cx('form-control', 'input') : cx('form-control is-invalid', 'input')}
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
                                    className={validInput.thumbnail ? cx('form-control', 'input') : cx('form-control is-invalid', 'input')}
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
                                    className={
                                        validInput.description ? cx('form-control', 'input') : cx('form-control is-invalid', 'input')
                                    }
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
                                                checked={cateChecked === item.id}
                                                onChange={() => setCateChecked(item.id)}
                                            />
                                            <label className={cx('form-check-label', 'input-name')} htmlFor={item.name}>
                                                {item.name}
                                            </label>
                                        </div>
                                    ))}
                            </div>
                            {/* type input */}
                            <div className="mb-3 col-6">
                                {typeList.length > 0 &&
                                    typeList.map((item) => (
                                        <div className="form-check" key={item.id}>
                                            <input
                                                className={
                                                    !isTypeChecked
                                                        ? cx('form-check-input is-invalid', 'check-input')
                                                        : cx('form-check-input', 'check-input')
                                                }
                                                type="checkbox"
                                                id={item.name}
                                                checked={typeSelect.includes(item.id)}
                                                onChange={() => handleTypeCheck(item.id)}
                                            />
                                            <label className={cx('form-check-label', 'input-name')} htmlFor={item.name}>
                                                {item.name}
                                            </label>
                                        </div>
                                    ))}
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
                                {selectList.supplier &&
                                    supplier.map((item) => (
                                        <div className="form-check" key={item.id}>
                                            <input
                                                className={cx('form-check-input', 'check-input')}
                                                type="radio"
                                                id={item.country}
                                                checked={supChecked === item.id}
                                                onChange={() => setSupChecked(item.id)}
                                            />
                                            <label className={cx('form-check-label', 'input-name')} htmlFor={item.country}>
                                                {item.name}
                                            </label>
                                        </div>
                                    ))}
                            </div>
                            {/* brand checked */}
                            <div className="mb-3 col-6">
                                {selectList.brand &&
                                    brand.map((item) => (
                                        <div className="form-check" key={item.id}>
                                            <input
                                                className={cx('form-check-input', 'check-input')}
                                                type="radio"
                                                name="brand"
                                                id={item.name}
                                                checked={brandChecked === item.id}
                                                onChange={() => setBrandChecked(item.id)}
                                            />
                                            <label className={cx('form-check-label', 'input-name')} htmlFor={item.name}>
                                                {item.name}
                                            </label>
                                        </div>
                                    ))}
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
