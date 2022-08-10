import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './Info.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Info() {
    return (
        <Fragment>
            <h3>MobileX</h3>
            <span className={cx('container-sub')}>
                Cart {'>'} <span className={cx('scale-item')}>Information</span>{' '}
                {'>'} Pay method{' '}
            </span>
            <div className={cx('container-item')}>
                <p>Contact information</p>
                <p className={cx('container-item-sub')}>
                    Already have an account?{' '}
                    <Link to="/login" className={cx('link-router')}>
                        <span> Log in</span>
                    </Link>
                </p>
            </div>
            <div className={cx('container-item')}>
                <input type="text" placeholder="Email" />
            </div>
            <div className={cx('container-item')}>
                <input type="text" placeholder="Phone Number" />
            </div>
            <input type="checkbox" /> <span>Email me with news and offers</span>
            <div className={cx('breadcrums')}></div>
            <div className={cx('container-item')}>
                <p>Shipping address</p>
            </div>
            <div className={cx('container-item')}>
                <label>Country/region</label>
                <select>
                    <option selected>VietNam</option>
                </select>
            </div>
            <div className={cx('container-item')}>
                <input type="text" placeholder="Full Name" />
            </div>
            <div className={cx('container-item')}>
                <input type="text" placeholder="Address" />
            </div>
            <div className={cx('container-item')}>
                <textarea type="text" placeholder="Note" />
            </div>
            <div className={cx('container-button')}>
                <div className={cx('return')}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <Link to="/cart" className={cx('link-router')}>
                        <span> Return to Cart</span>
                    </Link>
                </div>
                <div className={cx('button')}>
                    <Link to="/paymethod">
                        <button>
                            <span>Continue</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </Link>
                </div>
            </div>
        </Fragment>
    );
}

export default Info;
