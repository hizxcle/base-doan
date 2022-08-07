import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '~/Services';
import useAuth from '~/hooks/useAuth';
import style from './Login.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);
const Login = () => {
    const [showPass, setShowPass] = useState(false);

    const [alert, setAlert] = useState({
        show: false,
        type: '',
        message: '',
    });
    const [inputValue, setInputValue] = useState({
        tentk: '',
        matkhau: '',
    });
    const auth = useAuth();
    const navigate = useNavigate();

    const handleShowPass = () => {
        setShowPass(true);
    };
    const handleHidePass = () => {
        setShowPass(false);
    };

    const handleSubmit = async () => {
        if (!inputValue.tentk || !inputValue.matkhau) {
            setAlert({
                type: 'error',
                show: true,
                message: 'Tài khoản, mật khẩu không được trống',
            });

            return;
        }
        console.log('input val', inputValue);
        const response = await userApi('login', inputValue);
        const json = await response.json();
        console.log('thong tin user', json);
        if (response.status === 200) {
            auth.setState(true, json.token, { Quyen: json.role, ...json.info });
            console.log('auth login', auth.isLogin);
            if (json.role === 'admin') {
                navigate('/adminlayout', { replace: true });
                return;
            }
            navigate(-1);
        } else {
            setAlert({
                type: 'error',
                show: true,
                message: json.message,
            });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('breadcrums')}>
                <Link to="/" className={cx('link-router')}>
                    <span>Home </span>
                </Link>
                / <span>Account /</span>
            </div>
            <div className={cx('banner')}>
                <h2>Login</h2>
            </div>
            <div className={cx('container')}>
                <div className={cx('container-left')}>
                    <div className={cx('container-left-title')}>
                        <span> Sign In</span>
                    </div>
                    <div className={cx('container-left-main')}>
                        <div className={cx('container-left-main-item')}>
                            <p>Username</p>
                            <input
                                type="text"
                                name="usernameLogin"
                                value={inputValue.tentk}
                                onChange={(e) =>
                                    setInputValue({
                                        ...inputValue,
                                        tentk: e.target.value,
                                    })
                                }
                                placeholder="Text"
                            />
                        </div>
                        <div className={cx('container-left-main-item')}>
                            <p>Password</p>
                            <input
                                type={showPass ? 'password' : 'text'}
                                name="passwordLogin"
                                value={inputValue.matkhau}
                                onChange={(e) =>
                                    setInputValue({
                                        ...inputValue,
                                        matkhau: e.target.value,
                                    })
                                }
                                placeholder="Password"
                            />
                            {showPass ? (
                                <button
                                    className={cx('button-eye')}
                                    onClick={handleHidePass}
                                >
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={cx('icon')}
                                    />
                                </button>
                            ) : (
                                <button
                                    className={cx('button-eye')}
                                    onClick={handleShowPass}
                                >
                                    <FontAwesomeIcon
                                        icon={faEyeSlash}
                                        className={cx('icon')}
                                    />
                                </button>
                            )}
                        </div>
                        <div className={cx('button')}>
                            <button onClick={handleSubmit}>SIGN IN</button>
                        </div>
                        <div className={cx('forgot')}>
                            <span>FORGOT YOUR PASSWORD?</span>
                        </div>
                    </div>
                </div>
                <div className={cx('container-right')}>
                    <div className={cx('container-left-title')}>
                        <span>Sign Up</span>
                    </div>
                    <p className={cx('container-hint')}>
                        Create an account for faster checkout
                    </p>
                    <div className={cx('container-left-main')}>
                        <div className={cx('container-left-main-item')}>
                            <p>Username</p>
                            <input
                                type="text"
                                name="usernameLogin"
                                value={inputValue.tentk}
                                onChange={(e) =>
                                    setInputValue({
                                        ...inputValue,
                                        tentk: e.target.value,
                                    })
                                }
                                placeholder="Text"
                            />
                        </div>
                        <div className={cx('container-left-main-item')}>
                            <p>Email</p>
                            <input
                                name="passwordLogin"
                                value={inputValue.matkhau}
                                onChange={(e) =>
                                    setInputValue({
                                        ...inputValue,
                                        matkhau: e.target.value,
                                    })
                                }
                                placeholder="Password"
                            />
                        </div>
                        <div className={cx('container-left-main-item')}>
                            <p>Phone Number</p>
                            <input
                                name="passwordLogin"
                                value={inputValue.matkhau}
                                onChange={(e) =>
                                    setInputValue({
                                        ...inputValue,
                                        matkhau: e.target.value,
                                    })
                                }
                                placeholder="Password"
                            />
                        </div>
                        <div className={cx('container-left-main-item')}>
                            <p>Password</p>
                            <input
                                type="password"
                                name="passwordLogin"
                                value={inputValue.matkhau}
                                onChange={(e) =>
                                    setInputValue({
                                        ...inputValue,
                                        matkhau: e.target.value,
                                    })
                                }
                                placeholder="Password"
                            />
                            {showPass ? (
                                <button
                                    className={cx('button-eye')}
                                    onClick={handleHidePass}
                                >
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={cx('icon')}
                                    />
                                </button>
                            ) : (
                                <button
                                    className={cx('button-eye')}
                                    onClick={handleShowPass}
                                >
                                    <FontAwesomeIcon
                                        icon={faEyeSlash}
                                        className={cx('icon')}
                                    />
                                </button>
                            )}
                        </div>
                        <div className={cx('container-left-main-item')}>
                            <p>Confirm Password</p>
                            <input
                                type="password"
                                name="passwordLogin"
                                value={inputValue.matkhau}
                                onChange={(e) =>
                                    setInputValue({
                                        ...inputValue,
                                        matkhau: e.target.value,
                                    })
                                }
                                placeholder="Password"
                            />
                            {showPass ? (
                                <button
                                    className={cx('button-eye')}
                                    onClick={handleHidePass}
                                >
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={cx('icon')}
                                    />
                                </button>
                            ) : (
                                <button
                                    className={cx('button-eye')}
                                    onClick={handleShowPass}
                                >
                                    <FontAwesomeIcon
                                        icon={faEyeSlash}
                                        className={cx('icon')}
                                    />
                                </button>
                            )}
                        </div>
                        <div className={cx('button')}>
                            <button onClick={handleSubmit}>SIGN UP</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
