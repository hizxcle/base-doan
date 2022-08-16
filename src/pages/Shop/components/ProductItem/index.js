import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

import { getProductById } from '~/Services';

import styles from './ProductItem.module.scss';
import classNames from 'classnames/bind';

import DetailProduct from '~/components/DetailsProduct';

const cx = classNames.bind(styles);

function ProductItem({ item }) {
    const [showDetail, setShowDetail] = useState(false);
    const [selected, setSelected] = useState([]);
    const [alert, setAlert] = useState({ type: '', message: '', show: false });

    const handleShowDetail = () => {
        setShowDetail(true);
        getProductById(item.masp).then(setSelected);
    };

    return (
        <div className={cx('product-item')}>
            <div className={cx('thumbs')}>
                <img
                    className={cx('thumbs-img')}
                    src={`http://localhost:2222/images/${item.anhdaidien}`}
                    alt={item.tensp}
                />
                {item.soluong <= 3 && <span className={cx('sale')}>-15%</span>}
                {item.soluong >= 10 && <span className={cx('new')}>New</span>}
                {item.soluong === 0 && (
                    <span className={cx('outstock')}>Out Stock</span>
                )}
                <FontAwesomeIcon icon={faHeart} className={cx('heart')} />
                <button
                    className={cx('view-details')}
                    onClick={handleShowDetail}
                >
                    <FontAwesomeIcon
                        icon={faEye}
                        className={cx('view-details-icon')}
                    />
                </button>
            </div>
            <div className={cx('info')}>
                <span className={cx('name-product-sale')}>{item.tensp}</span>
                {item.soluong <= 2 && item.soluong > 0 ? (
                    <>
                        <span className={cx('price-product-sale')}>
                            {item.gia.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                            })}
                            VND
                        </span>
                        <span className={cx('price-product-sale', 'red')}>
                            {(item.gia * 0.85).toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                            })}
                            VND
                        </span>
                    </>
                ) : (
                    <span className={cx('price-product')}>
                        {item.gia.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                        })}
                        VND
                    </span>
                )}

                <span className={cx('price-product')}>
                    {item.gia.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                    })}
                    VND
                </span>
            </div>
            {showDetail && (
                <DetailProduct
                    alert={alert}
                    setAlert={setAlert}
                    item={item}
                    setShowDetail={setShowDetail}
                    selected={selected}
                />
            )}
        </div>
    );
}

export default ProductItem;
