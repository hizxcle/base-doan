import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function CartItem({ item, quantityCart }) {
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(true);

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
            }, 500);
        }
    };

    return (
        <div>
            {show && (
                <li className={cx('list-item')}>
                    <span> Item {item.masp}</span>
                    <img
                        src={`http://localhost:2222/images/${item.anhdaidien}`}
                        alt="anh san pham"
                        className={cx('image')}
                    />
                    <div className={cx('info')}>
                        <span className={cx('info-name')}>{item.tensp}</span>
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
