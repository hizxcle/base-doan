import styles from './OrderProReview.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Slide } from 'react-slideshow-image/';
import 'react-slideshow-image/dist/styles.css';

const cx = classNames.bind(styles);
function OrderProReview({ data, action }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Slide autoplay={false} indicators>
                    {data.map((item, index) => {
                        return (
                            <div className={cx('item')} key={index}>
                                <div className={cx('img-box')}>
                                    <img
                                        className={cx('img')}
                                        src={`http://localhost:2222/images/${item.anhdaidien}`}
                                        alt={item.tensp}
                                    />
                                </div>
                                <div>
                                    <span>{item.tensp} |</span>
                                    <span>Brand : {item.nhacungcap} |</span>
                                    <span>Quantity : {item.soluong} |</span>
                                    <span>
                                        Price :
                                        {item.gia.toLocaleString(undefined, {
                                            maximumFractionDigits: 2,
                                        })}
                                        VND
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </Slide>
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
