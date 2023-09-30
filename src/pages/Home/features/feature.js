import icons from '~/assets/icons';
import classNames from 'classnames/bind';
import styles from './Feature.module.scss';

const cx = classNames.bind(styles);

const feature = (props) => {
    return (
        <div className="wrapper">
            <div className={cx('feature')}>
                <div className={cx('body')}>
                    {/* <!-- feature top --> */}
                    <div className={cx('feature-top')}>
                        <p className={cx('title')}>F E A T U R E S</p>
                        <h1 className={cx('heading')}>We are providing suitable features for Customers.</h1>
                        <p className={cx('desc')}>
                            Read our awesome feature that is absolutely suit for you. Explore the feature and know the best.
                        </p>
                    </div>

                    {/* <!-- feature content --> */}
                    <div className={cx('feature-content')}>
                        <div className={cx('feature-list')}>
                            {/* <!-- item 1 --> */}
                            <div className={cx('item')}>
                                <img src={icons.monitorIcon} alt="Monitor" className={cx('icon', 'icon-yl')} />
                                <h3 className={cx('title')}>High Guarantee</h3>
                                <p className={cx('desc')}>
                                    we are committed to delivering products of the highest quality and performance to our valued customers.
                                </p>
                            </div>
                            {/* <!-- item 2 --> */}
                            <div className={cx('item')}>
                                <img src={icons.chatting} alt="chatting" className={cx('icon', 'icon-org')} />
                                <h3 className={cx('title')}>Discuss</h3>
                                <p className={cx('desc')}>
                                    Conversation with Seller or see other reviewer about Products or any other thing
                                </p>
                            </div>
                            {/* <!-- item 3 --> */}
                            <div className={cx('item')}>
                                <img src={icons.file} alt="file" className={cx('icon', 'icon-purp')} />
                                <h3 className={cx('title')}>Fast services</h3>
                                <p className={cx('desc')}>
                                    we are committed to delivering products of the highest quality and performance to our valued customers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default feature;
