import { memo, useState } from 'react';
import validator from '~/utils/validator.utils';
import classNames from 'classnames/bind';
import styles from './ChangePasswd.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const ChangePasswd = ({ savePass, setEdit }) => {
    const [isValid, setIsValid] = useState({
        old: true,
        new: true,
        re: true,
    });
    const [show1, setShow1] = useState({ old: false, new: false, re: false });
    const [show2, setShow2] = useState({ old: false, new: false, re: false });
    const [show3, setShow3] = useState({ old: false, new: false, re: false });

    const [data, SetData] = useState({ oldPass: '', newPass: '', rePass: '' });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('item')}>
                    <label className="item-label">Current Password</label>
                    <input
                        type={show1.old ? 'text' : 'password'}
                        className={cx('old-passwd', 'control-item', {
                            valid: isValid.old,
                            invalid: !isValid.old,
                        })}
                        onChange={(e) => {
                            SetData({
                                ...data,
                                oldPass: e.target.value.replace(/\s/g, ''),
                            });
                        }}
                        onInput={(e) => {
                            return setIsValid({ ...isValid, old: true });
                        }}
                        onBlur={(e) => {
                            setIsValid({
                                ...isValid,
                                old: validator.checkLength(e.target.value),
                            });
                        }}
                        value={data?.oldPass}
                    />
                    <span
                        onClick={() => {
                            show1.old
                                ? setShow1({ ...show1, old: false })
                                : setShow1({ ...show1, old: true });
                        }}
                    >
                        {show1.old ? (
                            <FontAwesomeIcon
                                icon={faEyeSlash}
                                className={cx('icon')}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faEye}
                                className={cx('icon')}
                            />
                        )}
                    </span>
                </div>
                <div>
                    <span className={cx('invalid-text')}>
                        {!isValid.old ? 'do dai mat khau duoi 6 ky tu' : ' '}
                    </span>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('item')}>
                    <label className="item-label">Your new password</label>
                    <input
                        type={show2.new ? 'text' : 'password'}
                        className={cx('old-passwd', 'control-item', {
                            valid: isValid.new,
                            invalid: !isValid.new,
                        })}
                        onInput={(e) => {
                            return setIsValid({ ...isValid, new: true });
                        }}
                        onBlur={(e) => {
                            setIsValid({
                                ...isValid,
                                new:
                                    validator.checkLength(e.target.value) &&
                                    !validator.compare(
                                        data.oldPass,
                                        e.target.value,
                                    ),
                            });
                        }}
                        onChange={(e) => {
                            SetData({
                                ...data,
                                newPass: e.target.value.replace(/\s/g, ' '),
                            });
                        }}
                        value={data?.newPass}
                    />
                    <span
                        onClick={() => {
                            show2.new
                                ? setShow2({ ...show2, new: false })
                                : setShow2({ ...show2, new: true });
                        }}
                    >
                        {show2.new ? (
                            <FontAwesomeIcon
                                icon={faEyeSlash}
                                className={cx('icon')}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faEye}
                                className={cx('icon')}
                            />
                        )}
                    </span>
                </div>
                <div>
                    <span className={cx('invalid-text')}>
                        {validator.compare(data.newPass, data.oldPass)
                            ? 'mat khau trung voi mat khau cu'
                            : !isValid.new
                            ? 'do dai mat khau duoi 6 ky tu'
                            : ' '}
                    </span>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('item')}>
                    <label className="item-label">Re-enter your password</label>
                    <input
                        type={show3.re ? 'text' : 'password'}
                        className={cx('re-passwd', 'control-item', {
                            valid: isValid.re,
                            invalid: isValid.re,
                        })}
                        onInput={(e) => {
                            return setIsValid({ ...isValid, re: true });
                        }}
                        onBlur={(e) => {
                            setIsValid({
                                ...isValid,
                                re: validator.compare(
                                    data.newPass,
                                    e.target.value,
                                ),
                            });
                        }}
                        onChange={(e) => {
                            SetData({
                                ...data,
                                rePass: e.target.value.replace(/\s/g, ''),
                            });
                        }}
                        value={data.rePass}
                    />
                    <span
                        onClick={() => {
                            return show3.re
                                ? setShow3({ ...show3, re: false })
                                : setShow3({ ...show3, re: true });
                        }}
                    >
                        {show3.re ? (
                            <FontAwesomeIcon
                                icon={faEyeSlash}
                                className={cx('icon')}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faEye}
                                className={cx('icon')}
                            />
                        )}
                    </span>
                </div>
                <div>
                    <span className={cx('invalid-text')}>
                        {!isValid.re ? 'mat khau khong trung hop' : ' '}
                    </span>
                </div>
            </div>
            <div className={cx('action')}>
                {!Object.values(isValid).includes(false) && (
                    <button
                        onClick={() => {
                            savePass({
                                oldPass: data.oldPass,
                                newPass: data.newPass,
                            });
                        }}
                    >
                        Save
                    </button>
                )}
                <button
                    onClick={() => {
                        setEdit('view');
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default memo(ChangePasswd);
