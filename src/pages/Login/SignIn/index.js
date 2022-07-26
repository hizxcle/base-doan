import style from './SignIn.module.scss';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

import Alert from '~/components/infoModals/AlertNotify';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

function SignIn({ setInputValue, inputValue, handleSubmit, alert, setAlert }) {
    const [showPass, setShowPass] = useState(false);

    const handleShowPass = () => {
        setShowPass(true);
    };
    const handleHidePass = () => {
        setShowPass(false);
    };
    return (
        <div className={cx('container-left')}>
            {alert.show && <Alert alert={alert} setAlert={setAlert} />}
            <div className={cx('container-left-title')}>
                <span> Sign In</span>
            </div>
            <div className={cx('container-left-main')}>
                <div className={cx('container-left-main-item')}>
                    <p>Username or Email</p>
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
                        type={showPass ? 'text' : 'password'}
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
                                icon={faEyeSlash}
                                className={cx('icon')}
                            />
                        </button>
                    ) : (
                        <button
                            className={cx('button-eye')}
                            onClick={handleShowPass}
                        >
                            <FontAwesomeIcon
                                icon={faEye}
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
    );
}

export default SignIn;
