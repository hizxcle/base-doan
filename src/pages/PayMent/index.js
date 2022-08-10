import classNames from 'classnames/bind';
import styles from './PayMent.module.scss';
import { useEffect, useState, useMemo } from 'react';
import useAuth from '~/hooks/useAuth';
import TotalCart from './TotalCart';
import Info from './Info';
import PayMethod from './PayMethod';

const cx = classNames.bind(styles);

function PayMent() {
    const auth = useAuth();
    const [cart, setCart] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (auth.isLogin) {
            fetch(
                `http://localhost:2222/api/cart/getByUser/${auth.userInfo.manguoidung}`,
            )
                .then((res) => res.json())
                .then((res) => setCart(res));
        }
        fetch(`http://localhost:2222/api/product`)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            });
    }, []);

    const filterData = useMemo(
        () =>
            data.filter((item) =>
                cart.map((item) => item.masp).includes(item.masp),
            ),
        [auth.isLogin],
    );

    const filterQuantity = cart.find((item) => item.masp === filterData.masp);
    console.log('filterQUantity', filterQuantity);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('container-left')}>
                    {auth.isLogin ? <PayMethod /> : <Info />}
                    <div className={cx('policy')}>
                        <span>Refund Policy</span>
                        <span>Pricy policy</span>
                        <span>Terms of service</span>
                    </div>
                </div>
                <div className={cx('container-right')}>
                    {filterData.map((item) => (
                        <TotalCart item={item} cart={cart} key={item.masp} />
                    ))}
                    <div className={cx('container-right-total')}>
                        <div className={cx('total')}>
                            <span>Subtotal</span>
                            <span>Shipping Fee</span>
                        </div>
                        <div className={cx('total')}>
                            <p>asdasd</p>
                            <p>100.000 VND</p>
                        </div>
                    </div>
                    <div className={cx('container-right-total')}>
                        <div className={cx('total')}>
                            <h3>Total</h3>
                        </div>
                        <div className={cx('total')}>
                            <h3>100.000 VND</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PayMent;
