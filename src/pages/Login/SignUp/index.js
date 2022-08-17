import style from './SignUp.module.scss';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import validator from '~/utils/validator.utils';

import { useState } from 'react';

const cx = classNames.bind(style);

function SignUp({ alert, setAlert }) {
    const [data, setData] = useState({
        tentk: '',
        matkhau: '',
        matkhau2: '',
        email: '',
        sdt: '',
    });
    const [isValid, setIsValid] = useState({
        tentk: true,
        matkhau: true,
        matkhau2: true,
        email: true,
        sdt: true,
    });
    const [show, setShow] = useState({
        pass: false,
        rePass: false,
    });

    const createSubmit = async () => {
        const { tentk, matkhau, email, sdt } = data;
        const url = 'http://localhost:2222/api/user/signUp/';
        const opt = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tentk: tentk,
                matkhau: matkhau,
                email: email,
                sdt: sdt,
            }),
        };
        const isTrueInfo = [...new Set(Object.values(isValid))][0];
        if (isTrueInfo) {
            const sendInfo = await fetch(url, opt);
            const result = await sendInfo.json();

            if (sendInfo.status === 501) {
                setAlert({
                    type: 'error',
                    show: true,
                    message: result.mess,
                });
            } else {
                setAlert({
                    type: 'success',
                    show: true,
                    message: 'Sign in successed',
                });
                // setData({
                //     tentk: '',
                //     matkhau: '',
                //     matkhau2: '',
                //     email: '',
                //     sdt: '',
                // });
            }
        } else {
            setAlert({
                type: 'error',
                show: true,
                message: 'thong tin chua chinh xac',
            });
        }
    };
    return (
        <div className={cx('container-right')}>
            <div className={cx('container-left-title')}>
                <span>Sign Up</span>
            </div>
            <p className={cx('container-hint')}>
                Create an account for faster checkout
            </p>
            <div className={cx('container-left-main')}>
                <div
                    className={cx('container-left-main-item', {
                        invalid: !isValid.tentk,
                    })}
                >
                    <p>Username</p>
                    <input
                        type="text"
                        value={data.tentk}
                        onBlur={(e) => {
                            setIsValid({
                                ...isValid,
                                tentk: validator.userName(e.target.value),
                            });
                        }}
                        onInput={(e) => {
                            setIsValid({ ...isValid, tentk: true });
                        }}
                        onChange={(e) =>
                            setData({
                                ...data,
                                tentk: e.target.value.replace(/\s/g, ''),
                            })
                        }
                        placeholder="Username"
                    />
                </div>
                <div
                    className={cx('container-left-main-item', {
                        invalid: !isValid.email,
                    })}
                >
                    <p>Email</p>
                    <input
                        value={data.email}
                        onBlur={(e) => {
                            setIsValid({
                                ...isValid,
                                email: validator.email(e.target.value),
                            });
                        }}
                        onInput={(e) => {
                            setIsValid({ ...isValid, email: true });
                        }}
                        onChange={(e) =>
                            setData({
                                ...data,
                                email: e.target.value.replace(/\s/g, ''),
                            })
                        }
                        placeholder="Email"
                    />
                </div>
                <div
                    className={cx('container-left-main-item', {
                        invalid: !isValid.sdt,
                    })}
                >
                    <p>Phone Number</p>
                    <input
                        value={data.sdt}
                        onBlur={(e) => {
                            setIsValid({
                                ...isValid,
                                sdt: validator.phoneNumber(e.target.value),
                            });
                        }}
                        onInput={(e) => {
                            setIsValid({ ...isValid, sdt: true });
                        }}
                        onChange={(e) =>
                            setData({
                                ...data,
                                sdt: e.target.value.replace(/\s/g, ''),
                            })
                        }
                        placeholder="Phone Number"
                    />
                </div>
                <div
                    className={cx('container-left-main-item', {
                        invalid: !isValid.matkhau,
                    })}
                >
                    <p>Password</p>
                    <input
                        type={show.pass ? 'text' : 'password'}
                        value={data.matkhau}
                        onBlur={(e) => {
                            setIsValid({
                                ...isValid,
                                matkhau: validator.checkLength(e.target.value),
                            });
                        }}
                        onInput={(e) => {
                            setIsValid({ ...isValid, matkhau: true });
                        }}
                        onChange={(e) =>
                            setData({
                                ...data,
                                matkhau: e.target.value.replace(/\s/g, ''),
                            })
                        }
                        placeholder="Password length > 6 digit"
                    />
                    {show.pass ? (
                        <button
                            className={cx('button-eye')}
                            onClick={(_) => {
                                setShow({ ...show, pass: false });
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faEyeSlash}
                                className={cx('icon')}
                            />
                        </button>
                    ) : (
                        <button
                            className={cx('button-eye')}
                            onClick={(_) => {
                                setShow({ ...show, pass: true });
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faEye}
                                className={cx('icon')}
                            />
                        </button>
                    )}
                </div>
                <div
                    className={cx('container-left-main-item', {
                        invalid: !isValid.matkhau2,
                    })}
                >
                    <p>Confirm Password</p>
                    <input
                        type={show.rePass ? 'text' : 'password'}
                        value={data.matkhau2}
                        onBlur={(e) => {
                            setIsValid({
                                ...isValid,
                                matkhau2:
                                    validator.compare(
                                        data.matkhau,
                                        e.target.value,
                                    ) && e.target.value != '',
                            });
                        }}
                        onInput={(e) => {
                            setIsValid({ ...isValid, matkhau2: true });
                        }}
                        onChange={(e) =>
                            setData({
                                ...data,
                                matkhau2: e.target.value.replace(/\s/g, ''),
                            })
                        }
                        placeholder="Confirm Password"
                    />
                    {show.rePass ? (
                        <button
                            className={cx('button-eye1')}
                            onClick={(_) => {
                                setShow({ ...show, rePass: false });
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faEyeSlash}
                                className={cx('icon1')}
                            />
                        </button>
                    ) : (
                        <button
                            className={cx('button-eye1')}
                            onClick={(_) => {
                                setShow({ ...show, rePass: true });
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faEye}
                                className={cx('icon1')}
                            />
                        </button>
                    )}
                </div>
                {
                    <div className={cx('button')}>
                        <button
                            onClick={() => {
                                createSubmit();
                            }}
                        >
                            SIGN UP
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}

export default SignUp;
