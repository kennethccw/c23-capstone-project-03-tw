
import {  HiHome, HiLightningBolt, HiUserCircle } from 'react-icons/hi'
import styles from '../css/organisationNavbar.module.scss'
import { useNavigate } from "react-router-dom";


export function OrganisationNavbar() {
  const navigate = useNavigate();

  return (<>
<div className={styles.navBArList}>
            <HiLightningBolt className={styles.navbarIcon} />
            <HiHome className={styles.navbarIcon} />
            <HiUserCircle className={`${styles.navbarIcon} ${styles.userNav}`} onClick={() => {
              navigate("/login");
              localStorage.clear();
            }}/>
          </div>
  </>)
}