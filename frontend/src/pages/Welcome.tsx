import styles from "../css/login.module.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons";
export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div className={styles.welcomeContainer}>
      <img className={styles.logo} src="photos/logo_pic-09-09.png" alt="" />
      <img className={styles.logoText} src="photos/logo_word-10.png" alt="" />
      <h1 className={styles.welcomeText}>歡迎使用</h1>
      <h1 className={styles.petscueText}>Petsuce</h1>
      <div className={styles.sologan}>立刻註冊會員成為熱血的一份子</div>
      <Button
        className={styles.button}
        radius="xl"
        color="violet"
        onClick={() => {
          navigate("/introduction");
        }}
      >
        <span>開始</span>
        <IconArrowNarrowRight className={styles.registerIcon} />
      </Button>
    </div>
  );
}
