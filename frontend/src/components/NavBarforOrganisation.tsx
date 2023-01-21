
import {  HiHome, HiLightningBolt, HiUserCircle } from 'react-icons/hi'
import styles from '../css/organisationNavbar.module.scss'

export function OrganisationNavbar() {
  return (<>
<div className={styles.navBArList}>
            <HiLightningBolt className={styles.navbarIcon} />
            <HiHome className={styles.navbarIcon} />
            <HiUserCircle className={`${styles.navbarIcon} ${styles.userNav}`} />
          </div>
  </>)
}