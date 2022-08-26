import { memo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import useAuth from '~/hooks/useAuth';
import Alert from '~/components/infoModals/AlertNotify';
import validator from '~/utils/validator.utils';
const cx = classNames.bind(styles);
function EditItem({ data, action, setEdit }) {
    const auth = useAuth();
    const [isValid, setIsValid] = useState({
        sdt: true,
        email: true,
    });
    const [alert, setAlert] = useState({
        type: '',
        message: '',
        show: false,
    });
    const [input, setInput] = useState({
        hoten: data.hoten || '',
        gioitinh: Number(data.gioitinh),
        ngaysinh: data.ngaysinh || '',
        sdt: data.sdt || '',
        email: data.email || '',
        diachi: data.diachi || '',
    });

    const handleShowEdit = () => {
        setEdit('view');
    };

    const saveInfo = () => {
        const opt = {
            method: 'put',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(
            `http://localhost:2222/api/user/updateInfo/${auth.userInfo.manguoidung}`,
            opt,
        )
            .then((res) => res.json)
            .then((res) => {
                auth.setUserInfo({
                    ...input,
                    Quyen: auth.userInfo.Quyen,
                    tentk: auth.userInfo.tentk,
                    manguoidung: auth.userInfo.manguoidung,
                });
                action(input);
            });
        setAlert({
            type: 'success',
            show: true,
            message: 'Edit completed',
        });
    };
    return (
        <div className={cx('wrapper')}>
            {alert.show && <Alert alert={alert} setAlert={setAlert} />}
            <div className={cx('container')}>
                <div className={cx('item')}>
                    <p className={cx('item-desc')}>Full name :</p>
                    <input
                        className={cx('item-val')}
                        value={input.hoten || ''}
                        onChange={(e) => {
                            setInput({
                                ...input,
                                hoten: validator.firstSpace(e.target.value),
                            });
                        }}
                    />
                </div>
                <div className={cx('item')}>
                    <p className={cx('item-desc')}>Gender :</p>
                    <span className={cx('item-radio')}>
                        <input
                            name="gender"
                            id="male-gender"
                            value="1"
                            className={cx('item-val')}
                            type="radio"
                            checked={input.gioitinh == 1}
                            onChange={(e) =>
                                setInput({
                                    ...input,
                                    gioitinh: e.target.value,
                                })
                            }
                        />
                        <label
                            className={cx('gender-label')}
                            htmlFor="male-gender"
                        >
                            Male
                        </label>
                    </span>
                    <span className={cx('item-radio')}>
                        <input
                            name="gender"
                            id="female-gender"
                            value="0"
                            className={cx('item-val')}
                            type="radio"
                            checked={input.gioitinh == 0}
                            onChange={(e) => {
                                return setInput({
                                    ...input,
                                    gioitinh: e.target.value,
                                });
                            }}
                        />
                        <label
                            className={cx('gender-label')}
                            htmlFor="female-gender"
                        >
                            Female
                        </label>
                    </span>
                    <span className={cx('item-radio')}>
                        <input
                            name="gender"
                            id="other-gender"
                            value="3"
                            className={cx('item-val')}
                            type="radio"
                            checked={![1, 0].includes(input.gioitinh)}
                            onChange={(e) => {
                                return setInput({
                                    ...input,
                                    gioitinh: e.target.value,
                                });
                            }}
                        />
                        <label
                            className={cx('gender-label')}
                            htmlFor="other-gender"
                        >
                            Other
                        </label>
                    </span>
                </div>

                <div className={cx('item')}>
                    <p className={cx('item-desc')}>Date of birth :</p>
                    <input
                        type="date"
                        className={cx('item-val')}
                        value={input.ngaysinh}
                        onChange={(e) => {
                            return setInput({
                                ...input,
                                ngaysinh: e.target.value,
                            });
                        }}
                    />
                </div>

                <div className={cx('item')}>
                    <p className={cx('item-desc')}>Phone :</p>
                    <input
                        type="text"
                        className={cx('item-val', { invalid: !isValid.sdt })}
                        onBlur={(e) =>
                            setIsValid({
                                ...isValid,
                                sdt:
                                    e.target.value === ''
                                        ? true
                                        : validator.phoneNumber(e.target.value),
                            })
                        }
                        onInput={(e) => setIsValid({ ...isValid, sdt: true })}
                        value={input.sdt || ''}
                        placeholder="Phone number ten digits, please"
                        onChange={(e) => {
                            return setInput({
                                ...input,
                                sdt: validator.onlyNumber(e.target.value),
                            });
                        }}
                    />
                </div>

                <div className={cx('item')}>
                    <p className={cx('item-desc')}>Email :</p>
                    <input
                        type="email"
                        className={cx('item-val', { invalid: !isValid.email })}
                        placeholder="example@gmail.com"
                        value={input.email || ''}
                        onBlur={(e) =>
                            setIsValid({
                                ...isValid,
                                email:
                                    e.target.value === ''
                                        ? true
                                        : validator.email(e.target.value),
                            })
                        }
                        onInput={(e) => setIsValid({ ...isValid, email: true })}
                        onChange={(e) => {
                            return setInput({
                                ...input,
                                email: validator.firstSpace(e.target.value),
                            });
                        }}
                    />
                </div>

                <div className={cx('item')}>
                    <p className={cx('item-desc')}>Address : </p>
                    <input
                        type="text"
                        className={cx('item-val')}
                        value={input.diachi || ''}
                        onChange={(e) => {
                            return setInput({
                                ...input,
                                diachi: validator.firstSpace(e.target.value),
                            });
                        }}
                    />
                </div>
                <div className={cx('edit')}>
                    <button onClick={saveInfo}>
                        <FontAwesomeIcon icon={faFloppyDisk} />
                        <p>Save infor</p>
                    </button>
                    <button onClick={handleShowEdit}>
                        <FontAwesomeIcon icon={faCancel} />
                        <p>Cancel Edit</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default memo(EditItem);
