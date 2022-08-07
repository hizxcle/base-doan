import styles from './Cart.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';

import CartItem from './components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faCartArrowDown,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Cart() {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);

    // useEffect(() => {
    //     return async () => {
    //         const res = (
    //             await fetch(`http://localhost:2222/api/cart/getByUser/8`)
    //         ).json();
    //         // setCart(res);
    //     };
    // }, []);

    useEffect(() => {
        fetch(`http://localhost:2222/api/cart/getByUser/9`).then((res) => {
            setCart(res.json());
        });
        console.log('test use affect');
        fetch(`http://localhost:2222/api/product`)
            .then((res) => res.json())
            .then((res) => {
                console.log('res', res);
                setData(res);
            });
    }, []);
    const filterData = useMemo(
        () =>
            data.filter((item) =>
                cart.map((item) => item.masp).includes(item.masp),
            ),
        [data, cart],
    );

    // const totalPrice = useMemo(() => {
    //     filterData.reduce((result) => {
    //         result = filterData.gia * filterData.soluong;
    //     });
    // });

    // console.log(totalPrice);

    return (
        <div className={cx('wrapper')}>
            {filterData ? (
                <>
                    {' '}
                    <div className={cx('title')}>
                        <span className={cx('title-text')}>
                            Your Shopping Cart
                        </span>
                    </div>
                    <div className={cx('container')}>
                        <table>
                            <thead>
                                <tr className={cx('table-row')}>
                                    <td>Product</td>
                                    <td>Price</td>
                                    <td>Quantity</td>
                                    <td>Total</td>
                                </tr>
                            </thead>

                            {filterData.map((item) => (
                                <CartItem key={item.masp} item={item} />
                            ))}
                        </table>
                        <hr></hr>
                        <div className={cx('container-checkout')}>
                            <div className={cx('container-left')}>
                                <div className={cx('container-left-items')}>
                                    <p>Have a promo code for checkout?</p>
                                    <div className={cx('item1')}>
                                        <input
                                            type="text"
                                            placeholder="Enter Promo Code"
                                        />
                                        <button>APPLY</button>
                                    </div>
                                </div>
                                <div className={cx('container-left-items')}>
                                    <p>Add a note to your order</p>
                                    <textarea />
                                </div>
                                <div className={cx('container-left-items')}>
                                    <Link to="/shop">
                                        <div className={cx('item2')}>
                                            <FontAwesomeIcon
                                                icon={faArrowLeft}
                                            />
                                            <span>CONTINUE SHOPPING</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('container-right')}>
                                <div className={cx('container-right-header')}>
                                    <h5>Order Summary</h5>
                                    <div className={cx('total')}>
                                        <span>Total</span>
                                        <span>{filterData.length} item(s)</span>
                                    </div>
                                    <div className={cx('total')}>
                                        <span>Total weight</span>
                                        <span> 9.92 lb</span>
                                    </div>
                                    <hr></hr>
                                    <div className={cx('total')}>
                                        <span>TOTAL PRICE</span>
                                        <span> $154.00</span>
                                    </div>
                                    <div>
                                        <button className={cx('button-update')}>
                                            UPDATE
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className={cx('button-checkout')}
                                        >
                                            GO TO CHECKOUT
                                        </button>
                                    </div>
                                </div>
                                <div className={cx('container-right-footer')}>
                                    <p>
                                        Mobilex process all orders in USD.
                                        Shipping & taxes calculated at checkout.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className={cx('container-empty')}>
                    <FontAwesomeIcon
                        icon={faCartArrowDown}
                        className={cx('icon-empty')}
                    />
                    <p>Your cart is currently empty.</p>
                    <button>
                        <Link to="/shop" className={cx('link-router')}>
                            RETURN TO SHOP
                        </Link>
                    </button>
                </div>
            )}
        </div>
    );
}

export default memo(Cart);
