import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
const cx = classNames.bind(styles);

const Profile = (props) => {
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('heading')}>This is profile page</div>
                </div>
            </div>
        </>
    );
};

export default Profile;
