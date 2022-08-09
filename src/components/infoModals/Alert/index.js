import {
    faCircleCheck,
    faCircleExclamation,
    faCircleXmark,
    faClose,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';

import style from './Alert.module.scss';

const cx = classNames.bind(style);

function Alert({ alert, setAlert }) {
    const { type = '', message = '' } = alert;

    setTimeout(() => {
        setAlert({ ...alert, show: false });
    }, 5000);

    return (
        <div
            className={cx('wrapperAlert')}
            id={
                type === 'warning'
                    ? 'alertWaring'
                    : type === 'error'
                    ? 'alertError'
                    : 'alertSucces'
            }
        >
            {type === 'warning' ? (
                <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className={cx('icon')}
                />
            ) : type === 'error' ? (
                <FontAwesomeIcon icon={faCircleXmark} className={cx('icon')} />
            ) : (
                <FontAwesomeIcon icon={faCircleCheck} className={cx('icon')} />
            )}
            <p>{message}</p>
            <span onClick={() => setAlert({ ...alert, show: false })}>
                <FontAwesomeIcon icon={faClose} />
            </span>
        </div>
    );
}

export default Alert;
