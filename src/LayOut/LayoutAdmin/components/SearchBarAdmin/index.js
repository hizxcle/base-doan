import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useState, useRef, useEffect } from 'react';

import styles from './SearchBar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SearchBarAdmin() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        if (!searchValue.trim()) {
            return;
        }
        fetch(
            `http://localhost:2222/api/product/tensp/${encodeURIComponent(
                searchValue,
            )}`,
        )
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res);
            });
    }, [searchValue]);

    console.log(searchResult);

    const focusRef = useRef(null);

    const handleFocus = () => {
        setSearchValue('');
        focusRef.current.focus();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search-bar-wrapper')}>
                <div className={cx('search-bar')}>
                    <input
                        ref={focusRef}
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                        placeholder="Search whatever you want...."
                        spellCheck={false}
                    ></input>
                    {searchValue && (
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
        </div>
    );
}

export default SearchBarAdmin;
