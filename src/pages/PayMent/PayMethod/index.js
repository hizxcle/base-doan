import classNames from 'classnames/bind';
import { Fragment, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PayMethod.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import useAuth from '~/hooks/useAuth';
import Alert from '~/components/infoModals/AlertNotify';
import validator from '~/utils/validator.utils';

const cx = classNames.bind(styles);

function PayMethod({ data, action, setShowAlertW }) {
    const [isValid, setIsValid] = useState({
        ten: true,
        sdt: true,
        diachi: true,
    });
    const [alert, setAlert] = useState({
        type: '',
        show: false,
        message: '',
    });
    const auth = useAuth();

    return (
        <Fragment>
            <h3>MobileX</h3>
            {alert.show && <Alert alert={alert} setAlert={setAlert} />}
            <span className={cx('container-sub')}>
                Cart {'>'} Information {'>'}{' '}
                <span className={cx('scale-item')}>Pay method </span>
            </span>
            <div className={cx('container-item')}>
                <div className={cx('item-changed')}>
                    <div>
                        <p>Full name</p>
                        <input
                            value={data?.hoten || ''}
                            onInput={() => {
                                setIsValid({ ...isValid, ten: true });
                            }}
                            onChange={(e) => {
                                action({
                                    ...data,
                                    hoten: e.target.value,
                                });
                            }}
                            onBlur={(e) => {
                                setIsValid({
                                    ...isValid,
                                    ten: e.target.value !== '',
                                });
                            }}
                        />
                    </div>
                </div>
                <div className={cx('item-changed')}>
                    <div>
                        <p>Phone number</p>
                        <input
                            value={data?.sdt || ''}
                            onInput={() => {
                                setIsValid({ ...isValid, sdt: true });
                            }}
                            onChange={(e) => {
                                action({ ...data, sdt: e.target.value.trim() });
                            }}
                            onBlur={(e) => {
                                setIsValid({
                                    ...isValid,
                                    sdt: validator.phoneNumber(e.target.value),
                                });
                            }}
                        />
                    </div>
                </div>
                <div className={cx('item-changed')}>
                    <div>
                        <p>Address</p>
                        <input
                            value={data?.diachi || ''}
                            onInput={() => {
                                setIsValid({ ...isValid, sdt: true });
                            }}
                            onChange={(e) => {
                                action({
                                    ...data,
                                    diachi: e.target.value,
                                });
                            }}
                            onBlur={(e) => {
                                setIsValid({
                                    ...isValid,
                                    diachi: e.target.value !== '',
                                });
                            }}
                        />
                    </div>
                </div>
                <div className={cx('item-changed')}>
                    <div>
                        <p>Note</p>
                        <textarea
                            placeholder="note some things"
                            value={data?.ghichu || ''}
                            onChange={(e) => {
                                console.log('paymethod', data);
                                action({ ...data, ghichu: e.target.value });
                            }}
                        ></textarea>
                    </div>
                </div>
                <span>Note : You can change your delivery address here </span>
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
                    <button
                        onClick={() => {
                            console.log('check', isValid);
                            const isEnough =
                                data?.hoten?.length > 0 &&
                                data?.sdt?.length > 0 &&
                                data?.diachi?.length > 0;
                            const isTrueInfo =
                                !Object.values(isValid).includes(false);
                            if (isEnough && isTrueInfo) {
                                setShowAlertW(true);
                            } else {
                                setAlert({
                                    type: 'warning',
                                    show: true,
                                    message:
                                        'have problem with order info, please review info',
                                });
                            }
                        }}
                    >
                        <span>Agree</span>
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

export default memo(PayMethod);
