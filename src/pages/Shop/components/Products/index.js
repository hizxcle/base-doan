import styles from './Products.module.scss';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import DetailProduct from '~/components/DetailsProduct';

const cx = classNames.bind(styles);

function Products({ data }) {
    const [showDetail, setShowDetail] = useState(false);

    const selectedRef = useRef();

    const handleShowDetail = (e, item) => {
        e.preventDefault();

        setShowDetail(true);

        selectedRef.current = item;
    };

    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    {data.map((item, index) => (
                        <div className={cx('product-item')} key={index}>
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
                                    <span className={cx('outstock')}>
                                        Out stock
                                    </span>
                                )}
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className={cx('heart')}
                                />
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
                                <span className={cx('name-product')}>
                                    {item.tensp}
                                </span>
                                <span className={cx('price-product')}>
                                    {item.gia.toLocaleString(undefined, {
                                        maximumFractionDigits: 2,
                                    })}
                                    VND
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showDetail && (
                <DetailProduct setShowDetail={setShowDetail} data={data} />
            )}
        </div>
    );
}

export default Products;
