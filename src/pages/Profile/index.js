import { memo, useState, useCallback, useMemo } from 'react';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import EditItem from './EditItem';
import ShowItem from './ShowItem';
import ChangePasswd from './ChangePasswd';
import { Link } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);
function Profile() {
    const auth = useAuth();
    const [edit, setEdit] = useState('view'); //editInfo --- editPasswd --- view
    const [data, setData] = useState(auth.userInfo);
    const saveInfo = useCallback((data) => {
        setData(data);
        setEdit('view');
    }, []);
    const editInfo = useCallback(() => {
        setEdit('editInfo');
    }, []);
    const savePass = ({ oldPass, newPass }) => {
        const url = `http://localhost:2222/api/user/updatePasswd/${auth.userInfo.manguoidung}`;
        const opt = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                oldPass,
                newPass,
            }),
        };
        fetch(url, opt).then((res) => {
            res.json();
            if (res.status === 501)
                return alert('wrong current password, please check again!');
            else {
                setEdit('view');
            }
        });
    };
    const mess = useMemo(() => {
        return edit === 'view'
            ? 'Your Overview Profile'
            : edit === 'editInfo'
            ? 'Edit Your Information'
            : 'Change Password';
    }, [edit]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('breadcrums')}>
                <Link to="/" className={cx('link-router')}>
                    Home
                </Link>
                / Your Profile /
            </div>
            <h1 className={cx('header')}>{mess}</h1>
            <div className={cx('container')}>
                {edit === 'editInfo' ? (
                    <EditItem data={data} action={saveInfo} setEdit={setEdit} />
                ) : edit === 'view' ? (
                    <ShowItem data={data} action={editInfo} setEdit={setEdit} />
                ) : (
                    <ChangePasswd
                        data={data}
                        savePass={savePass}
                        setEdit={setEdit}
                    />
                )}
            </div>
        </div>
    );
}

export default memo(Profile);
