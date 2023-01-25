import styles from "../css/applicationSuccess.module.scss";
import { useNavigate } from "react-router-dom";
import { HiSearchCircle, HiLightningBolt, HiHome, HiClipboardList, HiUserCircle } from "react-icons/hi";
import NewNavbar from "../components/NewNavbar";

export default function ApplicationSuccess() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.formsubmittedContainer}>
        <div className={styles.successfulSubmitted}>你的申請表已成功遞交</div>

        <div className={styles.willContactyou}>
          <img className={styles.logoPic} src="/photos/logo_pic-09-09.png" alt="" />
          <span>我們會盡快聯絡你</span>
        </div>

        {/* nav-bar */}
        <NewNavbar activeBtn="home" />

        {/* nav-bar */}
      </div>
    </div>
  );
}
