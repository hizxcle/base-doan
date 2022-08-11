import {
    faClock,
    faLocationDot,
    faMailBulk,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Contact.module.scss';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('breadcrums')}>Home / Contact Us /</div>
            <div className={cx('banner')}>
                <h1>Contact Us</h1>
            </div>

            <div className={cx('container')}>
                <div className={cx('container-left')}>
                    <div className={cx('container-left-item')}>
                        <h2>We’re here to help you!</h2>
                        <p>
                            Have a question, comment, or brilliant idea you'd
                            like to share? Send us a little note below - we love
                            to hear from you and will always reply!
                        </p>
                        <div className={cx('contact-item')}>
                            <FontAwesomeIcon
                                icon={faPhone}
                                className={cx('icon')}
                            />
                            <p>Phone Number</p>
                            <span>Call Us: 0971 323 054</span>
                        </div>
                        <div className={cx('contact-item')}>
                            <FontAwesomeIcon
                                icon={faMailBulk}
                                className={cx('icon')}
                            />
                            <p>Email:</p>
                            <span>minhhieuzz1603@gmail.com</span>
                        </div>
                        <div className={cx('contact-item')}>
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                className={cx('icon')}
                            />
                            <p>Location</p>
                            <span>
                                So 39 pho Trinh Cong Son, Tay Ho, Ha Noi
                            </span>
                        </div>
                        <div className={cx('contact-item')}>
                            <FontAwesomeIcon
                                icon={faClock}
                                className={cx('icon')}
                            />
                            <p>Opening Time</p>
                            <span>Mon - Sathurday : 8.00am - 10pm</span>
                        </div>
                    </div>
                </div>
                <div className={cx('container-right')}>
                    <div className={cx('container-right-item')}>
                        <h2>Do you want to get in touch?</h2>
                        <p>Let us know how we can help you.</p>
                        <div className={cx('form')}>
                            <label>Name</label>
                            <input placeholder="Name" />
                            <label>Email</label>
                            <input placeholder="Email" />
                            <label>Message</label>
                            <textarea placeholder="Message"></textarea>
                        </div>
                        <button>SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
