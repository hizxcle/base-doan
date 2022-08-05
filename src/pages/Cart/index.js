import { getCart, getData } from '~/Services';

import styles from './Cart.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
function Cart() {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);

    const productId = cart.map((ele) => ele.masp);

    console.log('pro id', productId);

    useEffect(() => {
        fetch(`http://localhost:2222/api/cart/getByUser/8`)
            .then((res) => res.json())
            .then((res) => setCart(res));
    }, []);

    useEffect(() => {
        console.log('test use affect');
        fetch(`http://localhost:2222/api/product`)
            .then((res) => res.json())
            .then((res) => {
                console.log('res', res);
                setData(res);
            });
    }, []);

    console.log('cart', cart);
    console.log('data 11111', data);

    const filterData = data.filter((item) => {
        return productId.includes(item.masp);
    });

    console.log('last val', filterData);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span className={cx('title-text')}>Cart </span>
            </div>
            <div className={cx('container')}>
                <ul className={cx('list-cart')}>
                    {cart.map((item) => (
                        <li className={cx('list-item')} key={item.id}>
                            <img
                                src="https://cdn.shopify.com/s/files/1/0453/5035/5103/files/img_02_130x30_crop_center.png?v=1644318438"
                                alt="anh san pham"
                                className={cx('image')}
                            />
                            <div className={cx('info')}>
                                <span className={cx('info-name')}>
                                    {item.masp}
                                </span>
                                <div className={cx('info-calc')}>
                                    <span> So luong :</span>
                                    <span>Tong gia san pham :</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <span>Thanh tien :</span>
            </div>
        </div>
    );
}

export default Cart;
