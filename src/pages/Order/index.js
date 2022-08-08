import { memo, useState, useEffect } from 'react';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import useAuth from '~/hooks/useAuth';
import OverviewTable from '~/components/orders/orderTable/OverviewTable';
import OrderTable from '~/components/orders/orderTable';
const cx = classNames.bind(styles);
function Order() {
    const auth = useAuth();
    const [data, setData] = useState([]);
    const [table, setTable] = useState('overview');

    useEffect(() => {
        fetch(
            `http://localhost:2222/api/order/getbyMakh/${auth.userInfo.manguoidung}`,
        )
            .then((res) => res.json())
            .then((res) => {
                console.log('data : ', res);
                setData(res);
            });
    }, []);
    // 0 da huy
    // 1 chua xac nha
    // 2 don hang dang duoc gui di
    // 3 giao hang thanh cong
    // 4 da nhan duoc hang
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navigation')}>
                <button
                    onClick={() => setTable('overview')}
                    className={cx('', { active: table === 'overview' })}
                >
                    Overview orders
                </button>
                <button
                    onClick={() => setTable(0)}
                    className={cx('', { active: table == 0 })}
                >
                    Cancelled orders
                </button>
                <button
                    onClick={() => setTable(4)}
                    className={cx('', { active: table == 4 })}
                >
                    Received orders
                </button>
                <button
                    onClick={() => setTable('all')}
                    className={cx('', { active: table === 'all' })}
                >
                    All orders
                </button>
            </div>

            <div className={cx('content')}>
                {table === 'overview' ? (
                    <OverviewTable data={data} action={setData} />
                ) : (
                    <OrderTable data={data} action={setData} type={table} />
                )}
            </div>
        </div>
    );
}

export default memo(Order);
