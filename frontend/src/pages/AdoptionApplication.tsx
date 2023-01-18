import styles from "../css/adoptionApplication.module.scss";
import { useNavigate } from "react-router-dom";
import {
  HiSearchCircle,
  HiLightningBolt,
  HiHome,
  HiClipboardList,
  HiUserCircle,
} from "react-icons/hi";

export default function AdoptionApplication() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.formsubmittedContainer}>
        <div className={styles.successfulSubmitted}>你的申請表已成功遞交</div>

        <div className={styles.willContactyou}>
          <img
            className={styles.logoPic}
            src="photos/logo_pic-09-09.png"
            alt=""
          />
          <span>我們會盡快聯絡你</span>
        </div>
        {/* nav-bar */}
        <>
          <div className={styles.navBArList}>
            <HiSearchCircle
              className={`${styles.navbarIcon} ${styles.searchNav}`}
            />
            <HiLightningBolt className={styles.navbarIcon} />
            <HiHome className={styles.navbarIcon} />
            <HiClipboardList className={styles.navbarIcon} />
            <HiUserCircle className={`${styles.navbarIcon} ${styles.userNav}`} />
          </div>
        </>

        {/* nav-bar */}
      </div>
    </div>
  );
}
