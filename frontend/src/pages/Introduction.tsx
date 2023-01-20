import styles from "../css/introduction.module.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
export default function Introduction() {
  const navigate = useNavigate();
  return (
    <div className={styles.welcomeContainer}>
      <img className={styles.introductionPhoto} src="photos/Screenshot 2023-01-12 at 12.35.02 AM.png" alt="" />
      <h1 className={styles.welcomeText}>歡迎有愛心的你</h1>
      <h1>加入成為義工！</h1>
      <Button
        className={styles.button}
        color="violet"
        radius="xl"
        onClick={() => {
          navigate("/register");
        }}
      >
        創建帳戶
      </Button>
      <div className={styles.loginContainer}>
        <span className={styles.loginText}>已有帳號?</span>
        <Button
          className={`${styles.loginText} ${styles.loginBtn}`}
          variant="subtle"
          color="violet"
          onClick={() => {
            navigate("/login");
          }}
        >
          登入
        </Button>
      </div>
    </div>
  );
}
