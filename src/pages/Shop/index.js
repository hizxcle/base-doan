import classNames from 'classnames/bind';
import Products from '~/components/Products';
import styles from './Shop.module.scss';

const cx = classNames.bind(styles);

function Shop() {
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
                            <option className={cx('select-op')} selected>
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
                    <span className={cx('quantity-prods')}>29 products</span>
                </div>
                <Products />
            </div>
        </div>
    );
}

export default Shop;
