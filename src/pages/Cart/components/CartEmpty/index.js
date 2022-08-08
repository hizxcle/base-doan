import styles from './CartEmpty.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CartEmpty() {
    return (
        <div className={cx('container-empty')}>
            <FontAwesomeIcon
                icon={faCartArrowDown}
                className={cx('icon-empty')}
            />
            <p>Your cart is currently empty.</p>
            <button>
                <Link to="/shop" className={cx('link-router')}>
                    RETURN TO SHOP
                </Link>
            </button>
        </div>
    );
}

export default CartEmpty;
