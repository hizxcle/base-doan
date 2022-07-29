import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../SearchBar';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('img-block')}>
                    <a href="/">
                        <img
                            className={cx('img-logo')}
                            src="https://cdn.shopify.com/s/files/1/0453/5035/5103/files/img_02_130x30_crop_center.png?v=1644318438"
                            alt="img"
                        ></img>
                    </a>
                </div>
                <div className={cx('page')}>
                    <ul className={cx('page-list')}>
                        <li className={cx('page-list-item')}> HOME </li>
                        <li className={cx('page-list-item')}> SHOP </li>
                        <li className={cx('page-list-item')}> ABOUT </li>
                        <li className={cx('page-list-item')}> CONTACT </li>
                    </ul>
                </div>
                <div className={cx('actions')}>
                    <div className={cx('actions-items')}>
                        <div className={cx('actions-item')}>
                            <FontAwesomeIcon
                                icon={faBagShopping}
                                className={cx('item-icon')}
                            />
                            <span className={cx('item-span')}> 0 </span>
                        </div>
                        <div className={cx('actions-item')}>
                            <FontAwesomeIcon
                                icon={faHeart}
                                className={cx('item-icon')}
                            />
                        </div>
                        <div className={cx('actions-item-login')}> LOGIN </div>
                    </div>
                </div>
            </div>
            <SearchBar />
        </header>
    );
}

export default Header;
