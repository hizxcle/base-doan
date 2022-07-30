import styles from './Home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Home() {
    return (
        <home className={cx('wrapper')}>
            <div className={cx('container-1')}>
                <div className={cx('container-left')}>
                    <div className={cx('container-left-wrapper')}>
                        <h6 className={cx('container-h6')}>2022 COLLECTION</h6>
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
                        <p className={cx('container-p')}>Sale up to 50% off!</p>
                        <button className={cx('button-container')}>
                            SHOP NOW
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('breadcrums')}></div>
        </home>
    );
}

export default Home;
