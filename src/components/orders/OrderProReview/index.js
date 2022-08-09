import styles from './OrderProReview.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function OrderProReview({ data, action }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <span>Index</span>
                <span>Product 'Name</span>
                <span>Provider</span>
                <span>Quantity</span>
                <span>Price</span>
            </div>
            <div className={cx('items')}>
                {data.map((ele, index) => {
                    return (
                        <div key={index} className={cx('items')}>
                            <span>{index}</span>
                            <span>{ele.tensp}</span>
                            <span>{ele.nhacungcap}</span>
                            <span>{ele.soluong}</span>
                            <span>{ele.gia}</span>
                            <span>
                                <img
                                    src={`http://localhost:2222/images/${ele.anhdaidien}`}
                                    alt={ele.tensp}
                                />
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className={cx('close-btn')} onClick={() => action(false)}>
                <FontAwesomeIcon icon={faClose} />
            </div>
        </div>
    );
}
export default OrderProReview;
