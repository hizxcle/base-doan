import styles from './QLKH.module.scss';
import classNames from 'classnames/bind';

import { deleteUser, getUser } from '~/Services';

import { useEffect, useState } from 'react';
import OnlyReadRow from './components/OnlyReadRow';

const cx = classNames.bind(styles);

function QLKH() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:2222/api/user/allUser`)
            .then((res) => res.json())
            .then((res) => setData(res));
    }, []);

    const handleDelete = async (idProduct) => {
        try {
            const res = await deleteUser('delete', idProduct);
            await res.json();
            const newData = await getUser();
            setData(newData);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <div className={cx('title')}>
                <p>QUẢN LÝ NGƯỜI DÙNG</p>
            </div>
            <table border="1" className={cx('table')}>
                <thead>
                    <tr>
                        <th className={cx('small')}>Mã người dùng</th>
                        <th>Tên tài khoản</th>
                        <th>Họ và tên</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ nhà</th>
                        <th>Email</th>
                        <th>Quyền</th>
                        <th colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <OnlyReadRow
                            key={item.manguoidung}
                            item={item}
                            handleDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default QLKH;
