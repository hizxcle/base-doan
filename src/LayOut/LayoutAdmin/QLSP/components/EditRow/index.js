import { getData, updateApi } from '~/Services';

import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faSave } from '@fortawesome/free-solid-svg-icons';

import styles from './EditRow.module.scss';
import classNames from 'classnames/bind';
import Alert from '~/components/infoModals/Alert';

const cx = classNames.bind(styles);

function EditRow({ item, handleCancel, selectedProduct, setPosts }) {
    const [alert, setAlert] = useState({
        type: '',
        message: '',
        show: false,
    });

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
    console.log(inputValue);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            Object.keys(inputValue).forEach((Element) => {
                formData.append(`${Element}`, `${inputValue[Element]}`);
            });
            const res = await updateApi(
                'product',
                selectedProduct.masp,
                formData,
            );
            const response = await res.json();
            if (response?.status !== 'OK') {
                setAlert({
                    type: 'error',
                    message: 'Update fail',
                    show: true,
                });
            } else {
                const newData = await getData();
                console.log('new data', newData);
                await setPosts(newData);
                setAlert({
                    type: 'success',
                    message: 'Update success',
                    show: true,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <tr>
            {alert.show && <Alert alert={alert} setAlert={setAlert} />}
            <td>{item.masp}</td>
            <td className={cx('ten')}>
                <input
                    className={cx('input-large')}
                    type="text"
                    placeholder="Ten san pham"
                    value={inputValue.tensp}
                    onChange={(e) => {
                        setInputValue({ ...inputValue, tensp: e.target.value });
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
                        setInputValue({ ...inputValue, gia: e.target.value });
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
                        setInputValue({ ...inputValue, donvi: e.target.value });
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

                    // value={inputValue.anhdaidien}
                    // onChange={(e) => {
                    //     setInputValue({
                    //         ...inputValue,
                    //         anhdaidien: e.target.value,
                    //     });
                    // }}
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
                />
            </td>
            <td>
                <button className={cx('edit-button')} onClick={handleUpdate}>
                    <FontAwesomeIcon icon={faSave} /> Lưu
                </button>
            </td>
            <td>
                <button className={cx('delete-button')} onClick={handleCancel}>
                    <FontAwesomeIcon icon={faCancel} /> Hủy
                </button>
            </td>
        </tr>
    );
}

export default EditRow;
