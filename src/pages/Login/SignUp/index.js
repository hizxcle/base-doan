import style from './SignUp.module.scss';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

const cx = classNames.bind(style);

function SignUp({ setInputValue, inputValue, handleSubmit }) {
    const [showPass, setShowPass] = useState(false);
    const [showPass1, setShowPass1] = useState(false);

    const handleShowPass = () => {
        setShowPass(true);
    };
    const handleHidePass = () => {
        setShowPass(false);
    };

    const handleShowPass1 = () => {
        setShowPass1(true);
    };
    const handleHidePass1 = () => {
        setShowPass1(false);
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
                <div className={cx('container-left-main-item')}>
                    <p>Username</p>
                    <input
                        type="text"
                        // name="usernameLogin"
                        // value={inputValue.tentk}
                        // onChange={(e) =>
                        //     setInputValue({
                        //         ...inputValue,
                        //         tentk: e.target.value,
                        //     })}
                        placeholder="Username"
                    />
                </div>
                <div className={cx('container-left-main-item')}>
                    <p>Email</p>
                    <input
                        // name="passwordLogin"
                        // value={inputValue.matkhau}
                        // onChange={(e) =>
                        //     setInputValue({
                        //         ...inputValue,
                        //         matkhau: e.target.value,
                        //     })
                        // }
                        placeholder="Email"
                    />
                </div>
                <div className={cx('container-left-main-item')}>
                    <p>Phone Number</p>
                    <input
                        // name="passwordLogin"
                        // value={inputValue.matkhau}
                        // onChange={(e) =>
                        //     setInputValue({
                        //         ...inputValue,
                        //         matkhau: e.target.value,
                        //     })
                        // }
                        placeholder="Phone Number"
                    />
                </div>
                <div className={cx('container-left-main-item')}>
                    <p>Password</p>
                    <input
                        type={showPass ? 'password' : 'text'}
                        name="passwordLogin"
                        // value={inputValue.matkhau}
                        // onChange={(e) =>
                        //     setInputValue({
                        //         ...inputValue,
                        //         matkhau: e.target.value,
                        //     })
                        // }
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
                        type={showPass1 ? 'password' : 'text'}
                        name="passwordLogin"
                        // value={inputValue.matkhau}
                        // onChange={(e) =>
                        //     setInputValue({
                        //         ...inputValue,
                        //         matkhau: e.target.value,
                        //     })
                        // }
                        placeholder="Confirm Password"
                    />
                    {showPass1 ? (
                        <button
                            className={cx('button-eye1')}
                            onClick={handleHidePass1}
                        >
                            <FontAwesomeIcon
                                icon={faEye}
                                className={cx('icon1')}
                            />
                        </button>
                    ) : (
                        <button
                            className={cx('button-eye1')}
                            onClick={handleShowPass1}
                        >
                            <FontAwesomeIcon
                                icon={faEyeSlash}
                                className={cx('icon1')}
                            />
                        </button>
                    )}
                </div>
                <div className={cx('button')}>
                    <button onClick={handleSubmit}>SIGN UP</button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
