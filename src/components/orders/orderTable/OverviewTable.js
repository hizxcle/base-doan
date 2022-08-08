import { memo, useMemo } from 'react';
import classNames from 'classnames/bind';

import styles from './OrderTable.module.scss';
import OrderItem from '~/components/orders/OrderItem';
const cx = classNames.bind(styles);
function OverviewTable({ data, action }) {
    console.log(data);
    // 0 da huy
    // 1 chua xac nha
    // 2 don hang dang duoc gui di
    // 3 giao hang thanh cong
    // 4 da nhan duoc hang
    const shipping = useMemo(() => {
        return data.filter((ele) => ele.trangthai == 2);
    }, [data]);
    const unverified = useMemo(() => {
        return data.filter((ele) => ele.trangthai == 1);
    }, [data]);
    const success = useMemo(() => {
        return data.filter((ele) => ele.trangthai == 3);
    }, [data]);
    console.log('dang ship', shipping);
    console.log('doi xac nhan', unverified);
    console.log('giao thanh cong', success);
    return (
        <div className={cx('wrapper')}>
            <h2>shipping</h2>
            <table className={cx('table', 'table-shipping')}>
                <thead>
                    <tr>
                        <th>Order code</th>
                        <th>Gust 'name</th>
                        <th>Phone number</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Order time</th>
                        <th>Product detail</th>
                        <th>Total price</th>
                        <th colSpan="2">Note</th>
                        <th className={cx('')}>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {shipping.length > 0 ? (
                        shipping.map((ele) => (
                            <OrderItem
                                key={ele.madh}
                                data={ele}
                                action={action}
                                type={ele.trangthai}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={11}>
                                <h3 className={cx('notice')}>
                                    nothing here !!!
                                </h3>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h2>unverified</h2>
            <table className={cx('table', 'table-unverified')}>
                <thead>
                    <tr>
                        <th>Order code</th>
                        <th>Gust 'name</th>
                        <th>Phone number</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Order time</th>
                        <th>Product detail</th>
                        <th>Total price</th>
                        <th colSpan="2">Note</th>
                        <th className={cx('')}>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {unverified.length > 0 ? (
                        unverified.map((ele) => (
                            <OrderItem
                                key={ele.madh}
                                data={ele}
                                action={action}
                                type={ele.trangthai}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={11}>
                                <h3 className={cx('notice')}>
                                    nothing here !!!
                                </h3>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h2>success delivered</h2>
            <table className={cx('table', 'table-success-delivered')}>
                <thead>
                    <tr>
                        <th>Order code</th>
                        <th>Gust 'name</th>
                        <th>Phone number</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Order time</th>
                        <th>Product detail</th>
                        <th>Total price</th>
                        <th colSpan="2">Note</th>
                        <th className={cx('')}>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {success.length > 0 ? (
                        success.map((ele) => (
                            <OrderItem
                                key={ele.madh}
                                data={ele}
                                action={action}
                                type={ele.trangthai}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={11}>
                                <h3 className={cx('notice')}>
                                    nothing here !!!
                                </h3>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
export default memo(OverviewTable);
