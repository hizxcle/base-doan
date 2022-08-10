import styles from './QLSP.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { Fragment, useCallback, useRef, useState } from 'react';

import OnlyReadRow from './components/OnlyReadRow';
import EditRow from './components/EditRow';

import { getData, deleteApi } from '~/Services';
const cx = classNames.bind(styles);

function QLSP({ data, setPosts, setAlert }) {
    const [editID, setEditId] = useState(null);
    const [addPro, setAddPro] = useState({});

    const selectedRef = useRef();

    const handleAddNew = (e) => {
        e.preventDefault();
        console.log('data', addPro);
        var formData = new FormData();
        Object.keys(addPro).forEach((ele) => {
            if (ele == 'thumb') {
                return formData.append(`${ele}`, addPro[ele]);
            } else if (ele == 'images') {
                return Object.keys(addPro[ele]).forEach((ele2) => {
                    console.log('anh khac', addPro[ele][ele2]);
                    return formData.append('images', addPro[ele][ele2]);
                });
            } else {
                return formData.append(`${ele}`, `${addPro[ele]}`);
            }
        });
        const options = {
            method: 'POST',
            body: formData,
            headers: {},
        };
        fetch('http://localhost:2222/api/product', options)
            .then((res) => res.json)
            .then((res) => {
                window.location.reload();
            });
    };

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
                <form encType="multipart/form-data">
                    <p>
                        Ten san pham :
                        <input
                            className={cx('input')}
                            type="text"
                            name="tensp"
                            value={addPro.tensp || ''}
                            onChange={(e) => {
                                setAddPro({ ...addPro, tensp: e.target.value });
                            }}
                            placeholder="Nhap vao  Ten san pham...."
                        />
                    </p>
                    <p>
                        Loai San Pham :
                        <input
                            className={cx('input')}
                            type="text"
                            name="loaisp"
                            value={addPro.loaisp || ''}
                            onChange={(e) => {
                                setAddPro({
                                    ...addPro,
                                    loaisp: e.target.value,
                                });
                            }}
                            placeholder="Nhap vao Loai San Pham....."
                        />
                    </p>
                    <p>
                        Gia :
                        <input
                            className={cx('input')}
                            type="text"
                            name="gia"
                            value={addPro.gia || ''}
                            onChange={(e) => {
                                setAddPro({ ...addPro, gia: e.target.value });
                            }}
                            placeholder="Nhap vao Gia...."
                        />
                    </p>
                    <p>
                        Nha cung cap :
                        <input
                            className={cx('input')}
                            type="text"
                            name="nhacungcap"
                            value={addPro.nhacungcap || ''}
                            onChange={(e) => {
                                setAddPro({
                                    ...addPro,
                                    nhacungcap: e.target.value,
                                });
                            }}
                            placeholder="Nhap vao Nha cung cap...."
                        />
                    </p>
                    <p>
                        Don vi tinh :
                        <input
                            className={cx('input')}
                            type="text"
                            name="donvi"
                            value={addPro.donvi || ''}
                            onChange={(e) => {
                                setAddPro({ ...addPro, donvi: e.target.value });
                            }}
                            placeholder="Nhap vao Don vi tinh...."
                        />
                    </p>
                    <p>
                        So luong :
                        <input
                            className={cx('input')}
                            type="text"
                            name="soluong"
                            value={addPro.soluong || ''}
                            onChange={(e) => {
                                setAddPro({
                                    ...addPro,
                                    soluong: e.target.value,
                                });
                            }}
                            placeholder="Nhap vao So luong...."
                        />
                    </p>
                    <p>
                        Anh dai dien :
                        <input
                            className={cx('input')}
                            type="file"
                            name="thumb"
                            //  files={addPro.thumb || ''}
                            onChange={(e) => {
                                setAddPro({
                                    ...addPro,
                                    thumb: e.target.files[0],
                                });
                            }}
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
                            onChange={(e) => {
                                setAddPro({
                                    ...addPro,
                                    images: e.target.files,
                                });
                            }}
                            placeholder="Nhap vao Anh trung bay...."
                        />
                    </p>
                    <button
                        type="submit"
                        className={cx('button-add')}
                        onClick={handleAddNew}
                    >
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
