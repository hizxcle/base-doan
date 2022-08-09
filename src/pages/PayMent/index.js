import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './PayMent.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import useAuth from '~/hooks/useAuth';
import TotalCart from './TotalCart';

const cx = classNames.bind(styles);

function PayMent() {
    const auth = useAuth();
    const [cart, setCart] = useState([]);
    const [data, setData] = useState([]);

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

    const filterData = useMemo(
        () =>
            data.filter((item) =>
                cart.map((item) => item.masp).includes(item.masp),
            ),
        [data],
        [cart],
    );

    const filterQuantity = cart.find((item) => item.masp === filterData.masp);
    console.log('filterQUantity', filterQuantity);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('container-left')}>
                    <h3>MobileX</h3>
                    <span className={cx('container-sub')}>
                        Cart {'>'} Information {'>'} Pay method{' '}
                    </span>
                    <div className={cx('container-item')}>
                        <p>Contact information</p>
                        <p className={cx('container-item-sub')}>
                            Already have an account?{' '}
                            <Link to="/login" className={cx('link-router')}>
                                <span> Log in</span>
                            </Link>
                        </p>
                    </div>
                    <div className={cx('container-item')}>
                        <input type="text" placeholder="Email" />
                    </div>
                    <div className={cx('container-item')}>
                        <input type="text" placeholder="Phone Number" />
                    </div>
                    <input type="checkbox" />{' '}
                    <span>Email me with news and offers</span>
                    <div className={cx('breadcrums')}></div>
                    <div className={cx('container-item')}>
                        <p>Shipping address</p>
                    </div>
                    <div className={cx('container-item')}>
                        <label>Country/region</label>
                        <select>
                            <option selected>VietNam</option>
                        </select>
                    </div>
                    <div className={cx('container-item')}>
                        <input type="text" placeholder="Full Name" />
                    </div>
                    <div className={cx('container-item')}>
                        <input type="text" placeholder="Address" />
                    </div>
                    <div className={cx('container-item')}>
                        <textarea type="text" placeholder="Note" />
                    </div>
                    <div className={cx('container-button')}>
                        <div className={cx('return')}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <Link to="/cart" className={cx('link-router')}>
                                <span> Return to Cart</span>
                            </Link>
                        </div>
                        <div className={cx('button')}>
                            <button>
                                <span>Continue</span>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                    </div>
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
