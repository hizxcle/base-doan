import styles from './QLSP.module.scss';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ProductTable({ data }) {
    const [method, setMethod] = useState('');

    const handleEdit = (e) => {
        e.preventDefault();
        setMethod('get');
    };

    const handleDelete = (e) => {
        e.preventDefault();
        setMethod('delete');
    };

    return (
        <div>
            <div className={cx('form')}>
                <form
                    action="http://localhost:2222/api/product"
                    method="post"
                    enctype="multipart/form-data"
                >
                    <p>
                        Ten san pham :
                        <input
                            className={cx('input')}
                            type="text"
                            name="tensp"
                            placeholder="Nhap vao  Ten san pham...."
                        />
                    </p>
                    <p>
                        Loai San Pham :
                        <input
                            className={cx('input')}
                            type="text"
                            name="loaisp"
                            placeholder="Nhap vao Loai San Pham....."
                        />
                    </p>
                    <p>
                        Gia :
                        <input
                            className={cx('input')}
                            type="text"
                            name="gia"
                            placeholder="Nhap vao Gia...."
                        />
                    </p>
                    <p>
                        Nha cung cap :
                        <input
                            className={cx('input')}
                            type="text"
                            name="nhacungcap"
                            placeholder="Nhap vao Nha cung cap...."
                        />
                    </p>
                    <p>
                        Don vi tinh :
                        <input
                            className={cx('input')}
                            type="text"
                            name="donvi"
                            placeholder="Nhap vao Don vi tinh...."
                        />
                    </p>
                    <p>
                        So luong :
                        <input
                            className={cx('input')}
                            type="text"
                            name="soluong"
                            placeholder="Nhap vao So luong...."
                        />
                    </p>
                    <p>
                        Anh dai dien :
                        <input
                            className={cx('input')}
                            type="file"
                            name="thumb"
                            placeholder="Nhap vao Anh dai dien...."
                        />
                    </p>
                    <p>
                        Anh trung bay san pham :
                        <input
                            className={cx('input')}
                            type="file"
                            multiple
                            name="images"
                            placeholder="Nhap vao Anh trung bay...."
                        />
                    </p>
                    <button type="submit" className={cx('button-add')}>
                        Add product
                    </button>
                </form>
            </div>

            <form
                action="http://localhost:2222/api/product/:masp"
                method={method}
                enctype="multipart/form-data"
            >
                <table border="1" className={cx('table')}>
                    <thead>
                        <tr>
                            <th>Ma San pham</th>
                            <th>Tên sản phẩm</th>
                            <th>Loại sản phẩm</th>
                            <th>Gia</th>
                            <th>Nha cung cap</th>
                            <th>Don vi</th>
                            <th>So luong</th>
                            <th>Anh dai dien</th>
                            <th className={cx('album-images')}>Anh khac</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.masp} className={cx('font')}>
                                <td>{item.masp}</td>
                                <td>{item.tensp}</td>
                                <td>{item.loaisp}</td>
                                <td>{item.gia}</td>
                                <td>{item.nhacungcap}</td>
                                <td>{item.donvi}</td>
                                <td>{item.soluong}</td>
                                <td>{item.anhdaidien}</td>
                                <td className={cx('album-images')}>
                                    {item.anhsp}
                                </td>
                                <td>
                                    <button
                                        className={cx('edit-button')}
                                        onClick={handleEdit}
                                        type="submit"
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />{' '}
                                        Sửa
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={cx('delete-button')}
                                        onClick={handleDelete}
                                        type="submit"
                                    >
                                        <FontAwesomeIcon icon={faTrash} /> Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    );
}
export default ProductTable;
