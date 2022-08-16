import style from './AlertConfirm.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function AlertConfirm({ pay, setShowAlertW }) {
    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('outside')}
                onClick={() => setShowAlertW(false)}
            ></div>
            <div className={cx('container')}>
                <p>Do you accept payment ?</p>
                <div className={cx('container-button')}>
                    <button onClick={pay}>Accept</button>
                    <button onClick={() => setShowAlertW(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default AlertConfirm;
