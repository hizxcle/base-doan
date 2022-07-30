import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useState, useRef, useEffect } from 'react';

import styles from './SearchBar.module.scss';
import classNames from 'classnames/bind';

import Tippy from '@tippyjs/react/headless';
import ProductsItem from '../ProductsItem';

const cx = classNames.bind(styles);

function SearchBar() {
    const [inputValue, setInputValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const focusRef = useRef(null);

    const handleFocus = () => {
        setInputValue('');
        focusRef.current.focus();
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         setSearchResult([1, 2, 3]);
    //     }, 3000);
    // }, []);

    return (
        <Tippy
            render={(attrs) => (
                <div className={cx('wrapper-result')}>
                    <div
                        className={cx('search-result')}
                        tabIndex="-1"
                        {...attrs}
                    >
                        <h3 className={cx('search-result-prods')}>Products</h3>
                        <ProductsItem />
                    </div>
                </div>
            )}
            placement={'bottom'}
            visible={searchResult.length > 0}
            interactive
        >
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
        </Tippy>
    );
}

export default SearchBar;
