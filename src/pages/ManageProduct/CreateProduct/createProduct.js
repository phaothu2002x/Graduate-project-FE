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
                                <label for="name" className={cx('form-label', 'input-label')}>
                                    Product name
                                </label>
                                <input type="text" className={cx('form-control', 'input')} id="name" placeholder="Enter product name" />
                            </div>
                            <div className="mb-3 col-3">
                                <label for="price" className={cx('form-label', 'input-label')}>
                                    Product price
                                </label>
                                <input type="text" className={cx('form-control', 'input')} id="price" placeholder="Enter product price" />
                            </div>
                            <div className="mb-3 col-3">
                                <label for="code" className={cx('form-label', 'input-label')}>
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
                                <label for="thumbnail" className={cx('form-label', 'input-label')}>
                                    Enter product Thumbnail
                                </label>
                            </div>
                            <div className={cx('form-floating col-6', 'textarea-form')}>
                                <textarea
                                    className={cx('form-control', 'input')}
                                    placeholder="Enter Product Description"
                                    id="description"
                                ></textarea>
                                <label for="description" className={cx('form-label', 'input-label')}>
                                    Enter Product description
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={cx('category')}>
                        <div className={cx('row')}>
                            <div className={cx('title', 'col-6')}>Category:</div>
                            <div className={cx('title', 'col-6')}>Type:</div>
                        </div>
                        <div className={cx('row', 'form-row')}>
                            <div className="mb-3 col-6">
                                <label for="category" className={cx('form-label', 'input-label')}>
                                    Product category
                                </label>
                                <input
                                    type="text"
                                    className={cx('form-control', 'input')}
                                    id="category"
                                    placeholder="Enter product category"
                                />
                            </div>
                            <div className="mb-3 col-6">
                                <label for="type" className={cx('form-label', 'input-label')}>
                                    Product type
                                </label>
                                <input type="text" className={cx('form-control', 'input')} id="type" placeholder="Enter product type" />
                            </div>
                        </div>
                        <div className={cx('row', 'form-row')}>
                            <div className={cx('form-floating col-6', 'textarea-form')}>
                                <textarea
                                    className={cx('form-control', 'input')}
                                    placeholder="Enter Category Description"
                                    id="cate-description"
                                ></textarea>
                                <label for="cate-description" className={cx('form-label', 'input-label')}>
                                    Enter Category description
                                </label>
                            </div>
                            <div className={cx('form-floating col-6', 'textarea-form')}>
                                <textarea
                                    className={cx('form-control', 'input')}
                                    placeholder="Enter Type Description"
                                    id="type-description"
                                ></textarea>
                                <label for="type-description" className={cx('form-label', 'input-label')}>
                                    Enter Type description
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={cx('category')}>
                        <div className={cx('title', 'col-6')}>Supplier:</div>
                        <div className={cx('row', 'form-row')}>
                            <div className="mb-3 col-6">
                                <label for="supplier" className={cx('form-label', 'input-label')}>
                                    Product supplier
                                </label>
                                <input
                                    type="text"
                                    className={cx('form-control', 'input')}
                                    id="supplier"
                                    placeholder="Enter supplier name"
                                />
                            </div>
                            <div className="mb-3 col-3">
                                <label for="country" className={cx('form-label', 'input-label')}>
                                    County
                                </label>
                                <input type="text" className={cx('form-control', 'input')} id="country" placeholder="Enter country" />
                            </div>
                            <div className="mb-3 col-3">
                                <label for="WholeSale" className={cx('form-label', 'input-label')}>
                                    WholeSale
                                </label>
                                <input
                                    type="text"
                                    className={cx('form-control', 'input')}
                                    id="WholeSale"
                                    placeholder="Enter Wholesale price"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('category')}>
                        <div className={cx('title', 'col-6')}>Brand:</div>
                        <div className={cx('row', 'form-row')}>
                            <div className="mb-3 col-6">
                                <label for="brand" className={cx('form-label', 'input-label')}>
                                    Product brand
                                </label>
                                <input type="text" className={cx('form-control', 'input')} id="brand" placeholder="Enter Brand name" />
                            </div>
                        </div>
                        <div className={cx('row', 'form-row')}>
                            <div className={cx('form-floating col-6', 'textarea-form')}>
                                <textarea
                                    className={cx('form-control', 'input')}
                                    placeholder="Enter Product Description"
                                    id="description"
                                ></textarea>
                                <label for="description" className={cx('form-label', 'input-label')}>
                                    Enter Brand description
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={cx('category')}>
                        <div className={cx('title', 'col-6')}>Promotion:</div>
                        <div className={cx('row', 'form-row')}>
                            <div className="mb-3 col-3">
                                <label for="value" className={cx('form-label', 'input-label')}>
                                    Value (%)
                                </label>
                                <input type="text" className={cx('form-control', 'input')} id="value" placeholder="Enter Value (%)" />
                            </div>
                            <div className="mb-3 col-3">
                                <label for="expire" className={cx('form-label', 'input-label')}>
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
