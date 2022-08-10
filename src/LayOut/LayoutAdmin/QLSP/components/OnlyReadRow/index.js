import { useState } from 'react';
import styles from './OnlyReadRow.module.scss';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import AlertWarning from '~/components/infoModals/AlertWarning';

const cx = classNames.bind(styles);

function OnlyReadRow({ item, handleEdit, handleDelete }) {
    const [deleting, setDeleting] = useState(false);
    return (
        <tr className={cx('font')}>
            <td>{item.masp}</td>
            <td>{item.tensp}</td>
            <td>{item.loaisp}</td>
            <td>{item.gia}</td>
            <td>{item.nhacungcap}</td>
            <td>{item.donvi}</td>
            <td>{item.soluong}</td>
            <td>
                {item.anhdaidien}
                <img
                    className={cx('img-item')}
                    alt="anh dai dien"
                    src={`http://localhost:2222/images/${item.anhdaidien}`}
                />
            </td>
            <td className={cx('album-images')}>
                {item.anhsp}
                {/* <img
                    className={cx('img-item')}
                    src={`http://localhost:2222/images/${item.anhsp}`}
                    alt="Anh san pham"
                /> */}
            </td>
            <td>
                <button
                    className={cx('edit-button')}
                    type="button"
                    onClick={(e) => handleEdit(e, item)}
                >
                    <FontAwesomeIcon icon={faPenToSquare} /> Sửa
                </button>
            </td>
            <td>
                <button
                    className={cx('delete-button')}
                    type="button"
                    onClick={() => {
                        handleDelete(item.masp);
                    }}
                >
                    <FontAwesomeIcon icon={faTrash} /> Xóa
                </button>
            </td>
        </tr>
    );
}

export default OnlyReadRow;
