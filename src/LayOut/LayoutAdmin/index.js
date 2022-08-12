import { useState, useEffect } from 'react';

import Footer from '../DefaultLayout/components/Footer';
import HeaderAdmin from './components/HeaderAdmin';

import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';

import QLSP from './QLSP';
import QLKH from './QLKH';
import QLDH from './QLDH';
import SearchBarAdmin from '~/LayOut/LayoutAdmin/components/SearchBarAdmin';

const cx = classNames.bind(styles);

function AdminLayout() {
    const [table, setTable] = useState('product');
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:2222/api/${table}`)
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
            })
            .catch((res) => {
                setPosts([]);
            });
        fetch(`http://localhost:2222/api/user/allUser`)
            .then((res) => res.json())
            .then((res) => {
                setUser(res);
            });
    }, [table]);

    const handleProducts = () => {
        setTable('product');
    };

    const handleCustomer = () => {
        setTable('user');
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
                user={user}
            />
            <SearchBarAdmin />
            {table === 'product' && <QLSP data={posts} setPosts={setPosts} />}
            {(table.includes('user/') || table === 'user') && (
                <QLKH data={posts} setTable={setTable} />
            )}
            {(table.includes('order/getByMakh') || table === 'order') && (
                <QLDH
                    data={posts}
                    setTable={setTable}
                    isSearch={table === 'order' ? false : true}
                />
            )}

            <Footer />
        </div>
    );
}

export default AdminLayout;
