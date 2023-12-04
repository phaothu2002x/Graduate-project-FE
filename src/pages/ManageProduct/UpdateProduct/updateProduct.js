import classNames from 'classnames/bind';
import styles from './UpdateProduct.module.scss';
import Header from '~/components/Header/header';
import { useState, useEffect } from 'react';
import _, { set } from 'lodash';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { findProductById, findAllSelection, findType, updateProduct } from '~/services/productService';
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
    const defaultValidInput = {
        name: true,
        price: true,
        code: true,
        thumbnail: true,
        description: true,
    };

    const [productData, setProductData] = useState(defaultProductData);
    const [validInput, setValidInput] = useState(defaultValidInput);
    const [galleryValue, setGalleryValue] = useState([]);
    const [invalidGallery, setInvalidGallery] = useState();

    const [selectList, setSelectList] = useState({});
    const { brand, category, supplier } = selectList;

    //2 way binding radio
    const [brandChecked, setBrandChecked] = useState();
    const [categoryChecked, setCategoryChecked] = useState();
    const [supplierChecked, setSupplierChecked] = useState();
    const [typeChecked, setTypeChecked] = useState([]);

    const [isTypeChecked, setIsTypeChecked] = useState(true);

    // render from db
    const [typeList, setTypeList] = useState([]);
    //fetch product select, fetchallselection from db to render
    useEffect(() => {
        fetchProductItem();
        fetchAllSelection();
    }, []);

    //handle render type
    useEffect(() => {
        fetchType();
        setTypeChecked([]);
    }, [categoryChecked]);

    //
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
            //=>> set default checkbox
            if (response.DT.Types && response.DT.Types.length > 0) {
                let defaultTypeChecked = [];
                response.DT.Types.map((item) => defaultTypeChecked.push(item.id));
                setTypeChecked(defaultTypeChecked);
            }
            if (response.DT.Product_Galleries) {
                setGalleryValue(response.DT.Product_Galleries);
            }
        } else {
            toast.error('Fetch Product Item Error');
            // navigate('/manage-products');
        }
    };

    const fetchAllSelection = async () => {
        let response = await findAllSelection();

        if (response && response.EC === 0) {
            // toast(response.EM);
            setSelectList(response.DT);
        }
    };

    const fetchType = async () => {
        //call api
        let response = await findType(categoryChecked);
        if (response && response.EC === 0) {
            setTypeList(response.DT);
        }
        // } else {
        //     toast.error(response.EM);
        // }
    };
    // console.log(productData.Product_Galleries);
    //2 way binding input with obj
    const handleOnChangeInput = (value, name) => {
        let _productData = _.cloneDeep(productData);
        _productData[name] = value;
        setProductData(_productData);
        // khi warning nhap=> tat warning
        if (productData[name]) {
            let _validInput = _.cloneDeep(defaultValidInput);
            _validInput[name] = true;
            setValidInput(_validInput);
        }
    };

    const handleChangeGallery = (value, index) => {
        let _galleryValue = _.cloneDeep(galleryValue);
        _galleryValue[index].url = value;
        setGalleryValue(_galleryValue);
        // khi warning nhap=> tat warning
        if (galleryValue[index].url) {
            setInvalidGallery();
        }
    };

    const checkValidGallery = () => {
        let check = true;
        for (let i = 0; i < galleryValue.length; i++) {
            if (galleryValue[i].url === '') {
                setInvalidGallery(i);
                toast.error(`empty images at ${i + 1} url `);
                check = false;
                break;
            }
        }
        //     if (item.url === '') {
        //         setInvalidGallery(index);
        //         toast.error(`empty images at ${index + 1} url `);
        //         check = false;
        //     }
        // });
        return check;
    };
    const handleTypeCheck = (id) => {
        setTypeChecked((prev) => {
            if (typeChecked.includes(id)) {
                return typeChecked.filter((item) => item !== id);
            } else {
                setIsTypeChecked(true);
                return [...prev, id];
            }
        });
    };

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

    const checkValidSelection = () => {
        setIsTypeChecked(false);
        if (typeChecked.length > 0) {
            setIsTypeChecked(true);
            return true;
        }
        toast.error('empty Type');
        return false;
    };

    // console.log('id:', dataChecked); ok
    // console.log('check data', productData); ok
    // console.log('check select list ', selectList); ok
    // console.log('type check ', typeChecked);: ok
    const handleSave = async () => {
        let check = checkValidateInput();
        let checkSelection = checkValidSelection();
        let checkGallery = checkValidGallery();
        if (check && checkSelection && checkGallery) {
            let dataUpdate = {
                id: id,
                name: productData.name,
                thumbnail: productData.thumbnail,
                price: productData.price,
                description: productData.description,
                code: productData.code,
                categoryChecked,
                supplierChecked,
                brandChecked,
                typeChecked,
                galleryValue,
            };
            // call api
            let response = await updateProduct(dataUpdate);
            // console.log('check response', response);
            if (response && response.EC === 0) {
                toast.success(response.EM);
                setProductData(defaultProductData);
                setTypeChecked([]);
                setBrandChecked();
                setCategoryChecked();
                setSupplierChecked();
                setGalleryValue([]);
                //navigate
                navigate('/manage-products');
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            {/* <Header /> */}
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
                            <div className={cx('row col-6')}>
                                <div className={cx('form-floating col-9', 'textarea-form')}>
                                    <textarea
                                        className={
                                            validInput.thumbnail ? cx('form-control', 'input') : cx('form-control is-invalid', 'input')
                                        }
                                        placeholder="Enter product image here"
                                        id="thumbnail"
                                        value={productData.thumbnail}
                                        onChange={(e) => handleOnChangeInput(e.target.value, 'thumbnail')}
                                    ></textarea>
                                    <label htmlFor="thumbnail" className={cx('form-label', 'input-label')}>
                                        Enter product Thumbnail
                                    </label>
                                </div>
                                <div className="mb-3 col-3">
                                    <img className={cx('preview-gallery')} src={productData.thumbnail} alt="preview gallery" />
                                </div>
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
                                {typeList.length > 0 &&
                                    typeList.map((item, index) => (
                                        <div className="form-check" key={item.id}>
                                            <input
                                                className={
                                                    !isTypeChecked
                                                        ? cx('form-check-input is-invalid', 'check-input')
                                                        : cx('form-check-input', 'check-input')
                                                }
                                                type="checkbox"
                                                id={item.name}
                                                checked={typeChecked.includes(item.id)}
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

                    <div className={cx('category')}>
                        <div className={cx('row')}>
                            <div className={cx('title', 'col-12')}>Your image Gallery:</div>
                            {/* <div className={cx('form-row', 'row col-6')}>
                                <div className={cx('form-floating col-9', 'textarea-form')}>
                                    <textarea
                                        className={cx('form-control', 'input')}
                                        placeholder="change image link here"
                                        id="previewImage"
                                    ></textarea>
                                    <label htmlFor="previewImage" className={cx('form-label', 'input-label')}>
                                        Your Image link:
                                    </label>
                                </div>
                                <div className="mb-3 col-3">
                                    <img
                                        className={cx('preview-gallery')}
                                        src="https://images.unsplash.com/photo-1682687220499-d9c06b872eee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="preview gallery"
                                    />
                                </div>
                            </div> */}
                            {galleryValue ? (
                                galleryValue.map((item, index) => (
                                    <div key={index} className={cx('form-row', 'row col-6')}>
                                        <div className={cx('form-floating col-9', 'textarea-form')}>
                                            <textarea
                                                // {cx('form-control is-invalid', 'input')}
                                                className={
                                                    invalidGallery === index
                                                        ? cx('form-control is-invalid', 'input')
                                                        : cx('form-control', 'input')
                                                }
                                                placeholder="change image link here"
                                                id={`previewImage ${index}`}
                                                value={item.url}
                                                onChange={(e) => handleChangeGallery(e.target.value, index)}
                                            ></textarea>
                                            <label htmlFor={`previewImage ${index}`} className={cx('form-label', 'input-label')}>
                                                Your Image link:
                                            </label>
                                        </div>
                                        <div className="mb-3 col-3">
                                            <img className={cx('preview-gallery')} src={item.url} alt="preview gallery" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <></>
                            )}
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
