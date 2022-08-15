import { memo, useState } from 'react';
import validator from '~/utils/validator.utils';
import classNames from 'classnames/bind';
import styles from './ChangePasswd.module.scss';
const cx = classNames.bind(styles);
const ChangePasswd = ({ savePass, setEdit }) => {
    const [isValid, setIsValid] = useState({
        old: true,
        new: true,
        re: true,
    });
    const [show, setShow] = useState({ old: false, new: false, re: false });
    const [data, SetData] = useState({ oldPass: '', newPass: '', rePass: '' });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('item')}>
                <label className="item-label">mat khau cu</label>
                <input
                    type={show.old ? 'text' : 'password'}
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
                        show.old
                            ? setShow({ ...show, old: false })
                            : setShow({ ...show, old: true });
                    }}
                >
                    {show.old ? 'hide' : 'show'}
                </span>
                <span>
                    {!isValid.old ? 'do dai mat khau duoi 6 ky tu' : ' '}
                </span>
            </div>
            <div className={cx('item')}>
                <label className="item-label">mat khau moi</label>
                <input
                    type={show.new ? 'text' : 'password'}
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
                        show.new
                            ? setShow({ ...show, new: false })
                            : setShow({ ...show, new: true });
                    }}
                >
                    {show.new ? 'hide' : 'show'}
                </span>
                <span>
                    {validator.compare(data.newPass, data.oldPass)
                        ? 'mat khau trung voi mat khau cu'
                        : !isValid.new
                        ? 'do dai mat khau duoi 6 ky tu'
                        : ' '}
                </span>
            </div>
            <div className={cx('item')}>
                <label className="item-label">nhap lai mat khau</label>
                <input
                    type={show.re ? 'text' : 'password'}
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
                            re: validator.compare(data.newPass, e.target.value),
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
                        return show.re
                            ? setShow({ ...show, re: false })
                            : setShow({ ...show, re: true });
                    }}
                >
                    {show.re ? 'hide' : 'show'}
                </span>
                <span>{!isValid.re ? 'mat khau khong trung hop' : ' '}</span>
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
                        save
                    </button>
                )}
                <button
                    onClick={() => {
                        setEdit('view');
                    }}
                >
                    cancel
                </button>
            </div>
        </div>
    );
};

export default memo(ChangePasswd);
