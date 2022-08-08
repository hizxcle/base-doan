import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';
import { useEffect, useState, memo, Fragment } from 'react';
import { getCart } from '~/Services';

const cx = classNames.bind(styles);
function Header() {
    const auth = useAuth();
    const [cart, setCart] = useState([]);
    useEffect(() => {
        if (auth.isLogin) {
            getCart(auth.manguoidung).then(setCart);
        }
    }, [auth.isLogin]);

    const logout = (e) => {
        e.preventDefault();
        auth.logout();
    };
    return (
        <div className={cx('wrapper')}>
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
                        <li className={cx('page-list-item')}>
                            <Link to="/" className={cx('link-router')}>
                                HOME
                            </Link>
                        </li>
                        <li className={cx('page-list-item')}>
                            <Link to="/shop" className={cx('link-router')}>
                                SHOP
                            </Link>
                        </li>
                        <li className={cx('page-list-item')}>
                            <Link to="/about" className={cx('link-router')}>
                                ABOUT
                            </Link>
                        </li>
                        <li className={cx('page-list-item')}>
                            <Link to="/contact" className={cx('link-router')}>
                                CONTACT
                            </Link>
                        </li>

                        {auth.isLogin && (
                            <Fragment>
                                <li className={cx('page-list-item')}>
                                    <Link
                                        to="/order"
                                        className={cx('link-router')}
                                    >
                                        YOUR ORDER
                                    </Link>
                                </li>
                                <li className={cx('page-list-item')}>
                                    {' '}
                                    <Link
                                        to="/profile"
                                        className={cx('link-router')}
                                    >
                                        PROFILE
                                    </Link>{' '}
                                </li>
                            </Fragment>
                        )}
                    </ul>
                </div>
                <div className={cx('actions')}>
                    <div className={cx('actions-items')}>
                        <div className={cx('actions-item-login')}>
                            {auth.isLogin ? (
                                <a onClick={logout}>LOGOUT</a>
                            ) : (
                                <Link to="/login" className={cx('link-router')}>
                                    LOGIN
                                </Link>
                            )}
                        </div>
                        <div className={cx('actions-item', 'heart-box')}>
                            {auth.isLogin && (
                                <span>
                                    <FontAwesomeIcon icon={faUser} />{' '}
                                    {auth.userInfo.hoten || auth.userInfo.tentk}
                                </span>
                            )}
                        </div>
                        <div className={cx('actions-item')}>
                            <Link to="/cart">
                                <FontAwesomeIcon
                                    icon={faBagShopping}
                                    className={cx('item-icon')}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
        </div>
    );
}

export default memo(Header);
