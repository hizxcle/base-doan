import { Fragment, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

import styles from './OnlyReadRow.module.scss';
import classNames from 'classnames/bind';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

function OnlyReadRow({ data, delUser, authSign, viewOrders }) {
    const auth = useAuth();
    const isSuper = auth.userInfo.Quyen === 'superAdmin';
    const isAdData = data.quyen == 0;
    return (
        <tr className={cx('font')}>
            <td>{data.manguoidung}</td>
            <td>{data.tentk}</td>
            <td>{data.hoten}</td>
            <td>
                {data.gioitinh === '1'
                    ? 'Male'
                    : data.gioitinh === '0'
                    ? 'Female'
                    : ''}
            </td>
            <td>{data.ngaysinh}</td>
            <td>{data.sdt}</td>
            <td>{data.diachi}</td>
            <td>{data.email}</td>
            <td>
                {data.quyen === '1'
                    ? 'User'
                    : data.quyen === '0'
                    ? 'Admin'
                    : 'Super Admin'}
            </td>
            {(data.quyen != 2 || isSuper) && (
                <td>
                    <button
                        className={cx('edit-button')}
                        type="button"
                        onClick={() => {
                            viewOrders(data.manguoidung);
                        }}
                    >
                        <FontAwesomeIcon icon={faCheck} />
                        View past orders
                    </button>
                </td>
            )}
            {data.quyen != 2 && isSuper && (
                <Fragment>
                    <td>
                        <button
                            className={cx('edit-button')}
                            type="button"
                            onClick={() => {
                                const id = data.manguoidung;
                                if (isAdData) {
                                    authSign({ id, quyen: 1 });
                                } else {
                                    authSign({ id, quyen: 0 });
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faCheck} />{' '}
                            {isAdData ? 'remove permission' : 'Admin authorize'}
                        </button>
                    </td>
                    <td>
                        <button
                            className={cx('edit-button')}
                            type="button"
                            onClick={() => {
                                delUser(data.manguoidung);
                            }}
                        >
                            <FontAwesomeIcon icon={faCheck} /> Restrict account
                        </button>
                    </td>
                </Fragment>
            )}
        </tr>
    );
}

export default memo(OnlyReadRow);
