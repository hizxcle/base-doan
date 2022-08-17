import classNames from 'classnames/bind';
import styles from './PayMent.module.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import useAuth from '~/hooks/useAuth';
import TotalCart from './TotalCart';
import Info from './Info';
import PayMethod from './PayMethod';
import AlertConfirm from '~/components/infoModals/AlertConfirm';

const cx = classNames.bind(styles);

function PayMent() {
    const navigate = useNavigate();
    const auth = useAuth();
    const [cart, setCart] = useState([]);
    const [data, setData] = useState([]);
    const [showAlertW, setShowAlertW] = useState(false);
    const [customerInfo, setCustomerInfo] = useState(() => {
        if (auth.isLogin === true) {
            const {
                hoten,
                sdt,
                email,
                diachi,
                manguoidung: makh,
            } = auth.userInfo;
            return { hoten, sdt, email, diachi, makh, ghichu: '' };
        } else {
            return {};
        }
    });

    useEffect(() => {
        if (auth.isLogin) {
            fetch(
                `http://localhost:2222/api/cart/getByUser/${auth.userInfo.manguoidung}`,
            )
                .then((res) => res.json())
                .then((res) => {
                    setCart(res);
                });
        }
        fetch(`http://localhost:2222/api/product`)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            });
    }, []);

    const filterData = useMemo(() => {
        return data.filter((item) =>
            cart.map((item) => item.masp).includes(item.masp),
        );
    }, [cart]);
    const total = useMemo(() => {
        return cart.reduce((total, cur) => {
            const price = data.find((ele) => ele.masp == cur.masp)?.gia;
            return (total = total + price * cur.soluong);
        }, 0);
    }, [data, cart]);
    const acceptPayment = () => {
        const products = filterData.map((ele) => {
            const { nhacungcap: tenncc, masp, ...rest } = ele;
            const soluong = cart.find((ele) => ele.masp == masp)?.soluong;
            console.log('so luong ', soluong);
            console.log('ten nha cung cap ', tenncc);
            return { ...rest, soluong, tenncc, masp };
        });
        const { hoten: tenkh, ...info } = customerInfo;
        console.log('info', info);
        const opt = {
            method: 'post',
            body: JSON.stringify({
                ...customerInfo,
                tenkh,
                products,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        setShowAlertW(false);
        fetch(`http://localhost:2222/api/order/addNew`, opt)
            .then((res) => res.json())
            .then((res) => {});
        cart.forEach((ele) => {
            fetch(
                `http://localhost:2222/api/cart/delete/${ele.mand}/${ele.masp}`,
                {
                    method: 'delete',
                },
            )
                .then((res) => res.json())
                .then((res) => {});
        });
        setCart([]);
        navigate('/order', { replace: true });
    };
    // const filterQuantity = cart.find((item) => item.masp === filterData.masp);
    // console.log('filterQUantity', filterQuantity);

    return (
        <div className={cx('wrapper')}>
            {showAlertW && (
                <AlertConfirm
                    pay={acceptPayment}
                    setShowAlertW={setShowAlertW}
                />
            )}
            <div className={cx('container')}>
                <div className={cx('container-left')}>
                    {auth.isLogin ? (
                        <PayMethod
                            data={customerInfo}
                            action={setCustomerInfo}
                            setShowAlertW={setShowAlertW}
                        />
                    ) : (
                        <Info action={setCustomerInfo} />
                    )}
                    <div className={cx('policy')}>
                        <span>Refund Policy</span>
                        <span>Pricy policy</span>
                        <span>Terms of service</span>
                    </div>
                </div>
                <div className={cx('container-right')}>
                    {filterData &&
                        filterData.map((item) => (
                            <TotalCart
                                item={item}
                                cart={cart}
                                key={item.masp}
                            />
                        ))}
                    <div className={cx('container-right-total')}>
                        <div className={cx('total')}>
                            <span>Subtotal</span>
                            <span>Shipping Fee</span>
                        </div>
                        <div className={cx('total')}>
                            <p>{`${total.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                            })}VND`}</p>
                            <p>100.000 VND</p>
                        </div>
                    </div>
                    <div className={cx('container-right-total')}>
                        <div className={cx('total')}>
                            <h3>Total</h3>
                        </div>
                        <div className={cx('total')}>
                            <h3>
                                {(total + 100000).toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                })}{' '}
                                VND
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PayMent;
