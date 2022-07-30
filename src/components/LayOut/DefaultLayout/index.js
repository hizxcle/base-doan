import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [top, setTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 200) {
                setTop(true);
            } else {
                setTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <Header />
            <div>
                <div>{children}</div>
            </div>
            <Footer />
            {top && (
                <button
                    className={cx('button-totop')}
                    onClick={handleScrollToTop}
                >
                    <FontAwesomeIcon
                        icon={faAngleUp}
                        className={cx('icon-totop')}
                    />
                </button>
            )}
        </div>
    );
}

export default DefaultLayout;
