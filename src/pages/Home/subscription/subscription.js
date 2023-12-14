import classNames from 'classnames/bind';
import styles from './Subcription.module.scss';

const cx = classNames.bind(styles);

const Subscription = (props) => {
    return (
        <div className={cx('wrapper')} data-aos="zoom-out-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
            <div className={cx('subscription')}>
                <div className={cx('body')}>
                    <div className={cx('subscript-left')}>
                        <h1 className={cx('heading')}>Ready to Get Admit</h1>
                        <p className={cx('desc')}>Create your account and Find your Passion.</p>
                    </div>
                    <div className={cx('subscript-right')}>
                        <a href="/product" className={cx('start-btn')}>
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
