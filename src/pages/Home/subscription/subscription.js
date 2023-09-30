import classNames from 'classnames/bind';
import styles from './Subcription.module.scss';

const cx = classNames.bind(styles);

const Subscription = (props) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('subscription')}>
                <div className={cx('body')}>
                    <div className={cx('subscript-left')}>
                        <h1 className={cx('heading')}>Ready to Get Admit</h1>
                        <p className={cx('desc')}>Create your account and Find your Passion.</p>
                    </div>
                    <div className={cx('subscript-right')}>
                        <a href="#!" className={cx('start-btn')}>
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
