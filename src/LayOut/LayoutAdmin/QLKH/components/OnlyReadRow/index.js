import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

import styles from './OnlyReadRow.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function OnlyReadRow({ item, handleDelete }) {
    return (
        <tr className={cx('font')}>
            <td>{item.manguoidung}</td>
            <td>{item.tentk}</td>
            <td>{item.hoten}</td>
            <td>
                {item.gioitinh === '1'
                    ? 'Nam'
                    : item.gioitinh === '0'
                    ? 'Nữ'
                    : ''}
            </td>
            <td>{item.ngaysinh}</td>
            <td>{item.sdt}</td>
            <td>{item.diachi}</td>
            <td>{item.email}</td>
            <td>
                {item.quyen === '1'
                    ? 'User'
                    : item.quyen === '0'
                    ? 'Admin'
                    : ''}
            </td>
            <td>
                <button className={cx('edit-button')} type="button">
                    <FontAwesomeIcon icon={faCheck} /> Cấp quyền Admin
                </button>
            </td>
        </tr>
    );
}

export default OnlyReadRow;
