import styles from './OrderProReview.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Fragment } from 'react';
const cx = classNames.bind(styles);
function OrderProReview({ data, action }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {data.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <span>
                                <img
                                    src={`http://localhost:2222/images/${item.anhdaidien}`}
                                    alt={item.tensp}
                                />
                            </span>
                            <span>{item.tensp}</span>
                            <span>Brand : {item.nhacungcap}</span>
                            <span>Quantity : {item.soluong}</span>
                            <span>
                                Price :
                                {item.gia.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                })}
                                VND
                            </span>
                        </Fragment>
                    );
                })}
                <div className={cx('close-btn')}>
                    <button onClick={() => action(false)}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
            </div>
        </div>
    );
}
export default OrderProReview;
