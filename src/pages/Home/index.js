import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Header from '~/components/Header';

const cx = classNames.bind(styles);

const Home = (props) => {
    return (
        <div className={cx('wrapper', 'fixed')}>
            <Header />
            <div className={cx('container')}>Home page</div>
        </div>
    );
};

export default Home;
