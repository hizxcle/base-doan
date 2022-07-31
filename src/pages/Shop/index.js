import classNames from 'classnames/bind';
import styles from './Shop.module.scss';

import { useEffect, useState } from 'react';

import Products from '~/components/Products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Shop() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:2222/api/product/`)
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('breadcrums')}>
                <p className={cx('breadcrums-text')}>Home / Products /</p>
            </div>
            <div className={cx('div')}></div>
            <div className={cx('shop-container')}>
                <h2 className={cx('header-text')}>Products</h2>
                <div className={cx('collections-filter')}>
                    <div className={cx('sort-by')}>
                        <label className={cx('sort-text')}> Sort by : </label>
                        <select className={cx('select')}>
                            <option className={cx('select-op')}>
                                Alphabetically, A-Z
                            </option>
                            <option className={cx('select-op')}>
                                Alphabetically, Z-A
                            </option>
                            <option className={cx('select-op')}>
                                Best selling
                            </option>
                        </select>
                    </div>
                    <span className={cx('quantity-prods')}>
                        {posts.length} products
                    </span>
                </div>
                <Products data={posts} />
                <div className={cx('pagination')}>
                    <p className={cx('total-page')}>
                        1-12 products of {posts.length}
                    </p>
                    <ul>
                        <div className={cx('pagination-pages')}>
                            <span className={cx('pagination-item')}>1</span>
                            <a href="#" className={cx('pagination-item')}>
                                2
                            </a>
                            <a href="#" className={cx('pagination-item')}>
                                3
                            </a>
                        </div>
                        <span className={cx('next-button')}>
                            Next
                            <FontAwesomeIcon icon={faArrowRight} />
                        </span>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Shop;
