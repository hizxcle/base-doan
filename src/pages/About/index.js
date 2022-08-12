import classNames from 'classnames/bind';
import styles from './About.module.scss';

const cx = classNames.bind(styles);

function About() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('breadcrums')}>Home / About Us /</div>
            <div className={cx('divider')}></div>
            <div className={cx('container')}>
                <div className={cx('container-left')}>
                    <img src="https://cdn.shopify.com/s/files/1/0453/5035/5103/files/img_13_720x.png?v=1644319591" />
                </div>
                <div className={cx('container-right1')}>
                    <div className={cx('container-right-item1')}>
                        <h2>About Us</h2>
                        <h4>We guarantee the highest quality</h4>
                        <h4>of the products we sell.</h4>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo. Nemo enim ipsam voluptatem quia
                            voluptas sit aspernatur aut odit aut fugit, sed quia
                            consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt.
                        </p>
                    </div>
                </div>
            </div>
            <div className={cx('divider-small')}></div>
            <div className={cx('container')}>
                <div className={cx('container-right2')}>
                    <div className={cx('container-right-item2')}>
                        <h2>Our Story</h2>
                        <h4>
                            Catering to your requirements, handling your needs
                            with care.
                        </h4>
                        <p>
                            Our store is more than just another average online
                            retailer. We sell not only top quality products, but
                            give our customers a positive online shopping
                            experience.
                        </p>
                        <p>
                            Forget about struggling to do everything at once:
                            taking care of the family, running your business,
                            walking your dog, cleaning the house, doing the
                            shopping, etc.
                        </p>
                    </div>
                </div>
                <div className={cx('container-left')}>
                    <img src="https://cdn.shopify.com/s/files/1/0453/5035/5103/files/img_14_1728x.png?v=1644319637" />
                </div>
            </div>
            <div className={cx('divider-small')}></div>
            <div className={cx('advertisement')}>
                <div className={cx('advertisement-item')}>
                    <img src="https://cdn.shopify.com/s/files/1/0453/5035/5103/articles/blog_3_940x.jpg?v=1597055669" />
                    <span> JUL 03, 2022 | 0 COMMENTS</span>
                    <h2>Retina. Now in colossal and ginormous.</h2>
                    <p>
                        The idea behind iMac has never wavered: to craft the
                        ultimate desktop experience. The best display, paired
                        with high-performance processors, graphics, and storage
                        — all within an incredibly thin, seamless...
                    </p>
                    <h4>READ MORE</h4>
                </div>
                <div className={cx('advertisement-item')}>
                    <img src="https://cdn.shopify.com/s/files/1/0453/5035/5103/articles/blog_2_940x.jpg?v=1597055662" />
                    <span> JUL 03, 2022 | 0 COMMENTS</span>
                    <h2>
                        Recession is a good opportunity to deal a deathblow to
                        the competitors
                    </h2>
                    <p>
                        Media prices are falling, so advertising becomes more
                        profitable. The combination of low prices on media and
                        weak competition gives companies the opportunity to
                        cheaply grab market share. Then came...
                    </p>
                    <h4>READ MORE</h4>
                </div>
                <div className={cx('advertisement-item')}>
                    <img src="https://cdn.shopify.com/s/files/1/0453/5035/5103/articles/blog_1_940x.jpg?v=1597055656" />
                    <span> JUL 03, 2022 | 0 COMMENTS</span>
                    <h2>The main objectives of the marketer</h2>
                    <p>
                        Search of staff is not an easy task. According to the
                        departmental heads' of personnel management words, in
                        order to find a personnel who will correspond to the
                        relevant customer...
                    </p>
                    <h4>READ MORE</h4>
                </div>
            </div>
            <div className={cx('divider-small')}></div>
        </div>
    );
}

export default About;
