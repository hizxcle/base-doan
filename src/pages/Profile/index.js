import { memo, useState, useCallback } from 'react';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import EditItem from './EditItem';
import ShowItem from './ShowItem';
import { Link } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);
function Profile() {
    const auth = useAuth();
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState(auth.userInfo);

    const saveInfo = useCallback((data) => {
        setData(data);
        setEdit(false);
    }, []);
    const editInfo = useCallback(() => {
        setEdit(true);
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('breadcrums')}>
                <Link to="/" className={cx('link-router')}>
                    {' '}
                    Home{' '}
                </Link>
                / Your Profile /
            </div>
            <h1 className={cx('header')}>Your Overview Profile</h1>
            <div className={cx('container')}>
                {edit ? (
                    <EditItem data={data} action={saveInfo} setEdit={setEdit} />
                ) : (
                    <ShowItem data={data} action={editInfo} />
                )}
            </div>
        </div>
    );
}

export default memo(Profile);
