import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRotateRight,
    faCreditCard,
    faPlaneUp,
} from '@fortawesome/free-solid-svg-icons';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import { useEffect, useState } from 'react';
import PopUp from '~/components/PopUp';

const cx = classNames.bind(styles);

function Home() {
    const [data, setData] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:2222/api/product`)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            });
        setTimeout(() => {
            setShowPopUp(true);
        }, 1000);
    }, []);

    return (
        <>
            {showPopUp && <PopUp setShowPopUp={setShowPopUp} />}
            <div className={cx('wrapper')}>
                <div className={cx('container-1')}>
                    <div className={cx('container-left')}>
                        <div className={cx('container-left-wrapper')}>
                            <h6 className={cx('container-h6')}>
                                2022 COLLECTION
                            </h6>
                            <h2 className={cx('container-h2')}>
                                Discover top rated items
                            </h2>
                            <button className={cx('button-container')}>
                                DISCOVER NOW
                            </button>
                        </div>
                    </div>
                    <div className={cx('container-right')}>
                        <img
                            className={cx('container-img')}
                            src="https://wallpapercave.com/wp/wp5390669.jpg"
                            alt="anh container 1"
                        />
                    </div>
                </div>
                <div className={cx('breadcrums')}></div>

                <div className={cx('container-2')}>
                    <div className={cx('container2-left')}>
                        <img
                            className={cx('container2-img')}
                            src="https://cdn.shopify.com/s/files/1/0453/5035/5103/files/img_04_900x.png?v=1644318603"
                            alt="anh container 1"
                        />
                    </div>
                    <div className={cx('container2-right')}>
                        <div className={cx('container2-left-wrapper')}>
                            <h6 className={cx('container-h6')}>
                                FEATURED MAC ACCESSORIES
                            </h6>
                            <h3 className={cx('container-h3')}>
                                Make the perfect connection
                            </h3>
                            <p className={cx('container-p')}>
                                Sale up to 50% off!
                            </p>
                            <button className={cx('button-container')}>
                                SHOP NOW
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('breadcrums')}></div>
                <div className={cx('wrapper-slider')}>
                    <div className={cx('container-slider')}>
                        <div className={cx('slider-title')}>
                            <h3> On sale 15% </h3>
                            <Slide>
                                {data.map((item, index) => (
                                    <div key={index} className={cx('slider')}>
                                        <img
                                            src={`http://localhost:2222/images/${item.anhdaidien}`}
                                            alt="anh dai dien"
                                        />
                                        <div>
                                            <span>{item.tensp}</span>
                                            <p>
                                                <span
                                                    className={cx(
                                                        'price-product-sale',
                                                    )}
                                                >
                                                    {item.gia.toLocaleString(
                                                        undefined,
                                                        {
                                                            maximumFractionDigits: 2,
                                                        },
                                                    )}
                                                    VND
                                                </span>
                                                <span className={cx('red')}>
                                                    {(
                                                        item.gia * 0.85
                                                    ).toLocaleString(
                                                        undefined,
                                                        {
                                                            maximumFractionDigits: 2,
                                                        },
                                                    )}
                                                    VND
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </Slide>
                        </div>
                    </div>
                </div>
                <div className={cx('breadcrums')}></div>
                <div className={cx('container-3')}>
                    <div className={cx('container2-left')}>
                        <img
                            className={cx('container2-img')}
                            src="https://cdn.shopify.com/s/files/1/0453/5035/5103/files/img_06_900x.png?v=1644319132"
                            alt="anh container 3"
                        />
                    </div>
                    <div className={cx('container2-right')}>
                        <div className={cx('container2-left-wrapper')}>
                            <h6 className={cx('container-h6')}>
                                EXCLUSIVE IPHONE ACCESSORIES
                            </h6>
                            <h3 className={cx('container-h3')}>
                                Get up to 20% off
                            </h3>
                            <p className={cx('container-p')}>
                                The latest trends
                            </p>
                            <button className={cx('button-container')}>
                                SHOP NOW
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('breadcrums')}></div>
                <div className={cx('sections-wrapper')}>
                    <div className={cx('sections')}>
                        <div className={cx('sections-item')}>
                            <FontAwesomeIcon
                                icon={faPlaneUp}
                                className={cx('sections-icon')}
                            />
                            <h3 className={cx('sections-title')}>
                                FREE SHIPPING
                            </h3>
                            <p className={cx('sections-decs')}>
                                {' '}
                                On all orders over $50.00
                            </p>
                        </div>
                        <div className={cx('sections-item')}>
                            <FontAwesomeIcon
                                icon={faCreditCard}
                                className={cx('sections-icon')}
                            />
                            <h3 className={cx('sections-title')}>
                                100% PAYMENT SECURE
                            </h3>
                            <p className={cx('sections-decs')}>
                                {' '}
                                We ensure secure payment with PEV
                            </p>
                        </div>
                        <div className={cx('sections-item')}>
                            <FontAwesomeIcon
                                icon={faArrowRotateRight}
                                className={cx('sections-icon')}
                            />
                            <h3 className={cx('sections-title')}>
                                30 DAYS GUARANTEE
                            </h3>
                            <p className={cx('sections-decs')}>
                                {' '}
                                30-days free return policy
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cx('breadcrums')}></div>
            </div>
        </>
    );
}

export default Home;
