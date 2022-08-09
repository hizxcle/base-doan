import classNames from 'classnames/bind';
import styles from './TotalCart.module.scss';

const cx = classNames.bind(styles);

function TotalCart({ item, cart }) {
    const filterQuantity = cart.find((item) => item.masp === item.masp);

    return (
        <div className={cx('container-right-item')}>
            <div className={cx('cart-item')}>
                <img src={`http://localhost:2222/images/${item.anhdaidien}`} />
                <span>{item.tensp}</span>
            </div>
            <span className={cx('quantity')}>{filterQuantity.soluong}</span>
            <span className={cx('price')}>
                {(item.gia * filterQuantity.soluong).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                })}{' '}
                VND
            </span>
        </div>
    );
}

export default TotalCart;
