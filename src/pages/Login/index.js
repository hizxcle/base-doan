import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '~/Services';
import useAuth from '~/hooks/useAuth';
import style from './Login.module.scss';
import classNames from 'classnames/bind';

import SignIn from './SignIn';
import SignUp from './SignUp';
const cx = classNames.bind(style);
const Login = () => {
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
                <SignIn
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                    handleSubmit={handleSubmit}
                />
                <SignUp setInputValue={setInputValue} inputValue={inputValue} />
            </div>
        </div>
    );
};

export default Login;
