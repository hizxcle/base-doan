import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useState, useRef, useEffect, memo } from 'react';
import { Fragment } from 'react';

import styles from './SearchBar.module.scss';
import classNames from 'classnames/bind';

import Tippy from '@tippyjs/react/headless';

import SearchProducts from '~/LayOut/DefaultLayout/components/SearchBar/components/SearchProducts';
import SearchItems from './components/SearchItems';
import SearchType from './components/SearchType';

const cx = classNames.bind(styles);

function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchResultType, setSearchResultType] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [showSearchResult, setShowSearchResult] = useState(false);

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }
        fetch(
            `http://localhost:2222/api/product/loai/s/${encodeURIComponent(
                searchValue,
            )}`,
        )
            .then((res) => res.json())
            .then((res) => setSearchResultType(res));
        fetch(
            `http://localhost:2222/api/product/tensp/${encodeURIComponent(
                searchValue,
            )}`,
        )
            .then((res) => res.json())
            .then((res) => setSearchResult(res));
    }, [searchValue]);

    const focusRef = useRef(null);

    const handleFocus = () => {
        setSearchValue('');
        focusRef.current.focus();
        setSearchResult([]);
        setShowSearchResult(false);
    };

    const handleHideResult = () => {
        setShowResult(false);
        setShowSearchResult(false);
    };

    const handleSearchResult = () => {
        setShowSearchResult(!showSearchResult);
        setShowResult(false);
    };

    const searchType = [
        ...new Set(searchResultType.map((item) => item.loaisp)),
    ];

    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <Tippy
                    render={(attrs) => (
                        <div className={cx('wrapper-result')}>
                            <div
                                className={cx('search-result')}
                                tabIndex="-1"
                                {...attrs}
                            >
                                <div>
                                    <h3 className={cx('search-result-prods')}>
                                        Products
                                    </h3>
                                    {searchResult.map((result, index) => (
                                        <SearchItems
                                            key={index}
                                            data={result}
                                        />
                                    ))}
                                </div>
                                <hr></hr>
                                <div>
                                    <h3 className={cx('search-result-prods')}>
                                        Type Products
                                    </h3>
                                    {searchType.map((result, index) => (
                                        <SearchType key={index} data={result} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    placement={'bottom'}
                    visible={
                        showResult &&
                        (searchResult.length > 0 ||
                            searchResultType.length > 0) &&
                        searchValue
                    }
                    interactive
                    onClickOutside={handleHideResult}
                >
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
                                onFocus={() => {
                                    setShowResult(true);
                                }}
                            ></input>
                            {searchValue && (
                                <FontAwesomeIcon
                                    onClick={handleFocus}
                                    icon={faCircleXmark}
                                    className={cx('deleteInput')}
                                />
                            )}

                            <button
                                className={cx('search-button')}
                                onClick={handleSearchResult}
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </div>
                </Tippy>
            </div>
            <Tippy zIndex={9999}>
                {showSearchResult && (
                    <SearchProducts
                        name={searchResult}
                        type={searchType}
                        searchValue={searchValue}
                    />
                )}
            </Tippy>
        </Fragment>
    );
}

export default memo(SearchBar);
