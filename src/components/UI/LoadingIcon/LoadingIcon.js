import styles from './LoadingIcon.module.css';
import imgLogo from '../../../assets/logo.png';

export default function LoadingIcon() {
    return (
        <div className={styles.icon}>
            <img src={imgLogo} alt='logo' className={styles.rotate} />
        </div>
    );
}