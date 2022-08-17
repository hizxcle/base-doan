import styles from './DetailProduct.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faClose } from '@fortawesome/free-solid-svg-icons';

import { addToCart, getCart } from '~/Services';
import { useState, memo, useEffect } from 'react';
import useAuth from '~/hooks/useAuth';
import Alert from '../infoModals/AlertNotify';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const cx = classNames.bind(styles);

function DetailProduct({ setShowDetail, item, alert, setAlert }) {
    const [cart, setCart] = useState([]);

    const auth = useAuth();

    useEffect(() => {
        getCart(auth.userInfo.manguoidung).then(setCart);
    }, []);

    const handleAddToCart = () => {
        if (!filterData) {
            if (auth.isLogin) {
                if (item.soluong === 0) {
                    setAlert({
                        type: 'error',
                        message: 'This product is outstock',
                        show: true,
                    });
                } else {
                    addToCart(auth.userInfo.manguoidung, item.masp, 1);
                    setAlert({
                        type: 'success',
                        message: 'Them vao gio hang thanh cong',
                        show: true,
                    });
                }
            }
            // else { } /// Xu ly logic cho khach khong dang nhap o day4
        } else {
            setAlert({
                type: 'error',
                message: 'San pham da ton tai trong gio hang',
                show: true,
            });
        }

        getCart(auth.userInfo.manguoidung).then(setCart);
    };

    const filterData = cart.map((item) => item.masp).includes(item.masp);

    return (
        <div className={cx('wrapper')}>
            {alert.show && <Alert alert={alert} setAlert={setAlert} />}
            <div
                className={cx('container-outside')}
                onClick={() => setShowDetail(false)}
            ></div>
            <div className={cx('container')}>
                <div className={cx('container-image')}>
                    <Slide>
                        {/* {data.map((item, index) => (
                            <img
                                key={index}
                                src={`http://localhost:2222/images/${item.anhsp}`}
                                alt="anh san pham"
                                className={cx('image')}
                            />
                        ))} */}
                        <img
                            src={`http://localhost:2222/images/${item.anhdaidien}`}
                            alt="anh san pham"
                            className={cx('image')}
                        />
                    </Slide>
                </div>

                <div className={cx('container-info')}>
                    <ul className={cx('list-info')}>
                        <li>
                            {item.soluong <= 3 && (
                                <span className={cx('sale')}>-15%</span>
                            )}
                            {item.soluong >= 10 && (
                                <span className={cx('new')}>New</span>
                            )}
                            {item.soluong === 0 && (
                                <span className={cx('outstock')}>
                                    Out Stock
                                </span>
                            )}
                        </li>
                        <li className={cx('infor-nameprod')}>{item.tensp}</li>
                        <li className={cx('infor-brand')}>
                            Brand : {item.nhacungcap}
                        </li>
                        <li className={cx('infor-price')}>
                            Price :{' '}
                            {item.gia.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                            })}
                            VND
                        </li>
                        <li>Quanity : {item.soluong}</li>
                        <button
                            className={cx('button-addtocart')}
                            onClick={handleAddToCart}
                        >
                            <FontAwesomeIcon icon={faCartPlus} />
                            Add to Cart
                        </button>
                    </ul>

                    <button
                        className={cx('button-close')}
                        onClick={() => {
                            setShowDetail(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(DetailProduct);
