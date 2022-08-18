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

    const totalPrice = item.gia * quantity;

    const handleMinus = async () => {
        if (quantity < 2) {
            setTimeout(() => {
                handleDelete();
            }, 500);
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
        if (quantity < item.soluong) {
            await setQuantity(quantity + 1);
            const res = await updateCart(
                auth.userInfo.manguoidung,
                item.masp,
                quantity + 1,
            );
            await res.json();
            const newData = await getCart(auth.userInfo.manguoidung);
            await setCart(newData);
        }
    };

    const handleDelete = async () => {
        setShow(false);
        try {
            const res = await deleteCartItem(
                auth.userInfo.manguoidung,
                item.masp,
            );
            await res.json();
            const newData = await getCart(auth.userInfo.manguoidung);
            await setCart(newData);
        } catch (e) {
            console.log(e);
        }
    };
    const handleInput = (e) => {
        const test = async () => {
            let val = e.target.value.match(/\d+/g);
            if (val > item.soluong) {
                val = item.soluong;
            }
            if (val < 0) {
                val = 0;
            }
            console.log(val);
            await setQuantity(Number(val));
            const res = await updateCart(
                auth.userInfo.manguoidung,
                item.masp,
                quantity,
            );
            await res.json();
            const newData = await getCart(auth.userInfo.manguoidung);
            await setCart(newData);
        };
        test();
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
                        VND
                    </td>
                    <td className={cx('table-item3')}>
                        <div className={cx('quantity-box')}>
                            <button onClick={handleMinus}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span>
                                <input
                                    className={cx('input-quantity')}
                                    type="text"
                                    value={quantity}
                                    onChange={handleInput}
                                />
                            </span>
                            <button onClick={handlePlus}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </td>
                    <td className={cx('table-item2')}>
                        <div className={cx('total-box')}>
                            <span>
                                {totalPrice.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                })}{' '}
                                VND
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
