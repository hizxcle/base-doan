import { memo, useMemo } from 'react';
import classNames from 'classnames/bind';
import useAuth from '~/hooks/useAuth';

import styles from './OrderTable.module.scss';
import OrderItem from '~/components/orders/OrderItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faListCheck,
    faShippingFast,
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function OverviewTable({ data, action, setTab = false }) {
    // 0 da huy
    // 1 chua xac nha
    // 2 don hang dang duoc gui di
    // 3 giao hang thanh cong
    // 4 da nhan duoc hang
    const auth = useAuth();
    const isAdmin = auth.userInfo.Quyen !== 'user';
    const isSameUser = useMemo(() => {
        const makhs = data.map((ele) => ele.makh);
        return [...new Set(makhs)].length === 1;
    }, [data]);
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
                        <td>OrderID</td>
                        <td>Product detail</td>
                        <td>Receiver 'phone</td>
                        <td>Receiver 'email</td>
                        <td>Address</td>
                        <td>Order time</td>
                        <td>Total price</td>
                        <td>Note</td>
                        <td className={cx('')}>Status</td>
                        <td>Action</td>
                        <td>Cancel</td>
                        {isAdmin && <td>View info</td>}
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
                                setTab={setTab}
                                isSameUser={isSameUser}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8}>
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
                        <td>OrderID</td>
                        <td>Product detail</td>
                        <td>Receiver 'phone</td>
                        <td>Receiver 'email</td>
                        <td>Address</td>
                        <td>Order time</td>
                        <td>Total price</td>
                        <td>Note</td>
                        <td>Status</td>
                        <td>Action</td>
                        <td>Cancel</td>
                        {isAdmin && <td>View info</td>}
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
                                setTab={setTab}
                                isSameUser={isSameUser}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8}>
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
                        <td>Order code</td>
                        <td>Product detail</td>
                        <td>Receiver 'phone</td>
                        <td>Receiver 'email</td>
                        <td>Address</td>
                        <td>Order time</td>
                        <td>Total price</td>
                        <td>Note</td>
                        <td className={cx('')}>Status</td>
                        <td>Action</td>
                        <td>Cancel</td>
                        {isAdmin && <td>View info</td>}
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
                                setTab={setTab}
                                isSameUser={isSameUser}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8}>
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
