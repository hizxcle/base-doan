import { memo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);
function EditItem({ data, action, setEdit }) {
    const auth = useAuth();
    const [input, setInput] = useState({
        hoten: data.hoten,
        gioitinh: Number(data.gioitinh),
        ngaysinh: data.ngaysinh || '',
        sdt: data.sdt,
        email: data.email,
        diachi: data.diachi,
    });

    const handleShowEdit = () => {
        setEdit(false);
    };

    const saveInfo = () => {
        const opt = {
            method: 'put',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log('user id', input);
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
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('item')}>
                    <p className={cx('item-desc')}>Full name :</p>
                    <input
                        className={cx('item-val')}
                        value={input.hoten}
                        onChange={(e) => {
                            setInput({ ...input, hoten: e.target.value });
                        }}
                    />
                </div>
                <div className={cx('item')}>
                    <p className={cx('item-desc')}>Gender :</p>
                    <p className={cx('item-radio')}>
                        <input
                            name="gender"
                            id="gendernam"
                            value="1"
                            className={cx('item-val')}
                            type="radio"
                            checked={input.gioitinh == 1}
                            onChange={(e) => {
                                setInput({
                                    ...input,
                                    gioitinh: e.target.value,
                                });
                            }}
                        />
                        <label htmlFor="gendernam">Male</label>
                    </p>
                    <p className={cx('item-radio')}>
                        <input
                            name="gender"
                            id="gendernu"
                            value="0"
                            className={cx('item-val')}
                            type="radio"
                            checked={input.gioitinh == 0}
                            onChange={(e) => {
                                setInput({
                                    ...input,
                                    gioitinh: e.target.value,
                                });
                            }}
                        />
                        <label htmlFor="gendernu">Female</label>
                    </p>
                    <p className={cx('item-radio')}>
                        <input
                            name="gender"
                            id="gender3"
                            value="3"
                            className={cx('item-val')}
                            type="radio"
                            checked={![1, 0].includes(input.gioitinh)}
                            onChange={(e) => {
                                setInput({
                                    ...input,
                                    gioitinh: e.target.value,
                                });
                            }}
                        />
                        <label htmlFor="gender3">Other</label>
                    </p>
                </div>

                <div className={cx('item')}>
                    <p className={cx('item-desc')}>Date of birth :</p>
                    <input
                        type="date"
                        className={cx('item-val')}
                        value={input.ngaysinh}
                        onChange={(e) => {
                            setInput({
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
                        className={cx('item-val')}
                        value={input.sdt}
                        onChange={(e) => {
                            setInput({ ...input, sdt: e.target.value });
                        }}
                    />
                </div>

                <div className={cx('item')}>
                    <p className={cx('item-desc')}>Email :</p>
                    <input
                        type="email"
                        className={cx('item-val')}
                        value={input.email}
                        onChange={(e) => {
                            setInput({ ...input, email: e.target.value });
                        }}
                    />
                </div>

                <div className={cx('item')}>
                    <p className={cx('item-desc')}>Address : </p>
                    <input
                        type="text"
                        className={cx('item-val')}
                        value={input.diachi}
                        onChange={(e) => {
                            setInput({ ...input, diachi: e.target.value });
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
