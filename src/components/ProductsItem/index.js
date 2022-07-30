import classNames from 'classnames/bind';
import styles from './ProductsItem.module.scss';

const cx = classNames.bind(styles);

function ProductsItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                src="https://cdn.shopify.com/s/files/1/0453/5035/5103/files/img_02_130x30_crop_center.png?v=1644318438"
                alt="Product"
                className={cx('img-product')}
            />
            <div className={cx('product-info')}>
                <div className={cx('name-sale')}>
                    <p className={cx('name-products')}> Ten san pham</p>
                    <p className={cx('sale-product')}> -31% </p>
                </div>
                <div className={cx('cost-quanity')}>
                    <span className={cx('cost-products')}>120.000VND</span>
                    <span className={cx('quanity-products')}>So luong : 2</span>
                </div>
            </div>
        </div>
    );
}

export default ProductsItem;
