import classNames from 'classnames/bind';
import styles from './CreateProduct.module.scss';
import Header from '~/components/Header/header';

//=============
const cx = classNames.bind(styles);

const CreateProduct = (props) => {
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
                                <input type="text" className={cx('form-control', 'input')} id="name" placeholder="Enter product name" />
                            </div>
                            <div className="mb-3 col-3">
                                <label htmlFor="price" className={cx('form-label', 'input-label')}>
                                    Product price
                                </label>
                                <input type="text" className={cx('form-control', 'input')} id="price" placeholder="Enter product price" />
                            </div>
                            <div className="mb-3 col-3">
                                <label htmlFor="code" className={cx('form-label', 'input-label')}>
                                    Product code
                                </label>
                                <input type="text" className={cx('form-control', 'input')} id="code" placeholder="Enter product code" />
                            </div>
                        </div>
                        <div className={cx('row', 'form-row')}>
                            <div className={cx('form-floating col-6', 'textarea-form')}>
                                <textarea
                                    className={cx('form-control', 'input')}
                                    placeholder="Enter product image here"
                                    id="thumbnail"
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
                            <div className="mb-3 col-6">
                                <div className="form-check">
                                    <input className={cx('form-check-input', 'check-input')} type="radio" name="category" id="keyboards" />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="keyboards">
                                        Keyboards
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className={cx('form-check-input', 'check-input')} type="radio" name="category" id="keycaps" />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="keycaps">
                                        KeyCaps
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className={cx('form-check-input', 'check-input')} type="radio" name="category" id="switch" />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="switch">
                                        Switches
                                    </label>
                                </div>
                            </div>
                            {/*  */}
                            <div className="mb-3 col-6">
                                <div className="form-check">
                                    <input className={cx('form-check-input', 'check-input')} type="checkbox" value="" id="gaming" />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="gaming">
                                        Gamings
                                    </label>
                                </div>
                                <div className="form-check ">
                                    <input className={cx('form-check-input', 'check-input')} type="checkbox" value="" id="mechanical" />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="mechanical">
                                        Mechanical
                                    </label>
                                </div>
                                <div className="form-check ">
                                    <input className={cx('form-check-input', 'check-input')} type="checkbox" value="" id="wireless" />
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
                            <div className="mb-3 col-6">
                                <div className="form-check">
                                    <input className={cx('form-check-input', 'check-input')} type="radio" name="supplier" id="vietnam" />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="vietnam">
                                        Viet Nam
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className={cx('form-check-input', 'check-input')} type="radio" name="supplier" id="USA" />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="USA">
                                        USA
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className={cx('form-check-input', 'check-input')} type="radio" name="supplier" id="German" />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="German">
                                        German
                                    </label>
                                </div>
                            </div>
                            {/*  */}
                            <div className="mb-3 col-6">
                                <div className="form-check">
                                    <input className={cx('form-check-input', 'check-input')} type="radio" name="brand" id="corsair" />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="corsair">
                                        Corsair
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className={cx('form-check-input', 'check-input')} type="radio" name="brand" id="akko" />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="akko">
                                        Akko
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className={cx('form-check-input', 'check-input')} type="radio" name="brand" id="logitech" />
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
                <button className={cx('btn btn-primary', 'save-btn')}>Save</button>
            </div>
        </div>
    );
};

export default CreateProduct;
