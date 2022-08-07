import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import style from './AlertWarning.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function AlertWarning({ setDeleting, selectedProductId, handleDelete }) {
    console.log(selectedProductId);
    return (
        <div className={cx('comfirmWrapper')}>
            <div className={cx('cofirmOverlay')}></div>
            <div className={cx('confirmContainer')}>
                <div className={cx('comfirmHeader')}>
                    <h3>Cảnh báo</h3>
                    <FontAwesomeIcon
                        icon={faClose}
                        onClick={() => setDeleting(false)}
                    />
                </div>
                <div className={cx('comfirmContent')}>
                    <p>Bạn có chắc chắn xóa ?</p>
                </div>
                <div className={cx('comfirmBtn')}>
                    <button onClick={() => setDeleting(false)}>Cancel</button>
                    <button
                        onClick={async () => {
                            await handleDelete(selectedProductId);
                            setDeleting(false);
                        }}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AlertWarning;
