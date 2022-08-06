import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Login.scss';
import { userApi } from '~/Services';
import useAuth from '~/hooks/useAuth';
import classNames from 'classnames/bind';
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
        <div className="wrapper__form">
            <div className="head__form">
                {/* <div className="img__logo"><img alt="1"></div> */}
                <span> Đăng nhập</span>
            </div>
            {/* <div className="error__message hidden " id="err__login"></div> */}
            <div className="form__content" id="form__login">
                <div className="content__form--group ">
                    <input
                        type="text"
                        name="usernameLogin"
                        className="content__form--input"
                        value={inputValue.tentk}
                        onChange={(e) =>
                            setInputValue({
                                ...inputValue,
                                tentk: e.target.value,
                            })
                        }
                        placeholder="Tên đăng nhập"
                    />
                </div>
                <div className="content__form--group">
                    <input
                        type="password"
                        name="passwordLogin"
                        className="content__form--input"
                        value={inputValue.matkhau}
                        onChange={(e) =>
                            setInputValue({
                                ...inputValue,
                                matkhau: e.target.value,
                            })
                        }
                        placeholder="Mật khẩu"
                    />
                </div>
                <div className="content__form--group " id="btn">
                    <button
                        className="btn"
                        id="btn-submit"
                        onClick={handleSubmit}
                    >
                        Đăng nhập
                    </button>
                </div>
                <div className="content__form--group form__footer">
                    <p>
                        Chưa có tài khoản?{' '}
                        <span className="switch__modal switch__modal-regis">
                            <Link to="/account/register">Đăng ký</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
