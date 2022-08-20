import styles from './QLSP.module.scss';
import classNames from 'classnames/bind';

import { Fragment, useRef, useState } from 'react';

import OnlyReadRow from './components/OnlyReadRow';
import EditRow from './components/EditRow';
import validator from '~/utils/validator.utils';

import { getData, deleteApi } from '~/Services';
// import Alert from '~/components/infoModals/AlertNotify';
const cx = classNames.bind(styles);

function QLSP({ data, setPosts, setAlert }) {
    const [editID, setEditId] = useState(null);
    const [addPro, setAddPro] = useState({});
    // const [alert, setAlert] = useState({
    //     type: '',
    //     message: '',
    //     show: false,
    // });

    const selectedRef = useRef();

    const handleAddNew = (e) => {
        e.preventDefault();
        var formData = new FormData();
        Object.keys(addPro).forEach((ele) => {
            if (ele === 'thumb') {
                return formData.append(`${ele}`, addPro[ele]);
            } else if (ele === 'images') {
                return Object.keys(addPro[ele]).forEach((ele2) => {
                    console.log('anh khac', addPro[ele][ele2]);
                    return formData.append('images', addPro[ele][ele2]);
                });
            } else {
                return formData.append(`${ele}`, `${addPro[ele]}`);
            }
        });

        // if (res?.status === 200) {
        //     setAlert({
        //         type: 'success',
        //         message: 'Them thanh cong',
        //         show: true,
        //     });
        // } else {
        //     setAlert({
        //         type: 'error',
        //         message: 'Them san pham that bai',
        //         show: true,
        //     });
        // }
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
            {/* <Alert alert={alert} setAlert={setAlert} /> */}
            <div className={cx('title')}>
                <img
                    src="https://trustsales.vn/image/quan-ly-san-pham.jpg"
                    alt="anh quan ly san pham"
                />
                <p>Product manager</p>
            </div>

            <div className={cx('form')}>
                <form encType="multipart/form-data">
                    <p>
                        Product 'name':
                        <input
                            className={cx('input')}
                            type="text"
                            name="tensp"
                            value={addPro.tensp || ''}
                            onChange={(e) => {
                                setAddPro({
                                    ...addPro,
                                    tensp: validator.firstSpace(e.target.value),
                                });
                            }}
                            placeholder="Input product 'name...."
                        />
                    </p>
                    <p>
                        Type :
                        <input
                            className={cx('input')}
                            type="text"
                            name="loaisp"
                            value={addPro.loaisp || ''}
                            onChange={(e) => {
                                setAddPro({
                                    ...addPro,
                                    loaisp: validator.firstSpace(
                                        e.target.value,
                                    ),
                                });
                            }}
                            placeholder="Input product 'type....."
                        />
                    </p>
                    <p>
                        Price :
                        <input
                            className={cx('input')}
                            type="text"
                            name="gia"
                            value={addPro.gia || ''}
                            onChange={(e) => {
                                setAddPro({
                                    ...addPro,
                                    gia: validator.onlyNumber(e.target.value),
                                });
                            }}
                            placeholder="Input price...."
                        />
                        <span>.Vnd</span>
                    </p>
                    <p>
                        Provider :
                        <input
                            className={cx('input')}
                            type="text"
                            name="nhacungcap"
                            value={addPro.nhacungcap || ''}
                            onChange={(e) => {
                                setAddPro({
                                    ...addPro,
                                    nhacungcap: validator.firstSpace(
                                        e.target.value,
                                    ),
                                });
                            }}
                            placeholder="Provider 'name...."
                        />
                    </p>
                    <p>
                        Unit :
                        <input
                            className={cx('input')}
                            type="text"
                            name="donvi"
                            value={addPro.donvi || ''}
                            onChange={(e) => {
                                setAddPro({
                                    ...addPro,
                                    donvi: validator.firstSpace(e.target.value),
                                });
                            }}
                            placeholder="Input unit...."
                        />
                    </p>
                    <p>
                        Quantity :
                        <input
                            className={cx('input')}
                            type="text"
                            name="soluong"
                            value={addPro.soluong || ''}
                            onChange={(e) => {
                                setAddPro({
                                    ...addPro,
                                    soluong: validator.onlyNumber(
                                        e.target.value,
                                    ),
                                });
                            }}
                            placeholder="Input quantity...."
                        />
                    </p>
                    <p>
                        Thumbnail :
                        <input
                            className={cx('input')}
                            type="file"
                            name="thumb"
                            accept="image/png, image/gif, image/jpeg"
                            //  files={addPro.thumb || ''}
                            onChange={(e) => {
                                setAddPro({
                                    ...addPro,
                                    thumb: e.target.files[0],
                                });
                            }}
                            placeholder="Enter thumbnail...."
                        />
                    </p>
                    <p>
                        Other imgs :
                        <input
                            className={cx('input')}
                            type="file"
                            multiple
                            accept="image/png, image/gif, image/jpeg"
                            name="images"
                            onChange={(e) => {
                                setAddPro({
                                    ...addPro,
                                    images: e.target.files,
                                });
                            }}
                            placeholder="Input other imgs...."
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
                            <td>Product code</td>
                            <td>Product name</td>
                            <td>Type</td>
                            <td>Price</td>
                            <td>Provider 'name</td>
                            <td>Unit</td>
                            <td>Quantity</td>
                            <td>ThumbNail</td>
                            <td className={cx('album-images')}>Other imgs</td>
                            <td colSpan="2">Action</td>
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
