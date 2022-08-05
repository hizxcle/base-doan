import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faInstagram,
    faLinkedinIn,
    faPinterest,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('container-top')}>
                    <img
                        className={cx('top-img')}
                        src="https://cdn.shopify.com/s/files/1/0453/5035/5103/files/img_02_130x30_crop_center.png?v=1644318438"
                        alt="Anh logo"
                    />
                    <p className={cx('text-top')}>Computer Shop</p>
                </div>
                <div className={cx('container-mid')}>
                    <div className={cx('mid-item')}>
                        <ul className={cx('list-item')}>
                            <li className={cx('item')}>About Us</li>
                            <li className={cx('item')}>Contact Us</li>
                            <li className={cx('item')}>Blog</li>
                            <li className={cx('item')}>Privacy Policy</li>
                        </ul>
                    </div>
                    <div className={cx('mid-item2')}>
                        <input
                            placeholder="Email address"
                            className={cx('input')}
                        />
                        <button className={cx('input-button')}>
                            SUBSCRIBE
                        </button>
                    </div>
                    <div className={cx('mid-item')}>
                        <ul className={cx('list-item')}>
                            <li className={cx('item')}>FAQ's</li>
                            <li className={cx('item')}>Terms</li>
                            <li className={cx('item')}>Delivery Info</li>
                            <li className={cx('item')}>Rufund Policy</li>
                        </ul>
                    </div>
                </div>
                <div className={cx('container-bot')}>
                    <div className={cx('icon-wrap')}>
                        <ul className={cx('list-icon')}>
                            <li className={cx('icon-item')}>
                                <FontAwesomeIcon icon={faFacebookF} />
                            </li>
                            <li className={cx('icon-item')}>
                                <FontAwesomeIcon icon={faYoutube} />
                            </li>
                            <li className={cx('icon-item')}>
                                <FontAwesomeIcon icon={faInstagram} />
                            </li>
                            <li className={cx('icon-item')}>
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </li>
                            <li className={cx('icon-item')}>
                                <FontAwesomeIcon icon={faPinterest} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('last-text')}>
                    {' '}
                    Copyright MobileX, Dev by Hieu & Phu
                </div>
            </div>
        </div>
    );
}

export default Footer;
