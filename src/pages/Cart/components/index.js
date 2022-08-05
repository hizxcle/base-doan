import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getCart } from '~/Services';

const cx = classNames.bind(styles);

function CartItem({ item }) {
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(true);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getCart(8).then(setCart);
    }, []);

    const handleMinus = () => {
        setQuantity(quantity - 1);
        handleDelete();
    };

    const handlePlus = () => {
        setQuantity(quantity + 1);
    };

    const handleDelete = () => {
        if (quantity === 1) {
            setTimeout(() => {
                setShow(false);
            }, 300);
        }
    };

    return (
        <div>
            {show && (
                <li className={cx('list-item')}>
                    <img
                        src={`http://localhost:2222/images/${item.anhdaidien}`}
                        alt="anh san pham"
                        className={cx('image')}
                    />
                    <div className={cx('info')}>
                        <div className={cx('info-calc')}>
                            <span className={cx('info-name')}>
                                <p className={cx('id')}>
                                    {' '}
                                    Product ID {item.masp}
                                </p>
                                {item.tensp}
                            </span>

                            <button
                                className={cx('button-2')}
                                onClick={handleMinus}
                            >
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </div>
                        <div className={cx('info-calc')}>
                            <span>
                                Quantity :
                                <button
                                    className={cx('button-1')}
                                    onClick={handleMinus}
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <span>{quantity}</span>
                                <button className={cx('button-1')}>
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        onClick={handlePlus}
                                    />
                                </button>
                            </span>
                            <span>Total : {quantity * item.gia}</span>
                        </div>
                    </div>
                </li>
            )}
        </div>
    );
}

export default CartItem;
