import styles from "../css/applicationSuccess.module.scss";
import { useNavigate } from "react-router-dom";
import NewNavbar from "../components/NewNavbar";

export default function ApplicationCancelled() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.formsubmittedContainer}>
        <div className={styles.successfulSubmitted}>你的申請已成功取消</div>

        <div className={styles.willContactyou}>
          <img className={styles.logoPic} src="/photos/logo_pic-09-09.png" alt="" />
          <span>歡迎再次報名其他合適的活動</span>
        </div>

        {/* nav-bar */}
        <NewNavbar activeBtn="home" />

        {/* nav-bar */}
      </div>
    </div>
  );
}
