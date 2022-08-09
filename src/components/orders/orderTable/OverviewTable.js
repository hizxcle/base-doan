import { memo, useMemo } from 'react';
import classNames from 'classnames/bind';

import styles from './OrderTable.module.scss';
import OrderItem from '~/components/orders/OrderItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faListCheck,
    faShippingFast,
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function OverviewTable({ data, action }) {
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
    return (
        <div className={cx('wrapper')}>
            <h2>On Shipping</h2>
            <table className={cx('table', 'table-shipping')}>
                <thead>
                    <tr>
                        <th>OrderID</th>
                        <th>Product detail</th>
                        <th>Address</th>
                        <th>Order time</th>
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
                                <div className={cx('notice')}>
                                    <h3>You have no shipping order!</h3>
                                    <FontAwesomeIcon
                                        icon={faShippingFast}
                                        className={cx('icon')}
                                    />
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h2>Unverified</h2>
            <table className={cx('table', 'table-unverified')}>
                <thead>
                    <tr>
                        <th>OrderID</th>
                        <th>Product detail</th>
                        <th>Address</th>
                        <th>Order time</th>
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
                                <div className={cx('notice')}>
                                    <h3>You have no verified order!</h3>
                                    <FontAwesomeIcon
                                        icon={faListCheck}
                                        className={cx('icon')}
                                    />
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h2>Successed</h2>
            <table className={cx('table', 'table-success-delivered')}>
                <thead>
                    <tr>
                        <th>Order code</th>
                        <th>Product detail</th>
                        <th>Address</th>
                        <th>Order time</th>
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
                                <div className={cx('notice')}>
                                    <h3>You have no successed order!</h3>
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className={cx('icon')}
                                    />
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
export default memo(OverviewTable);
