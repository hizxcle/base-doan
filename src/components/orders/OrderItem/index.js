// <tr>
//                 <th>Order code</th>
//                 <th>Gust 'name</th>
//                 <th>Phone number</th>
//                 <th>Email</th>
//                 <th>Address</th>
//                 <th>Order time</th>
//                 <th>Product detail</th>
//                 <th>Total price</th>
//                 <th colSpan="2">Note</th>
//                 <th className={cx('')}>Status</th>
//                 <th>Action</th>
//             </tr>
// 0 da huy
// 1 chua xac nha
// 2 don hang dang duoc gui di
// 3 giao hang thanh cong
// 4 da nhan duoc hang
import { memo, useMemo, useCallback, useState, useEffect } from 'react';
import useAuth from '~/hooks/useAuth';
import classNames from 'classnames/bind';
import OrderProReview from '../OrderProReview';
import styles from './OrderItem.module.scss';
const cx = classNames.bind(styles);
function OrderItem({ data, action, type, setTab = false, isSameUser = false }) {
    const auth = useAuth();
    const isAdmin = auth.userInfo.Quyen !== 'user';
    const [showDetail, setShowDetail] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let pros = await fetch(
                `http://localhost:2222/api/dssp/${data.madh}`,
            );
            pros = await pros.json();
            if (pros.length > 0) {
                pros = pros.map(async (ele) => {
                    const { soluong, tensp, tenncc, gia } = ele;

                    let result = await fetch(
                        `http://localhost:2222/api/product/${ele.masp}`,
                    );
                    result = await result.json();
                    result = result[0];
                    result.soluong = soluong;
                    result.gia = gia;
                    result.nhacungcap = tenncc;
                    result.tensp = tensp;
                    return result;
                });
            }
            const result = await Promise.all(pros);
            setProducts(result);
        };
        fetchData();
    }, [data]);

    const prices = useMemo(() => {
        return products.reduce((cross, cur) => {
            const gia = Number(cur.soluong) * Number(cur.gia);
            return (cross = cross + gia);
        }, 0);
    }, [products]);

    const mess = useMemo(() => {
        if (type == 1) return 'cancel';
        if (type == 2) return 'cancel';
        if (type == 3) return 'received order';
    }, [type]);
    const status = useMemo(() => {
        if (type == 0) return 'cancelled';
        if (type == 1) return 'unverified';
        if (type == 2) return 'on shipping';
        if (type == 3) return 'completed delivery';
        if (type == 4) return 'received order';
    }, [type]);

    const cancel = useCallback(() => {
        const opt = {
            method: 'put',
            body: JSON.stringify({
                ghichu: 'cancelled',
            }),
        };
        fetch(`http://localhost:2222/api/order/huydon/${data.madh}`, opt);

        if (isSameUser) {
            fetch(`http://localhost:2222/api/order/getbyMakh/${data.makh}`)
                .then((res) => res.json())
                .then((res) => action(res));
        } else {
            fetch(`http://localhost:2222/api/order/getAll`)
                .then((res) => res.json())
                .then((res) => action(res));
        }
    }, [type]);

    const received = useCallback(() => {
        const opt = {
            method: 'put',
        };
        fetch(`http://localhost:2222/api/order/danhan/${data.madh}`, opt);

        if (isSameUser) {
            fetch(`http://localhost:2222/api/order/getbyMakh/${data.makh}`)
                .then((res) => res.json())
                .then((res) => action(res));
        } else {
            fetch(`http://localhost:2222/api/order/getAll`)
                .then((res) => res.json())
                .then((res) => action(res));
        }
    }, [type]);

    const update = useCallback(
        ({ trangthai, ghichu }) => {
            const opt = {
                method: 'put',
                body: JSON.stringify({
                    trangthai,
                    ghichu,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            fetch(
                `http://localhost:2222/api/order/updateState/${data.madh}`,
                opt,
            );
            if (isSameUser) {
                fetch(`http://localhost:2222/api/order/getbyMakh/${data.makh}`)
                    .then((res) => res.json())
                    .then((res) => action(res));
            } else {
                fetch(`http://localhost:2222/api/order/getAll`)
                    .then((res) => res.json())
                    .then((res) => action(res));
            }
        },
        [type],
    );
    return (
        <tr className={cx('order-item')}>
            <td>{data.madh}</td>
            <td>
                <button onClick={(e) => setShowDetail(true)}>
                    Detail product
                </button>
                {showDetail && (
                    <OrderProReview
                        data={products}
                        action={setShowDetail}
                        showDetail={showDetail}
                    />
                )}
            </td>
            <td>{data.sdt}</td>
            <td>{data.email}</td>
            <td>{data.diachinhan}</td>
            <td>{data.tgdathang}</td>
            <td>
                <span>{`${prices} VND`}</span>
            </td>
            <td>{data.ghichu}</td>
            <td>{status}</td>
            {isAdmin && Number(type) === 1 ? (
                <td>
                    <button
                        onClick={() => {
                            update({
                                trangthai: 2,
                                ghichu: 'on shipping',
                            });
                        }}
                    >
                        Verified
                    </button>
                </td>
            ) : isAdmin && Number(type) === 2 ? (
                <td>
                    <button
                        onClick={() => {
                            update({
                                trangthai: 3,
                                ghichu: 'success delivery',
                            });
                        }}
                    >
                        giao T.cong
                    </button>
                </td>
            ) : Number(type) === 3 ? (
                <td>
                    <button onClick={received}>Received order</button>
                </td>
            ) : (
                <td></td>
            )}
            {[1, 2, 3].includes(Number(type)) ? (
                <td>
                    <button onClick={cancel}>Cancel</button>
                </td>
            ) : (
                <td></td>
            )}
            {isAdmin ? (
                <td>
                    <button
                        onClick={() => {
                            const url = `user/${data.makh}`;
                            setTab(url);
                        }}
                    >
                        View gust 'info
                    </button>
                </td>
            ) : (
                <td></td>
            )}
        </tr>
    );
}
export default memo(OrderItem);
