import styles from './DetailProduct.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faClose } from '@fortawesome/free-solid-svg-icons';

import { addToCart } from '~/Services';

const cx = classNames.bind(styles);

function DetailProduct({ setShowDetail, item }) {
    const handleAddToCart = () => {
        setShowDetail(false);
        addToCart(8, item.masp, 1);
    };

    return (
        <div className={cx('wrapper')}>
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

export default DetailProduct;
