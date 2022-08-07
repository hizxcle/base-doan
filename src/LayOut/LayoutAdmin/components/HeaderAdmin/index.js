import styles from './HeaderAdmin.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function HeaderAdmin({
    onChangeToProduct,
    onChangeToCustomer,
    onChangeToOrder,
    user,
}) {
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
                        <button
                            onClick={onChangeToProduct}
                            className={cx('button')}
                        >
                            <li className={cx('page-list-item')}>
                                <span className={cx('link-router')}>
                                    Quan li san pham
                                </span>
                            </li>
                        </button>
                        <button
                            onClick={onChangeToCustomer}
                            className={cx('button')}
                        >
                            <li className={cx('page-list-item')}>
                                <span className={cx('link-router')}>
                                    Quan li khach hang
                                </span>
                            </li>
                        </button>
                        <button
                            onClick={onChangeToOrder}
                            className={cx('button')}
                        >
                            <li className={cx('page-list-item')}>
                                <span to="/about" className={cx('link-router')}>
                                    Quan li don hang
                                </span>
                            </li>
                        </button>
                    </ul>
                </div>
                <div className={cx('actions')}>
                    <div className={cx('actions-items')}>
                        <div>
                            <Link to="/" className={cx('link-router')}>
                                <span className={cx('sign-out')}>
                                    Đăng xuất
                                </span>
                                <FontAwesomeIcon icon={faSignOut} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
        </header>
    );
}

export default HeaderAdmin;
