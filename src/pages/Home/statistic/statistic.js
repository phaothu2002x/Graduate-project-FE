import classNames from 'classnames/bind';
import styles from './Statistic.module.scss';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import { useState } from 'react';
const cx = classNames.bind(styles);

const Statistic = (props) => {
    const [counterOn, setCounterOn] = useState(false);
    return (
        <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
            <div
                className={cx('statistic-wrapper')}
                data-aos="zoom-in-up"
                data-aos-anchor-placement="bottom-bottom"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
            >
                <div className={cx('statistic')}>
                    <div className={cx('body')}>
                        <div className={cx('popular-course')}>
                            <h1 className={cx('heading')}>{counterOn && <CountUp start={0} end={150} duration={4} delay={0} />}+</h1>
                            <p className={cx('desc')}>Popular Keyboards</p>
                        </div>
                        <div className={cx('skilled-trainer')}>
                            <h1 className={cx('heading')}>{counterOn && <CountUp start={0} end={450} duration={4} delay={0} />}+</h1>
                            <p className={cx('desc')}>Types</p>
                        </div>
                        <div className={cx('student-learning')}>
                            <h1 className={cx('heading')}>{counterOn && <CountUp start={0} end={300} duration={4} delay={0} />}+</h1>
                            <p className={cx('desc')}>High quality Products</p>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollTrigger>
    );
};

export default Statistic;
