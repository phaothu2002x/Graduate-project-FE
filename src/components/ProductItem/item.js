import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
const Items = (props) => {
    const navigate = useNavigate();

    const { id, thumbnail, name, price, Category, Types, Brand } = props.data;

    const handleItemClick = (id) => {
        navigate(`/product/${id}`);
    };
    return (
        <article className={cx('product-item')} onClick={() => handleItemClick(id)}>
            <figure className={cx('img-wrapper')}>
                <div>
                    <img src={thumbnail || images.productImg} alt="product" className={cx('item-thumb')} />
                </div>
            </figure>
            <section className={cx('body')}>
                <h3 className={cx('heading')}>
                    <p>{name || 'MONSGEEK M1W FULLY ASSEMBLED'}</p>
                </h3>
                <div className={cx('category-tags')}>
                    <a href="#!" className={cx('brand-tag', 'tags')}>
                        {Brand && Brand.name}
                    </a>
                    <a href="#!" className={cx('switch-tag', 'tags')}>
                        {Category && Category.name}
                    </a>
                    {Types &&
                        Types.length > 0 &&
                        Types.map((item, index) => (
                            <a href="#!" className={cx('type-tag', 'tags')} key={index}>
                                {item.name}
                            </a>
                        ))}
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
        </article>
    );
};

export default Items;
