import styles from './QLDH.module.scss';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function QLDH() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:2222/api/order/getAll`)
            .then((res) => res.json())
            .then((res) => setData(res));
    }, []);

    return (
        <div>
            <div className={cx('title')}>
                <p>QUẢN LÝ ĐƠN HÀNG</p>
            </div>
            <table border="1" className={cx('table')}>
                <thead>
                    <tr>
                        <th className={cx('small')}>Mã đơn hàng</th>
                        <th className={cx('small')}>Mã KH</th>
                        <th>Tên tài khoản</th>
                        <th>Địa chỉ nhận hàng</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Trạng thái đơn hàng</th>
                        <th>Note</th>
                        <th colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr className={cx('font')} key={item.madh}>
                            <td>{item.madh}</td>
                            <td>{item.makh}</td>
                            <td>{item.tenkhnhan}</td>
                            <td>{item.diachinhan}</td>
                            <td>{item.email}</td>
                            <td>{item.sdt}</td>
                            <td>{item.trangthai}</td>
                            <td>{item.ghichu}</td>
                            <td>
                                <button
                                    className={cx('edit-button')}
                                    type="button"
                                    // onClick={(e) => handleEdit(e, item)}
                                >
                                    <FontAwesomeIcon icon={faCheck} /> Cấp quyền
                                    Admin
                                </button>
                            </td>
                            <td>
                                <button
                                    className={cx('delete-button')}
                                    type="button"
                                    // onClick={() => {
                                    //     handleDelete(item.masp);
                                    // }}
                                >
                                    <FontAwesomeIcon icon={faTrash} /> Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default QLDH;
