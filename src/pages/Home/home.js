import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Header from '~/components/Header/header';
import Feature from './features/feature';
import Feedback from './feedback/feedback';
import Products from './products/products';
import Footer from '~/components/Footer/footer';
import Subscription from './subscription/subscription';
import Statistic from './statistic/statistic';
import icons from '~/assets/icons';
import images from '~/assets/images';
const cx = classNames.bind(styles);

const Home = (props) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                {/* hero */}
                <div className={cx('hero')}>
                    <div className={cx('body')}>
                        {/* <!-- hero-left --> */}
                        <div className={cx('content')}>
                            <div className={cx('title')}>😎 Best keyboard PLATFORM</div>
                            <h1 className={cx('heading')}>Top 1 Keyboard selling website</h1>
                            <p className={cx('desc')}>
                                Explore the different types of keyboards, from mechanical to membrane, and find out which one is best for
                                you
                            </p>
                            <div className={cx('action-btn')}>
                                <a href="#!" className={cx('start-btn')}>
                                    Get Started
                                </a>
                                <a href="#!" className={cx('play-btn')}>
                                    <img src={icons.playBtnRightChervon} alt="right-chervon" />
                                </a>
                            </div>
                        </div>
                        {/* <!-- hero-right --> */}
                        <div className={cx('hero-block')}>
                            <img src={images.heroThumb} alt="heroImg" className={cx('thumb')} />
                            <div className={cx('hero-summary')}>
                                {/* <!-- hero-summary item1 --> */}
                                <div className={cx('course-stats')}>
                                    <div className={cx('icon')}>
                                        <img src={icons.heroIcon1} alt="course-stats" />
                                    </div>
                                    <p className={cx('label')}>Keyboard 1000+</p>
                                </div>

                                {/* <!-- hero-summary item2 --> */}
                                <div className={cx('schedule-stat')}>
                                    <p className={cx('label')}>Review</p>
                                    <div className={cx('stat-index')}>
                                        <img src={icons.heroStatIcon1} alt="" />
                                        <img src={icons.heroStatIcon2} alt="" />
                                        <img src={icons.heroStatIcon3} alt="" />
                                        <img src={icons.heroStatIcon4} alt="" />
                                    </div>
                                </div>

                                {/* <!-- hero-summary item3 --> */}
                                <div className={cx('student-stat')}>
                                    <p className={cx('desc')}>Our Active User</p>
                                    <div className={cx('avatar-group')}>
                                        <img src={icons.avatarIcon1} alt="avaIcons" className={cx('avatar')} />
                                        <img src={icons.avatarIcon2} alt="avaIcons" className={cx('avatar')} />
                                        <img src={icons.avatarIcon3} alt="avaIcons" className={cx('avatar')} />
                                        <img src={icons.avatarIcon4} alt="avaIcons" className={cx('avatar')} />
                                        <div className={cx('avatar', 'avatar-1')}>10K+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- feature --> */}
                <Feature />

                {/* Products */}
                <Products />

                {/* statistic */}
                <Statistic />

                {/* feedback */}
                <Feedback />
            </div>
            {/* subcription */}
            <Subscription />

            {/* footer */}
            <Footer />
        </div>
    );
};

export default Home;
