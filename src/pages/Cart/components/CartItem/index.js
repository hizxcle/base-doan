import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { deleteCartItem, getCart, updateCart } from '~/Services';
import { useState, memo } from 'react';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

function CartItem({ item, setCart }) {
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(true);
    const auth = useAuth();

    const handleMinus = async () => {
        if (quantity === 0) {
            handleDelete();
        }
        const res = await updateCart(
            auth.userInfo.manguoidung,
            item.masp,
            quantity - 1,
        );
        await res.json();
        await setQuantity(quantity - 1);
        const newData = await getCart(auth.userInfo.manguoidung);
        await setCart(newData);
    };

    const handlePlus = async () => {
        await setQuantity(quantity + 1);
        const res = await updateCart(
            auth.userInfo.manguoidung,
            item.masp,
            quantity + 1,
        );
        await res.json();
        const newData = await getCart(auth.userInfo.manguoidung);
        await setCart(newData);
    };

    const handleDelete = async () => {
        try {
            const res = await deleteCartItem(
                auth.userInfo.manguoidung,
                item.masp,
            );
            await res.json();
            await setShow(false);
            const newData = await getCart(auth.userInfo.manguoidung);
            await setCart(newData);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <tbody>
            {show && (
                <tr className={cx('table')}>
                    <td className={cx('table-item1')}>
                        <img
                            alt="anh dai dien"
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

export default memo(CartItem);
