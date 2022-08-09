import { memo, useMemo } from 'react';
import classNames from 'classnames/bind';

import styles from './OrderTable.module.scss';
import OrderItem from '~/components/orders/OrderItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function OrderTable({ data, action, type }) {
    // 0 da huy cancel
    // 1 chua xac nha
    // 2 don hang dang duoc gui di
    // 3 giao hang thanh cong
    // 4 da nhan duoc hang received
    // all
    const order = useMemo(() => {
        return type == 'all'
            ? data
            : data.filter((ele) => ele.trangthai == type);
    }, [type]);
    const header = useMemo(() => {
        if (type == 'all') return 'All orders';
        if (type == 0) return 'Cancel orders';
        if (type == 1) return 'Unverified orders';
        if (type == 2) return 'Shipping orders';
        if (type == 3) return 'Success delivered';
        if (type == 4) return 'Receied orders ';
    }, [type]);
    console.log('order', order);
    console.log('type', header);
    return (
        <div className={cx('wrapper')}>
            <h2>{header}</h2>
            <table className={cx('table', 'table-shipping')}>
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
                    {order.length > 0 ? (
                        order.map((ele) => (
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
