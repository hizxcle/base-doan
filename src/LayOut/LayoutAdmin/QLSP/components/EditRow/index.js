import { getData, updateApi } from '~/Services';

import { useMemo, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faSave, faClose } from '@fortawesome/free-solid-svg-icons';

import styles from './EditRow.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function EditRow({ item, handleCancel, selectedProduct, setPosts }) {
    console.log('item', selectedProduct);
    const [inputValue, setInputValue] = useState({
        tensp: selectedProduct.tensp,
        loaisp: selectedProduct.loaisp,
        gia: selectedProduct.gia,
        nhacungcap: selectedProduct.nhacungcap,
        donvi: selectedProduct.donvi,
        soluong: selectedProduct.soluong,
        anhdaidien: selectedProduct.anhdaidien,
        anhsp: selectedProduct.anhsp,
    });
    let anhsp = useMemo(() => {
        return inputValue.anhsp.split('||');
    }, [inputValue.anhsp]);

    console.log('input val', inputValue);
    console.log('anh sp', anhsp);

    const deleteAvatar = () => {
        setInputValue({ ...inputValue, anhdaidien: '' });
    };
    const deleteOtherImg = (img) => {
        console.log('img', img);
        console.log('anhsp', anhsp);
        let val = anhsp.filter((ele) => ele != img);

        if (val.length > 1) {
            val = val.join('||');
        }
        if (val.length == 1) {
            val = val[0];
        }
        if (val.length < 1) {
            val = '';
        }
        console.log('val', val);
        setInputValue({ ...inputValue, anhsp: val });
    };
    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            Object.keys(inputValue).forEach((ele) => {
                if (ele == 'thumb') {
                    return formData.append(`${ele}`, inputValue[ele]);
                } else if (ele == 'images') {
                    return Object.keys(inputValue[ele]).forEach((ele2) => {
                        console.log('anh khac', inputValue[ele][ele2]);
                        return formData.append('images', inputValue[ele][ele2]);
                    });
                } else {
                    return formData.append(`${ele}`, `${inputValue[ele]}`);
                }
            });
            const res = await updateApi(
                'product',
                selectedProduct.masp,
                formData,
            );
            const response = await res.json();
            if (response?.status !== 'OK') {
                console.log('Error');
            } else {
                const newData = await getData();
                console.log('new data', newData);
                await setPosts(newData);
                console.log('Success');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('image-section')}>
                    {inputValue.anhdaidien && (
                        <div className={cx('img-box', 'avatar-img')}>
                            <p className={cx('img-name')}>avatar</p>
                            <img
                                className={cx('img-view')}
                                src={`http://localhost:2222/images/${inputValue.anhdaidien}`}
                                alt={inputValue.anhdaidien}
                            />
                            <button
                                onClick={deleteAvatar}
                                className={cx('btn-delete-img')}
                            >
                                <span>delete</span>
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </div>
                    )}
                    {inputValue.anhsp &&
                        anhsp.map((ele, index) => {
                            return (
                                <div
                                    key={index}
                                    className={cx('img-box', 'other-img')}
                                >
                                    <p
                                        className={cx('img-name')}
                                    >{`img ${index}`}</p>
                                    <img
                                        className={cx('img-view')}
                                        src={`http://localhost:2222/images/${ele}`}
                                        alt={ele}
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            deleteOtherImg(ele);
                                        }}
                                        className={cx('btn-delete-img')}
                                    >
                                        <span>delete</span>
                                        <FontAwesomeIcon icon={faClose} />
                                    </button>
                                </div>
                            );
                        })}
                </div>
                <tr className={cx('header')}>
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
                <tr className={cx('edit-items')}>
                    <td>{item.masp}</td>
                    <td className={cx('ten')}>
                        <input
                            className={cx('input-large')}
                            type="text"
                            placeholder="Ten san pham"
                            value={inputValue.tensp}
                            onChange={(e) => {
                                setInputValue({
                                    ...inputValue,
                                    tensp: e.target.value,
                                });
                            }}
                        ></input>
                    </td>
                    <td>
                        <input
                            className={cx('input-medium')}
                            type="text"
                            placeholder="Loai san pham"
                            value={inputValue.loaisp}
                            onChange={(e) => {
                                setInputValue({
                                    ...inputValue,
                                    loaisp: e.target.value,
                                });
                            }}
                        />
                    </td>
                    <td>
                        <input
                            className={cx('input-medium')}
                            type="text"
                            placeholder="Gia"
                            value={inputValue.gia}
                            onChange={(e) => {
                                setInputValue({
                                    ...inputValue,
                                    gia: e.target.value,
                                });
                            }}
                        />
                    </td>
                    <td>
                        <input
                            className={cx('input-medium')}
                            type="text"
                            placeholder="Nha cung cap"
                            value={inputValue.nhacungcap}
                            onChange={(e) => {
                                setInputValue({
                                    ...inputValue,
                                    nhacungcap: e.target.value,
                                });
                            }}
                        />
                    </td>
                    <td>
                        <input
                            className={cx('input-small')}
                            type="text"
                            placeholder="Don vi"
                            value={inputValue.donvi}
                            onChange={(e) => {
                                setInputValue({
                                    ...inputValue,
                                    donvi: e.target.value,
                                });
                            }}
                        />
                    </td>
                    <td>
                        <input
                            className={cx('input-small')}
                            type="text"
                            placeholder="So luong"
                            value={inputValue.soluong}
                            onChange={(e) => {
                                setInputValue({
                                    ...inputValue,
                                    soluong: e.target.value,
                                });
                            }}
                        />
                    </td>
                    <td>
                        <input
                            className={cx('input-large')}
                            type="file"
                            placeholder="Anh dai dien"
                            name="thumb"
                            // value={inputValue.anhdaidien}
                            onChange={(e) => {
                                console.log('anh ', e.target.files);
                                setInputValue({
                                    ...inputValue,
                                    thumb: e.target.files[0],
                                });
                            }}
                        />
                    </td>
                    <td>
                        <input
                            className={cx('input-large')}
                            // value={inputValue.anhsp}
                            // onChange={(e) => {
                            //     setInputValue({
                            //         ...inputValue,
                            //         anhsp: e.target.value,
                            //     });
                            // }}
                            type="file"
                            placeholder="Anh trung bay"
                            multiple
                            name="images"
                            onChange={(e) => {
                                setInputValue({
                                    ...inputValue,
                                    images: e.target.files,
                                });
                            }}
                        />
                    </td>
                    <td>
                        <button
                            className={cx('edit-button')}
                            onClick={handleUpdate}
                        >
                            <FontAwesomeIcon icon={faSave} /> Lưu
                        </button>
                    </td>
                    <td>
                        <button
                            className={cx('delete-button')}
                            onClick={handleCancel}
                        >
                            <FontAwesomeIcon icon={faCancel} /> Hủy
                        </button>
                    </td>
                </tr>
            </div>
        </div>
    );
}

export default EditRow;
