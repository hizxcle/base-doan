import styles from './Cart.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useState } from 'react';

import CartItem from './components';

const cx = classNames.bind(styles);
function Cart() {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);

    console.log('cart', cart);

    useEffect(() => {
        fetch(`http://localhost:2222/api/cart/getByUser/8`)
            .then((res) => res.json())
            .then((res) => setCart(res));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:2222/api/product`)
            .then((res) => res.json())
            .then((res) => setData(res));
    }, []);

    const filterData = data.filter((item) =>
        cart.map((item) => item.masp).includes(item.masp),
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span className={cx('title-text')}>Cart </span>
            </div>
            <div className={cx('container')}>
                <ul className={cx('list-cart')}>
                    {filterData.map((item) => (
                        <CartItem key={item.masp} item={item} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Cart;
