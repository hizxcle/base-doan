import { memo, Fragment, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Table.module.scss';
import useAuth from '~/hooks/useAuth';
import OnlyReadRow from '../OnlyReadRow';
const cx = classNames.bind(styles);

const Table = ({ type = 'user', data: dt, delUser, authSign, viewOrders }) => {
    const data = useMemo(() => {
        return dt.filter((ele) => {
            if (type === 'user') {
                return ele.quyen == 1;
            } else {
                return ele.quyen != 1;
            }
        });
    }, [dt]);
    const auth = useAuth();
    const isSuper = auth.userInfo.Quyen === 'superAdmin';
    const headerMessage = type === 'admin' ? 'Admin list' : 'User list';
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('table-header')}>{headerMessage}</h3>
            <table border="1" className={cx('table')}>
                <thead>
                    <tr>
                        <th className={cx('small')}>User code</th>
                        <th>User Name</th>
                        <th>Full name</th>
                        <th>Gender</th>
                        <th>Date of birth</th>
                        <th>Phone number</th>
                        <th>Adress</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>view past Order</th>
                        {isSuper && (
                            <Fragment>
                                <th>Action</th>
                                <th>Restrict account</th>
                            </Fragment>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((ele, index) => (
                        <OnlyReadRow
                            key={index}
                            data={ele}
                            delUser={delUser}
                            authSign={authSign}
                            viewOrders={viewOrders}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default memo(Table);
