import styles from './OrderProReview.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Fragment } from 'react';
const cx = classNames.bind(styles);
function OrderProReview({ data, action, showDetail }) {
    return (
        <div className={cx('wrapper')} onClick={() => action(false)}>
            <div className={cx('container')}>
                {data.map((ele, index) => {
                    return (
                        <Fragment key={index}>
                            <span>
                                <img
                                    src={`http://localhost:2222/images/${ele.anhdaidien}`}
                                    alt={ele.tensp}
                                />
                            </span>
                            <span>{ele.tensp}</span>
                            <span>Brand : {ele.nhacungcap}</span>
                            <span>Quantity : {ele.soluong}</span>
                            <span>
                                Price :{' '}
                                {ele.gia.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                })}{' '}
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
