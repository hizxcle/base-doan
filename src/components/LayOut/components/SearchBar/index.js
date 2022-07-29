import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './SearchBar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SearchBar() {
    return (
        <div className={cx('search-bar-wrapper')}>
            <div className={cx('search-bar')}>
                <input
                    placeholder="Search whatever you want...."
                    spellCheck={false}
                ></input>
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className={cx('deleteInput')}
                />
                <button className={cx('search-button')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
