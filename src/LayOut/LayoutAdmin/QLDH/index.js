import styles from './QLDH.module.scss';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState, memo } from 'react';
import OverviewTable from '~/components/orders/orderTable/OverviewTable';
import OrderTable from '~/components/orders/orderTable';
const cx = classNames.bind(styles);

function QLDH({ data: dt, setTable: setTab, isSearch = false }) {
    const [data, setData] = useState(dt);
    const [table, setTable] = useState('overview');

    useEffect(() => {
        if (dt.length > 0 || isSearch) {
            setData(dt);
        } else if (dt.length < 1) {
            fetch(`http://localhost:2222/api/order/getAll`)
                .then((res) => res.json())
                .then((res) => {
                    setData(res);
                });
        }
    }, [dt]);

    return (
        <div>
            <div className={cx('banner')}>
                <img
                    src="https://cdn.tgdd.vn/2021/07/campaign/uu-diem-khi-su-dung-phan-mem-quan-ly-van-chuyen-cho-don-vi-ban-hangcopy-640x360.jpg"
                    alt="anh quan ly don hang"
                />
            </div>

            <div className={cx('navigation')}>
                <button
                    onClick={() => setTable('overview')}
                    className={cx('', { active: table === 'overview' })}
                >
                    All Order
                </button>
                <button
                    onClick={() => setTable(0)}
                    className={cx('', { active: table == 0 })}
                >
                    Cancelled
                </button>
                <button
                    onClick={() => setTable(4)}
                    className={cx('', { active: table == 4 })}
                >
                    Received
                </button>
                <button
                    onClick={() => setTable('all')}
                    className={cx('', { active: table === 'all' })}
                >
                    History Order
                </button>
            </div>

            <div className={cx('content')}>
                {table === 'overview' ? (
                    <OverviewTable
                        data={data}
                        action={setData}
                        setTab={setTab}
                    />
                ) : (
                    <OrderTable
                        data={data}
                        action={setData}
                        type={table}
                        setTab={setTab}
                    />
                )}
            </div>
            {/* <table border="1" className={cx('table')}>
                <thead>
                    <tr>
                        <th className={cx('small')}>Mã đơn hàng</th>
                        <th className={cx('small')}>Mã KH</th>
                        <th>Tên tài khoản</th>
                        <th>Địa chỉ nhận hàng</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái đơn hàng</th>
                        <th>Note</th>
                        <th>Action</th>
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
                                    <FontAwesomeIcon icon={faCheck} /> Cập nhập
                                    trạng thái đơn hàng
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
}

export default memo(QLDH);
