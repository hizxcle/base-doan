import { memo, useState, useCallback } from 'react';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import EditItem from './EditItem';
import ShowItem from './ShowItem';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);
function Profile() {
    const auth = useAuth();
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState(auth.userInfo);
    console.log('user', data);

    const saveInfo = useCallback((data) => {
        setData(data);
        setEdit(false);
    }, []);
    const editInfo = useCallback(() => {
        setEdit(true);
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('header')}>Overview Profile</h1>
            {edit ? (
                <EditItem data={data} action={saveInfo} />
            ) : (
                <ShowItem data={data} action={editInfo} />
            )}
        </div>
    );
}

export default memo(Profile);
