import { memo } from 'react';
import styles from './ShowItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function ShowItem({ data, action, setEdit }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('item')}>
                    <span className={cx('item-desc')}>Full name :</span>
                    <span className={cx('item-cont')}>{data.hoten}</span>
                </div>
                <div className={cx('item')}>
                    <span className={cx('item-desc')}>Email :</span>
                    <span className={cx('item-cont')}>{data.email}</span>
                </div>
                <div className={cx('item')}>
                    <span className={cx('item-desc')}>Gender :</span>
                    <span className={cx('item-cont')}>
                        {data.gioitinh === 1
                            ? 'Male'
                            : data.gioitinh === 0
                            ? 'Female'
                            : 'Other'}
                    </span>
                </div>
                <div className={cx('item')}>
                    <span className={cx('item-desc')}>Date of birth :</span>
                    <span className={cx('item-cont')}>
                        {data?.ngaysinh?.slice(0, 10)}
                    </span>
                </div>
                <div className={cx('item')}>
                    <span className={cx('item-desc')}>Phone :</span>
                    <span className={cx('item-cont')}>{data.sdt}</span>
                </div>

                <div className={cx('item')}>
                    <span className={cx('item-desc')}>Address : </span>
                    <span className={cx('item-cont')}>{data.diachi}</span>
                </div>
                <div className={cx('item')}>
                    <span className={cx('item-desc')}>Password : </span>
                    <span className={cx('item-cont')}>
                        <button
                            onClick={() => {
                                setEdit('editPasswd');
                            }}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <span>Edit Password</span>
                        </button>
                    </span>
                </div>
                <div className={cx('edit')}>
                    <button onClick={action}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                        <span>Edit infor</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default memo(ShowItem);
