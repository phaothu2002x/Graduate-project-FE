import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import icons from '~/assets/icons';
import images from '~/assets/images';
const cx = classNames.bind(styles);

const Footer = (props) => {
    return (
        <div className={cx('wrapper')}>
            <footer className={cx('footer')}>
                <div className={cx('row')}>
                    {/* <!-- column 1 --> */}
                    <div className={cx('column')}>
                        <a href="#!">
                            <img src={images.logo} alt="logo" className={cx('logo')} />
                        </a>
                    </div>
                    {/* <!-- column 2 --> */}
                    <div className={cx('column')}>
                        <h3 className={cx('title')}>Company</h3>
                        <ul className={cx('list')}>
                            <li>
                                <a href="#!">About</a>
                            </li>
                            <li>
                                <a href="#!">Careers</a>
                            </li>
                            <li>
                                <a href="#!">Press</a>
                            </li>
                        </ul>
                    </div>
                    {/* <!-- column 3 --> */}
                    <div className={cx('column')}>
                        <h3 className={cx('title')}>Community</h3>
                        <ul className={cx('list')}>
                            <li>
                                <a href="#!">Team Vision</a>
                            </li>
                            <li>
                                <a href="#!">Blog</a>
                            </li>
                            <li>
                                <a href="#!">feedback</a>
                            </li>
                            <li>
                                <a href="#!">Scholarships</a>
                            </li>
                        </ul>
                    </div>
                    {/* <!-- column 4 --> */}
                    <div className={cx('column')}>
                        <h3 className={cx('title')}>Events</h3>
                        <ul className={cx('list')}>
                            <li>
                                <a href="#!">Write your Feedback</a>
                            </li>
                            <li>
                                <a href="#!">Support our Website</a>
                            </li>
                        </ul>
                    </div>
                    {/* <!-- column 5 --> */}
                    <div className={cx('column')}>
                        <h3 className={cx('title')}>Be social</h3>
                        <ul className={cx('list')}>
                            <li>
                                <a href="#!" className={cx('social')}>
                                    <img src={icons.twitter} alt="" />
                                </a>
                                <a href="#!">Twitter</a>
                            </li>
                            <li>
                                <a href="#!" className={cx('social')}>
                                    <img src={icons.facebook} alt="" />
                                </a>
                                <a href="#!">Facebook</a>
                            </li>
                            <li>
                                <a href="#!" className={cx('social')}>
                                    <img src={icons.instagram} alt="" />
                                </a>
                                <a href="#!">Instagram</a>
                            </li>
                            <li>
                                <a href="#!" className={cx('social')}>
                                    <img src={icons.linkedin} alt="" />
                                </a>
                                <a href="#!">Linkedin</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('copyright')}>
                    <p className={cx('desc')}>© Copyright 2020 by RyanTruong. All right reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
