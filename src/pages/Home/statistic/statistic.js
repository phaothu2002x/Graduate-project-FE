import classNames from 'classnames/bind';
import styles from './Statistic.module.scss';

const cx = classNames.bind(styles);
const Statistic = (props) => {
    return (
        <div className="wrapper">
            <div className={cx('statistic')}>
                <div className={cx('body')}>
                    <div className={cx('popular-course')}>
                        <h1 className={cx('heading')}>100+</h1>
                        <p className={cx('desc')}>Popular Keyboards</p>
                    </div>
                    <div className={cx('skilled-trainer')}>
                        <h1 className={cx('heading')}>500+</h1>
                        <p className={cx('desc')}>Types</p>
                    </div>
                    <div className={cx('student-learning')}>
                        <h1 className={cx('heading')}>1M+</h1>
                        <p className={cx('desc')}>High quality Products</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistic;
