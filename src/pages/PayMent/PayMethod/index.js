import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './PayMethod.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

function PayMethod() {
    const auth = useAuth();

    return (
        <Fragment>
            <h3>MobileX</h3>
            <span className={cx('container-sub')}>
                Cart {'>'} Information {'>'}{' '}
                <span className={cx('scale-item')}>Pay method </span>
            </span>
            <div className={cx('container-item')}>
                <div className={cx('item-changed')}>
                    <div>
                        <span>Contact</span>
                        <span>{auth.userInfo.sdt}</span>
                    </div>
                    <button>
                        <Link to="/profile" className={cx('link-router')}>
                            Change
                        </Link>
                    </button>
                </div>
                <div className={cx('item-changed')}>
                    <div>
                        <span>Address</span>
                        <span>{auth.userInfo.diachi}</span>
                    </div>
                    <button>
                        <Link to="/profile" className={cx('link-router')}>
                            Change
                        </Link>
                    </button>
                </div>
            </div>

            <div className={cx('breadcrums')}></div>
            <div className={cx('container-item')}>
                <p>Pay Method</p>
                <div>
                    <input type="checkbox" />
                    <label> Paying after receive </label>
                    <p>
                        Notice: You will have a call from assistant to check out
                    </p>
                </div>
                <div>
                    <input type="checkbox" />
                    <label> Paying before receive </label>
                    <p>Banking </p>
                    <p>Agribank</p>
                    <p>7805205071577</p>
                    <p>Le Minh Hieu</p>
                    <p>
                        Take a note in content sending : Your name + your phone
                        number
                    </p>
                </div>
            </div>

            <div className={cx('container-button')}>
                <div className={cx('return')}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <Link to="/cart" className={cx('link-router')}>
                        <span> Return to Cart</span>
                    </Link>
                </div>
                <div className={cx('button')}>
                    <button>
                        <span>Agree</span>
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

export default PayMethod;
