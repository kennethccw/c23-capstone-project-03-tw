import { Button } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import styles from "../css/noticePasswordChanged.module.scss";

export default function NoticePasswordChanged() {
  const navigate = useNavigate();
  return (
    <div className={styles.containerForAll}>
      <div className={styles.imageTextContainer}>
        <img className={styles.image} src="photos/Screenshot 2023-01-11 at 11.58.24 PM.png" alt="" />
        <h2 className={styles.noticeText}>密碼已成功更改！</h2>
      </div>

      <Button
        className={styles.button}
        color="violet"
        radius="xl"
        type="submit"
        onClick={() => {
          navigate("/login");
        }}
      >
        <div>確認新密碼</div>
        <IconArrowNarrowRight className={styles.rightArrowIcon} />
      </Button>
    </div>
  );
}
