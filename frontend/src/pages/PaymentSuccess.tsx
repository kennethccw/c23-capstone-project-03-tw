import styles from "../css/applicationSuccess.module.scss";
import { useNavigate } from "react-router-dom";
import NewNavbar from "../components/NewNavbar";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.formsubmittedContainer}>
        <div className={styles.successfulSubmitted}>付款成功</div>

        <div className={styles.willContactyou}>
          <img className={styles.logoPic} src="/photos/logo_pic-09-09.png" alt="" />
          <span>感謝你的愛心捐贈</span>
        </div>

        {/* nav-bar */}
        <NewNavbar activeBtn="home" />

        {/* nav-bar */}
      </div>
    </div>
  );
}
