import { memo, useMemo } from 'react';
import classNames from 'classnames/bind';
import useAuth from '~/hooks/useAuth';

import styles from './OrderTable.module.scss';
import OrderItem from '~/components/orders/OrderItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function OrderTable({ data, action, type, setTab = false }) {
    // 0 da huy cancel
    // 1 chua xac nha
    // 2 don hang dang duoc gui di
    // 3 giao hang thanh cong
    // 4 da nhan duoc hang received
    // all
    const auth = useAuth();
    const isAdmin = auth.userInfo.Quyen !== 'user';
    const isSameUser = useMemo(() => {
        const makhs = data.map((ele) => ele.makh);
        return [...new Set(makhs)].length === 1;
    }, [data]);
    const order = useMemo(() => {
        return type == 'all'
            ? data
            : data.filter((ele) => ele.trangthai == type);
    }, [data, type]);
    const header = useMemo(() => {
        if (type == 'all') return 'All orders';
        if (type == 0) return 'Cancel orders';
        if (type == 1) return 'Unverified orders';
        if (type == 2) return 'Shipping orders';
        if (type == 3) return 'Success delivered';
        if (type == 4) return 'Receied orders ';
    }, [type]);

    return (
        <div className={cx('wrapper')}>
            <h2>{header}</h2>
            <table className={cx('table', 'table-shipping')}>
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
                        <td>Status</td>
                        {['all', 0, 4].includes(type) ? (
                            <td></td>
                        ) : (
                            <td>Action</td>
                        )}
                        {[1, 2, 3].includes(type) ? <td>Cancel</td> : <td></td>}
                        {isAdmin && <td>View info</td>}
                    </tr>
                </thead>
                <tbody>
                    {order.length > 0 ? (
                        order.map((ele) => (
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
                                    <h3>Empty !!!!</h3>
                                    <FontAwesomeIcon
                                        icon={faCancel}
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
export default memo(OrderTable);
