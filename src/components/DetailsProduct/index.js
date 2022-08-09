import styles from './DetailProduct.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faClose } from '@fortawesome/free-solid-svg-icons';

import { addToCart, getCart } from '~/Services';
import { useState, memo, useEffect } from 'react';
import useAuth from '~/hooks/useAuth';
import Alert from '../infoModals/Alert';

const cx = classNames.bind(styles);

function DetailProduct({ setShowDetail, item }) {
    const [cart, setCart] = useState([]);
    const [alert, setAlert] = useState({ type: '', message: '', show: false });
    const auth = useAuth();

    useEffect(() => {
        getCart(auth.userInfo.manguoidung).then(setCart);
    }, [cart]);

    const handleAddToCart = () => {
        if (!filterData) {
            if (auth.isLogin) {
                addToCart(auth.userInfo.manguoidung, item.masp, 1);
            }
            setAlert({
                type: 'success',
                message: 'Them vao gio hang thanh cong',
                show: true,
            });
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
            <div className={cx('container')}>
                <div className={cx('container-image')}>
                    <img
                        src={`http://localhost:2222/images/${item.anhdaidien}`}
                        alt="anh san pham"
                        className={cx('image')}
                    />
                </div>

                <div className={cx('container-info')}>
                    <ul className={cx('list-info')}>
                        <li>
                            <span>In Stock</span>
                        </li>
                        <li className={cx('infor-nameprod')}>
                            Product ID {item.masp}
                        </li>
                        <li className={cx('infor-nameprod')}>{item.tensp}</li>
                        <li className={cx('infor-nameprod')}>
                            Brand : {item.nhacungcap}
                        </li>
                        <li className={cx('infor-price')}>
                            Price :{' '}
                            {item.gia.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                            })}{' '}
                            VND
                        </li>
                        <li className={cx('infor-nameprod')}>
                            quanity : {item.soluong}
                        </li>
                        <li>
                            <button
                                className={cx('button-addtocart')}
                                onClick={handleAddToCart}
                            >
                                <FontAwesomeIcon icon={faCartPlus} />
                                Add to Cart
                            </button>
                        </li>
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
