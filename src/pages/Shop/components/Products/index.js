import styles from './Products.module.scss';
import classNames from 'classnames/bind';

import ProductItem from '../ProductItem';

const cx = classNames.bind(styles);

function Products({ data }) {
    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    {data.map((item) => (
                        <ProductItem key={item.masp} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;
