import styles from './OnlyReadRow.module.scss';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function OnlyReadRow({ item, handleEdit, handleDelete }) {
    return (
        <tr key={item.masp} className={cx('font')}>
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
                    alt="anh dai dien"
                    src={`http://localhost:2222/api/product/${item.anhdaidien}`}
                />
            </td>
            <td className={cx('album-images')}>
                {item.anhsp}
                <img
                    src={`http://localhost:2222/api/product/${item.anhsp}||`}
                    alt="Anh san pham"
                />
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
