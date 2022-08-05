import { useState, useEffect } from 'react';

import SearchBar from '~/components/SearchBar';
import Footer from '../DefaultLayout/components/Footer';
import HeaderAdmin from './components/HeaderAdmin';

import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';

import QLSP from './QLSP';
import QLKH from './QLKH';
import QLDH from './QLDH';

const cx = classNames.bind(styles);

function AdminLayout() {
    const [table, setTable] = useState('product');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:2222/api/${table}/`)
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
            });
    }, [table]);

    const handleProducts = () => {
        setTable('product');
    };

    const handleCustomer = () => {
        setTable('customer');
    };

    const handleOrder = () => {
        setTable('order');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}></div>
            <HeaderAdmin
                onChangeToProduct={handleProducts}
                onChangeToCustomer={handleCustomer}
                onChangeToOrder={handleOrder}
            />
            <SearchBar />
            {table === 'product' && <QLSP data={posts} setPosts={setPosts} />}
            {table === 'customer' && <QLKH data={posts} />}
            {table === 'order' && <QLDH data={posts} />}

            <Footer />
        </div>
    );
}

export default AdminLayout;
