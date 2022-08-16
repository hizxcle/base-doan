import style from './PopUp.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function PopUp({ setShowPopUp }) {
    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('outside')}
                onClick={() => setShowPopUp(false)}
            ></div>
            <div className={cx('container')}>
                <FontAwesomeIcon
                    icon={faClose}
                    className={cx('icon-close')}
                    onClick={() => setShowPopUp(false)}
                />
                <div className={cx('container-left')}>
                    <img
                        src="https://billieandthecreatives.com/wp-content/uploads/2021/04/assistant-virtuel.jpg"
                        alt="anh popup"
                    />
                </div>
                <div className={cx('container-right')}>
                    <div className={cx('container-right-item')}>
                        <h2>Why hello there, enjoy</h2>
                        <h1>15% OFF</h1>
                        <p>
                            Subscribe to get up to 20% off! Limited time only.
                        </p>
                    </div>
                    <div className={cx('container-right-item')}>
                        <button>
                            <Link to="/shop" className={cx('link-router')}>
                                GET IT NOW!!!!
                            </Link>
                        </button>
                        <span
                            onClick={() => {
                                setShowPopUp(false);
                            }}
                        >
                            No, thanks
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopUp;
