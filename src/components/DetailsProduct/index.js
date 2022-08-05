import styles from './DetailProduct.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faClose } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function DetailProduct({ setShowDetail, data, selectedProduct }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('container-image')}>
                    <img
                        src="https://cdn.shopify.com/s/files/1/0453/5035/5103/files/img_02_130x30_crop_center.png?v=1644318438"
                        alt="anh san pham"
                        className={cx('image')}
                    />
                </div>

                <div className={cx('container-info')}>
                    <ul className={cx('list-info')}>
                        <li>
                            <span>In Stock</span>
                        </li>
                        <li className={cx('infor-nameprod')}>Acer</li>
                        <li className={cx('infor-price')}>80$</li>
                        <li className={cx('infor-nameprod')}>Color</li>
                        <li className={cx('infor-nameprod')}>Options</li>
                        <li className={cx('infor-nameprod')}>So luong</li>
                        <li>
                            <button className={cx('button-addtocart')}>
                                <FontAwesomeIcon icon={faCartPlus} />
                                Add to Cart
                            </button>
                        </li>
                    </ul>

                    <button
                        className={cx('button-close')}
                        onClick={() => {
                            setShowDetail(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;
