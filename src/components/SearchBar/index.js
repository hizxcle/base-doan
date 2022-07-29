import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useState, useRef } from 'react';

import styles from './SearchBar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SearchBar() {
    const [inputValue, setInputValue] = useState('');

    const focusRef = useRef(null);

    const handleFocus = () => {
        setInputValue('');
        focusRef.current.focus();
    };

    return (
        <div className={cx('search-bar-wrapper')}>
            <div className={cx('search-bar')}>
                <input
                    ref={focusRef}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                    placeholder="Search whatever you want...."
                    spellCheck={false}
                ></input>
                {inputValue && (
                    <FontAwesomeIcon
                        onClick={handleFocus}
                        icon={faCircleXmark}
                        className={cx('deleteInput')}
                    />
                )}
                <button className={cx('search-button')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
