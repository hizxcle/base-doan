import { memo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);
function EditItem({ data, action }) {
    const auth = useAuth();
    const [input, setInput] = useState({
        hoten: data.hoten,
        gioitinh: Number(data.gioitinh),
        ngaysinh: data.ngaysinh || '',
        sdt: data.sdt,
        email: data.email,
        diachi: data.diachi,
    });

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
                auth.setUserInfo({ ...input, Quyen: 'user' });
                action(input);
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('item')}>
                    <span className={cx('item-desc')}>Full name :</span>
                    <input
                        className={cx('item-val')}
                        value={input.hoten}
                        onChange={(e) => {
                            setInput({ ...input, hoten: e.target.value });
                        }}
                    />
                </div>
                <div className={cx('item')}>
                    <span className={cx('item-desc')}>Gender :</span>
                    <input
                        name="gender"
                        id="gendernam"
                        value="1"
                        className={cx('item-val')}
                        type="radio"
                        checked={input.gioitinh == 1}
                        onChange={(e) => {
                            setInput({ ...input, gioitinh: e.target.value });
                        }}
                    />
                    <label htmlFor="gendernam">male</label>
                    <input
                        name="gender"
                        id="gendernu"
                        value="0"
                        className={cx('item-val')}
                        type="radio"
                        checked={input.gioitinh == 0}
                        onChange={(e) => {
                            setInput({ ...input, gioitinh: e.target.value });
                        }}
                    />
                    <label htmlFor="gendernu">female</label>
                    <input
                        name="gender"
                        id="gender3"
                        value="3"
                        className={cx('item-val')}
                        type="radio"
                        checked={![1, 0].includes(input.gioitinh)}
                        onChange={(e) => {
                            setInput({ ...input, gioitinh: e.target.value });
                        }}
                    />
                    <label htmlFor="gender3">other</label>
                    <div className={cx('item')}>
                        <span className={cx('item-desc')}>Date of birth :</span>
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
                        <span className={cx('item-desc')}>Phone :</span>
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
                        <span className={cx('item-desc')}>Email :</span>
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
                        <span className={cx('item-desc')}>Address : </span>
                        <input
                            type="text"
                            className={cx('item-val')}
                            value={input.diachi}
                            onChange={(e) => {
                                setInput({ ...input, diachi: e.target.value });
                            }}
                        />
                    </div>
                </div>
                <button className={cx('edit')} onClick={saveInfo}>
                    <FontAwesomeIcon icon={faFloppyDisk} />
                    <span>Save infor</span>
                </button>
            </div>
        </div>
    );
}
export default memo(EditItem);
