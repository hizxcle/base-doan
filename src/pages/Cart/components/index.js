import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
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
            }, 200);
        }
    };

    return (
        <tbody>
            {show && (
                <tr className={cx('table')}>
                    <td className={cx('table-item1')}>
                        <img
                            src={`http://localhost:2222/images/${item.anhdaidien}`}
                            className={cx('image')}
                        />
                        <span>{item.tensp}</span>
                    </td>
                    <td className={cx('table-item2')}>
                        {item.gia.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                        })}{' '}
                        $
                    </td>
                    <td className={cx('table-item3')}>
                        <div className={cx('quantity-box')}>
                            <button onClick={handleMinus}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span>{quantity}</span>
                            <button onClick={handlePlus}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </td>
                    <td className={cx('table-item2')}>
                        <div className={cx('total-box')}>
                            <span>
                                {(item.gia * quantity).toLocaleString(
                                    undefined,
                                    {
                                        maximumFractionDigits: 2,
                                    },
                                )}{' '}
                                $
                            </span>
                            <button onClick={handleDelete}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </td>
                </tr>
            )}
        </tbody>
    );
}

export default CartItem;
