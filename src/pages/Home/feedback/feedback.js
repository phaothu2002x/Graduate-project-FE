import classNames from 'classnames/bind';
import styles from './Feedback.module.scss';
import icons from '~/assets/icons';
const cx = classNames.bind(styles);

const Feedback = (props) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('feedback')}>
                <div className={cx('body')}>
                    {/* <!-- feedback left --> */}
                    <div className={cx('feedback-left')}>
                        <img src={icons.quote} alt="" className={cx('quote')} />
                        <p className={cx('desc')}>
                            “The wireless connectivity is a game-changer. I can easily switch between my laptop and desktop, and it's been
                            flawless so far.”
                        </p>
                        <p className={cx('student-feedback')}>
                            <span>Ben Foakes,</span> Customers.
                        </p>
                        <div className={cx('chervon-group')}>
                            <button className={cx('left-chervon')}>
                                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7 13L1 7L7 1"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <button className={cx('right-chervon')}>
                                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1 13L7 7L1 1"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* <!-- feedback right --> */}
                    <div className={cx('feedback-right')}>
                        <img src={icons.avatarMain} alt="" className={cx('main-avatar')} />
                        <img src={icons.avatarIcon6} alt="" className={cx('sub-ava1')} />
                        <img src={icons.avatarIcon7} alt="" className={cx('sub-ava2')} />
                        <img src={icons.avatarIcon8} alt="" className={cx('sub-ava3')} />
                        <img src={icons.avatarIcon9} alt="" className={cx('sub-ava4')} />
                        <img src={icons.avatarIcon3} alt="" className={cx('sub-ava5')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
