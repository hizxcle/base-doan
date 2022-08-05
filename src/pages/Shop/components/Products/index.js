import styles from './Products.module.scss';
import classNames from 'classnames/bind';

import { useState } from 'react';

import { getProductById } from '~/Services';
import ProductItem from '../ProductItem';

const cx = classNames.bind(styles);

function Products({ data }) {
    const [showDetail, setShowDetail] = useState(false);

    const handleShowDetail = async (e, id) => {
        e.preventDefault();
        setShowDetail(true);

        try {
            const res = await getProductById(id);
            await res.json();
            console.log(res);
            console.log(id);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    {data.map((item) => (
                        <ProductItem
                            item={item}
                            key={item.masp}
                            handleShowDetail={handleShowDetail}
                            showDetail={showDetail}
                            setShowDetail={setShowDetail}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;
