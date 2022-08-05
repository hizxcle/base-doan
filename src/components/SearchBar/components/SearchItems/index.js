import classNames from 'classnames/bind';
import styles from './SearchItems.module.scss';

const cx = classNames.bind(styles);

function SearchItems({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <img
                    src={`http://localhost:2222/images/${data.anhdaidien}`}
                    alt={data.tensp}
                    className={cx('img-product')}
                />

                <div className={cx('product-info')}>
                    <div className={cx('name-sale')}>
                        <p className={cx('name-products')}>{data.tensp}</p>
                    </div>
                    <div className={cx('cost-quanity')}>
                        <span className={cx('cost-products')}>
                            {data.gia.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                            })}{' '}
                            VND
                        </span>
                        <span className={cx('quanity-products')}>
                            So luong : {data.soluong}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchItems;
