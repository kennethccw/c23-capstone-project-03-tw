
import { HiClipboardList, HiHome, HiLightningBolt, HiSearchCircle, HiUserCircle } from 'react-icons/hi'
import styles from '../css/newNavBar.module.scss'

export default function NewNavbar() {
  return (<>
    <div className={styles.navBArList}>
            <HiSearchCircle
              className={`${styles.navbarIcon} ${styles.searchNav}`}
            />
            <HiLightningBolt className={styles.navbarIcon} />
            <HiHome className={styles.navbarIcon} />
            <HiClipboardList className={styles.navbarIcon} />
            <HiUserCircle className={`${styles.navbarIcon} ${styles.userNav}`} />
          </div>
  </>)
}