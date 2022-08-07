import classNames from 'classnames/bind';
import styles from './SearchType.module.scss';

const cx = classNames.bind(styles);

function SearchType({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <p>{data.loaisp}</p>
            </div>
        </div>
    );
}

export default SearchType;
