import styles from './QLSP.module.scss';
import classNames from 'classnames/bind';

import { Fragment, useRef, useState } from 'react';

import OnlyReadRow from './components/OnlyReadRow';
import EditRow from './components/EditRow';

import { getData, deleteApi } from '~/Services';
const cx = classNames.bind(styles);

function QLSP({ data, setPosts, setAlert }) {
    const [editID, setEditId] = useState(null);

    const selectedRef = useRef();

    const handleEdit = (e, item) => {
        e.preventDefault();
        setEditId(item.masp);
        selectedRef.current = item;
    };

    const handleCancel = () => {
        setEditId(null);
    };

    const handleDelete = async (idProduct) => {
        try {
            const res = await deleteApi('product', idProduct);
            await res.json();
            const newData = await getData();
            setPosts(newData);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <p>QUẢN LÝ SẢN PHẨM</p>
            </div>

            <div className={cx('form')}>
                <form
                    action="http://localhost:2222/api/product"
                    method="post"
                    encType="multipart/form-data"
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

            <form encType="multipart/form-data">
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
                        {data.map((item, index) => (
                            <Fragment key={index}>
                                {editID === item.masp ? (
                                    <EditRow
                                        item={item}
                                        setAlert={setAlert}
                                        handleCancel={handleCancel}
                                        selectedProduct={{
                                            ...selectedRef.current,
                                        }}
                                        setPosts={setPosts}
                                    />
                                ) : (
                                    <OnlyReadRow
                                        item={item}
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default QLSP;
