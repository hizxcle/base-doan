import classNames from 'classnames/bind';
import styles from './SearchBrand.module.scss';

const cx = classNames.bind(styles);

function SearchBrand({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <p>{data.nhacungcap}</p>
            </div>
        </div>
    );
}

export default SearchBrand;
