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
import classNames from 'classnames/bind';
import OrderProReview from '../OrderProReview';
import styles from './OrderItem.module.scss';
const cx = classNames.bind(styles);
function OrderItem({ data, action, type }) {
    console.log('data :', data);
    const [showDetail, setShowDetail] = useState(false);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let pros = await fetch(
                `http://localhost:2222/api/dssp/${data.madh}`,
            );
            pros = await pros.json();
            if (pros.length > 0) {
                pros = pros.map((ele) => {
                    const masp = ele.masp;
                    const soluong = ele.soluong;
                    return { masp, soluong };
                });
                pros.map(async (ele) => {
                    const soluong = ele.soluong;
                    let result = await fetch(
                        `http://localhost:2222/api/product/${ele.masp}`,
                    );
                    result = await result.json();
                    result = result[0];
                    result.soluong = soluong;
                    setProducts([...products, result]);
                });
            }
        };
        fetchData();
    }, [data]);
    console.log('product list', products);
    const prices = useMemo(() => {
        return products.reduce((cross, cur) => {
            const gia = Number(cur.soluong) * Number(cur.gia);
            return (cross = cross + gia);
        }, 0);
    }, [products]);

    const mess = useMemo(() => {
        if (type == 1) return 'huy don';
        if (type == 2) return 'huy don';
        if (type == 3) return 'da nhan hang';
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
                ghichu: 'da huy',
            }),
        };
        fetch(`http://localhost:2222/api/order/huydon/${data.madh}`, opt);
        action((pre) => pre);
    }, [type]);
    const received = useCallback(() => {
        const opt = {
            method: 'put',
        };
        fetch(`http://localhost:2222/api/order/danhan/${data.madh}`, opt);
        action((pre) => pre);
    }, [type]);
    return (
        <tr className={cx('order-item')}>
            <td>{data.madh}</td>
            <td>
                <button onClick={(e) => setShowDetail(true)}>
                    show detail
                </button>
                {showDetail && (
                    <OrderProReview data={products} action={setShowDetail} />
                )}
            </td>
            {/* <td>{data.tenkhnhan}</td>
            <td>{data.sdt}</td>
            <td>{data.email}</td> */}
            <td>{data.diachinhan}</td>
            <td>{data.tgdathang}</td>
            <td>
                gia<span>{`${prices}.vnd`}</span>
            </td>
            <td>{data.ghichu}</td>
            <td>{status}</td>
            {[1, 2].includes(Number(type)) ? (
                <button onClick={cancel}>{mess}</button>
            ) : type == 3 ? (
                <button onClick={received}>{mess}</button>
            ) : (
                ''
            )}
        </tr>
    );
}
export default memo(OrderItem);
