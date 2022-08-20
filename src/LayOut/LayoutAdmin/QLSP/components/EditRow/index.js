import { getData, updateApi } from '~/Services';

import { useMemo, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faSave, faClose } from '@fortawesome/free-solid-svg-icons';
import validator from '~/utils/validator.utils';

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
        <tr className={cx('edit-items')}>
            <td>{item.masp}</td>
            <td className={cx('ten')}>
                <input
                    className={cx('input-large')}
                    type="text"
                    placeholder="Product 'name"
                    value={inputValue.tensp}
                    onChange={(e) => {
                        setInputValue({
                            ...inputValue,
                            tensp: validator.firstSpace(e.target.value),
                        });
                    }}
                ></input>
            </td>
            <td>
                <input
                    className={cx('input-medium')}
                    type="text"
                    placeholder="Type"
                    value={inputValue.loaisp}
                    onChange={(e) => {
                        setInputValue({
                            ...inputValue,
                            loaisp: validator.firstSpace(e.target.value),
                        });
                    }}
                />
            </td>
            <td>
                <input
                    className={cx('input-medium')}
                    type="text"
                    placeholder="Price"
                    value={inputValue.gia}
                    onChange={(e) => {
                        setInputValue({
                            ...inputValue,
                            gia: validator.onlyNumber(e.target.value),
                        });
                    }}
                />
            </td>
            <td>
                <input
                    className={cx('input-medium')}
                    type="text"
                    placeholder="Provider"
                    value={inputValue.nhacungcap}
                    onChange={(e) => {
                        setInputValue({
                            ...inputValue,
                            nhacungcap: validator.firstSpace(e.target.value),
                        });
                    }}
                />
            </td>
            <td>
                <input
                    className={cx('input-small')}
                    type="text"
                    placeholder="Unit"
                    value={inputValue.donvi}
                    onChange={(e) => {
                        setInputValue({
                            ...inputValue,
                            donvi: validator.firstSpace(e.target.value),
                        });
                    }}
                />
            </td>
            <td>
                <input
                    className={cx('input-small')}
                    type="text"
                    placeholder="Quantity"
                    value={inputValue.soluong}
                    onChange={(e) => {
                        setInputValue({
                            ...inputValue,
                            soluong: validator.onlyNumber(e.target.value),
                        });
                    }}
                />
            </td>
            <td>
                <input
                    className={cx('input-large')}
                    accept="image/png, image/gif, image/jpeg"
                    type="file"
                    placeholder="thumbnail"
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
                {inputValue.anhdaidien && (
                    <div className={cx('img-box')}>
                        <div className={cx('avatar-img')}>
                            <img
                                className={cx('img-view')}
                                src={`http://localhost:2222/images/${inputValue.anhdaidien}`}
                                alt={inputValue.anhdaidien}
                            />
                            <button
                                onClick={deleteAvatar}
                                className={cx('btn-delete-img')}
                            >
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </div>
                    </div>
                )}
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
                    placeholder="Other imgs"
                    accept="image/png, image/gif, image/jpeg"
                    multiple
                    name="images"
                    onChange={(e) => {
                        setInputValue({
                            ...inputValue,
                            images: e.target.files,
                        });
                    }}
                />
                <div className={cx('img-box')}>
                    {inputValue.anhsp &&
                        anhsp.map((ele, index) => {
                            return (
                                <div key={index} className={cx('other-img')}>
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
                                        <FontAwesomeIcon icon={faClose} />
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </td>
            <td>
                <button className={cx('edit-button')} onClick={handleUpdate}>
                    <FontAwesomeIcon icon={faSave} /> Save
                </button>
            </td>
            <td>
                <button className={cx('delete-button')} onClick={handleCancel}>
                    <FontAwesomeIcon icon={faCancel} /> Cancel
                </button>
            </td>
        </tr>
    );
}

export default EditRow;
