import styles from './Cart.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '~/hooks/useAuth';

import CartItem from './components/CartItem';
import CartEmpty from '~/pages/Cart/components/CartEmpty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getCart } from '~/Services';
import PayMent from '../PayMent';

const cx = classNames.bind(styles);

function Cart() {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);

    const auth = useAuth();

    useEffect(
        () => {
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
        },
        [auth.userInfo.manguoidung],
        [auth.isLogin],
    );

    const handleCheckout = () => {
        getCart(auth.userInfo.manguoidung);
    };
    const filterData = useMemo(
        () =>
            data.filter((item) =>
                cart.map((item) => item.masp).includes(item.masp),
            ),
        [data],
        [cart],
    );
    return (
        <div className={cx('wrapper')}>
            {filterData.length >= 1 ? (
                <>
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
                                <CartItem
                                    key={item.masp}
                                    item={item}
                                    setCart={setCart}
                                />
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
                                    <Link
                                        to="/shop"
                                        className={cx('link-router')}
                                    >
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
                                        <span>
                                            {9.92 * filterData.length} lb(s)
                                        </span>
                                    </div>
                                    <hr></hr>
                                    <div className={cx('total')}>
                                        <span>Total Price</span>
                                        <span> $154.00</span>
                                    </div>
                                    <div>
                                        <Link to="/cart">
                                            <button
                                                className={cx('button-update')}
                                            >
                                                UPDATE ITEM
                                            </button>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="/payment">
                                            <button
                                                className={cx(
                                                    'button-checkout',
                                                )}
                                                onClick={handleCheckout}
                                            >
                                                GO TO CHECK OUT
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className={cx('container-right-footer')}>
                                    <p>
                                        Mobilex process all orders in USD.
                                        Shipping and taxes calculated at
                                        checkout.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <CartEmpty />
            )}
        </div>
    );
}

export default memo(Cart);
