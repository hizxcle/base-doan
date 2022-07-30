import styles from './Products.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Products() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('product-item')}>
                    <div className={cx('thumbs')}>
                        <img
                            className={cx('thumbs-img')}
                            src="https://wallpapercave.com/wp/wp5390669.jpg"
                            alt="san pham"
                        />
                        <span className={cx('sale')}>-15%</span>
                        <span className={cx('new')}>New</span>
                        <span className={cx('outstock')}>Out stock</span>
                        <FontAwesomeIcon
                            icon={faHeart}
                            className={cx('heart')}
                        />
                    </div>
                    <div className={cx('info')}>
                        <a className={cx('name-product')}>
                            Acer 14 Spin 7 2in1 Multitouch Notebook
                        </a>
                        <span className={cx('price-product')}> $80.00</span>
                    </div>
                </div>

                <div className={cx('product-item')}>
                    <div className={cx('thumbs')}>
                        <img
                            className={cx('thumbs-img')}
                            src="https://wallpapercave.com/wp/wp5390669.jpg"
                            alt="san pham"
                        />
                    </div>
                    <div className={cx('info')}>
                        <a className={cx('name-product')}>
                            Acer 14 Spin 7 2in1 Multitouch
                            Notebookasdsadasdasdasdasdasdasdds
                        </a>
                        <span className={cx('price-product')}> $80.00</span>
                    </div>
                </div>
                <div className={cx('product-item')}>
                    <div className={cx('thumbs')}>
                        <img
                            className={cx('thumbs-img')}
                            src="https://wallpapercave.com/wp/wp5390669.jpg"
                            alt="san pham"
                        />
                    </div>
                    <div className={cx('info')}></div>
                </div>
                <div className={cx('product-item')}>
                    <div className={cx('thumbs')}>
                        <img
                            className={cx('thumbs-img')}
                            src="https://wallpapercave.com/wp/wp5390669.jpg"
                            alt="san pham"
                        />
                    </div>
                    <div className={cx('info')}></div>
                </div>
                <div className={cx('product-item')}>
                    <div className={cx('thumbs')}>
                        <img
                            className={cx('thumbs-img')}
                            src="https://wallpapercave.com/wp/wp5390669.jpg"
                            alt="san pham"
                        />
                    </div>
                    <div className={cx('info')}></div>
                </div>
            </div>
        </div>
    );
}

export default Products;
