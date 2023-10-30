import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import { deleteProduct } from '~/services/productService';
import { toast } from 'react-toastify';
import { useState } from 'react';
import DeleteModal from '../Modals/deleteModal';
const cx = classNames.bind(styles);

const PreviewItem = (props) => {
    const { id, thumbnail, name, price } = props.data;
    console.log('check data : ', props.data);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteItem = () => {
        setShowDeleteModal(true);
    };
    const handleConfirmDelete = async () => {
        let response = await deleteProduct(props.data);

        if (response && response.EC === 0) {
            toast.success(response.EM);
        } else {
            toast.error(response.EM);
        }
        // update list product
        await props.fetchProduct();

        setShowDeleteModal(false);
    };
    const handleClose = () => {
        setShowDeleteModal(false);
    };
    return (
        <>
            <article className={cx('product-item')}>
                <figure className={cx('img-wrapper')}>
                    <a href="#!">
                        <img src={thumbnail} alt="product" className={cx('item-thumb')} />
                    </a>
                </figure>
                <section className={cx('body')}>
                    <h3 className={cx('heading')}>
                        <a href="#!">{name || 'MONSGEEK M1W FULLY ASSEMBLEDEK'}</a>
                    </h3>
                    <div className={cx('category-tags')}>
                        <a href="#!" className={cx('brand-tag', 'tags')}>
                            {props.brandTag || 'Akko'}
                        </a>
                        <a href="#!" className={cx('type-tag', 'tags')}>
                            {props.typeTag || 'Custom'}
                        </a>
                        <a href="#!" className={cx('switch-tag', 'tags')}>
                            {props.switchTag || 'red switch'}
                        </a>
                    </div>
                    <div className={cx('item-info')}>
                        <p className={cx('price')}>${price}</p>
                        <p className={cx('star-icon')}>
                            <span className={cx('icon')}>
                                <i className="fa fa-star"></i>
                            </span>
                            5
                        </p>
                    </div>
                </section>
                {/* phan chinh sua */}
                <div className={cx('action-btn')}>
                    <button className={cx('btn btn-warning', 'edit-btn')}>Edit</button>
                    <button className={cx('btn btn-danger', 'delete-btn')} onClick={() => handleDeleteItem()}>
                        Delete
                    </button>
                </div>
            </article>
            {/* <Modal show={showDeleteModal} onHide={handleClose} centered className={cx('modal-box')}>
                <Modal.Header closeButton>
                    <Modal.Title className={cx('modal-heading')}>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body className={cx('modal-body')}>Are you sure to delete this product ID: {id}</Modal.Body>
                <Modal.Footer className={cx('modal-footer')}>
                    <Button className={cx('action-btn')} variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className={cx('btn-danger', 'action-btn')} variant="primary" onClick={handleConfirmDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal> */}
            <DeleteModal
                id={id}
                showDeleteModal={showDeleteModal}
                handleDeleteItem={handleDeleteItem}
                handleConfirmDelete={handleConfirmDelete}
                handleClose={handleClose}
            />
        </>
    );
};

export default PreviewItem;
