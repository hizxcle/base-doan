import classNames from 'classnames/bind';
import styles from './SearchProducts.module.scss';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function SearchProducts({ name, type, searchValue }) {
    const [prod, setProd] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:2222/api/product`)
            .then((res) => res.json())
            .then((res) => setProd(res));
    }, []);

    const filterType1 = prod.filter((item) => item.loaisp === type[0]);
    const filterType2 = prod.filter((item) => item.loaisp === type[1]);
    const filterType3 = prod.filter((item) => item.loaisp === type[2]);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Find with '{searchValue}' </p>
            <p className={cx('title1')}>Name Product</p>
            <div className={cx('container')}>
                {name.map((item, index) => (
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
                        </div>
                        <div className={cx('info')}>
                            <a className={cx('name-product')}>{item.tensp}</a>
                            <span className={cx('price-product')}>
                                {item.gia.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                })}{' '}
                                VND
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <p className={cx('title1')}>Type of Product</p>
            <div className={cx('container')}>
                {filterType1 && (
                    <div className={cx('container-inner')}>
                        <p className={cx('title1')}>{type[0]}</p>
                        {filterType1.map((item, index) => (
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
                                </div>
                                <div className={cx('info')}>
                                    <a className={cx('name-product')}>
                                        {item.tensp}
                                    </a>
                                    <span className={cx('price-product')}>
                                        {item.gia.toLocaleString(undefined, {
                                            maximumFractionDigits: 2,
                                        })}{' '}
                                        VND
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {filterType2 && (
                    <div className={cx('container-inner')}>
                        <p className={cx('title1')}>{type[1]}</p>
                        {filterType2.map((item, index) => (
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
                                </div>
                                <div className={cx('info')}>
                                    <a className={cx('name-product')}>
                                        {item.tensp}
                                    </a>
                                    <span className={cx('price-product')}>
                                        {item.gia.toLocaleString(undefined, {
                                            maximumFractionDigits: 2,
                                        })}{' '}
                                        VND
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {filterType3 && (
                    <div className={cx('container-inner')}>
                        <p className={cx('title1')}>{type[2]}</p>
                        {filterType3.map((item, index) => (
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
                                </div>
                                <div className={cx('info')}>
                                    <a className={cx('name-product')}>
                                        {item.tensp}
                                    </a>
                                    <span className={cx('price-product')}>
                                        {item.gia.toLocaleString(undefined, {
                                            maximumFractionDigits: 2,
                                        })}{' '}
                                        VND
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchProducts;
