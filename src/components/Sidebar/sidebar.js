import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = (props) => {
    return <div className={cx('wrapper')}>Side bar</div>;
};

export default Sidebar;
