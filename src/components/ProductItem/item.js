import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);
const Items = (props) => {
    return (
        <article className={cx('product-item')}>
            <figure className={cx('img-wrapper')}>
                <a href="#!">
                    <img src={props.thumb || images.productImg} alt="product" className={cx('item-thumb')} />
                </a>
            </figure>
            <section className={cx('body')}>
                <h3 className={cx('heading')}>
                    <a href="#!">{props.title || 'MONSGEEK M1W FULLY ASSEMBLED'}</a>
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
                    <p className={cx('price')}>$300</p>
                    <p className={cx('star-icon')}>
                        <span className={cx('icon')}>
                            <i className="fa fa-star"></i>
                        </span>
                        5
                    </p>
                </div>
            </section>
        </article>
    );
};

export default Items;
