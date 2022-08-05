import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';

import styles from './ProductItem.module.scss';
import classNames from 'classnames/bind';

import DetailProduct from '~/components/DetailsProduct';

const cx = classNames.bind(styles);

function ProductItem({ item, handleShowDetail, showDetail, setShowDetail }) {
    return (
        <div>
            <div className={cx('product-item')}>
                <div className={cx('thumbs')}>
                    <img
                        className={cx('thumbs-img')}
                        src={`http://localhost:2222/images/${item.anhdaidien}`}
                        alt={item.tensp}
                    />
                    {item.soluong <= 2 && (
                        <span className={cx('sale')}>-15%</span>
                    )}
                    {item.soluong >= 5 && (
                        <span className={cx('new')}>New</span>
                    )}
                    {item.soluong === 0 && (
                        <span className={cx('outstock')}>Out Stock</span>
                    )}
                    <FontAwesomeIcon icon={faHeart} className={cx('heart')} />
                    <button
                        className={cx('view-details')}
                        onClick={(e) => handleShowDetail(e, item.masp)}
                    >
                        <FontAwesomeIcon
                            icon={faEye}
                            className={cx('view-details-icon')}
                        />
                    </button>
                </div>
                <div className={cx('info')}>
                    <span className={cx('name-product')}>{item.tensp}</span>
                    <span className={cx('price-product')}>
                        {item.gia.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                        })}
                        VND
                    </span>
                </div>
            </div>
            {showDetail && (
                <DetailProduct item={item} setShowDetail={setShowDetail} />
            )}
        </div>
    );
}

export default ProductItem;
