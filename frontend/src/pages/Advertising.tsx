import styles from "../css/adv.module.scss";
import { useNavigate } from "react-router-dom";
import { FiXCircle } from "react-icons/fi";
import { Button } from "@mantine/core";

export default function Advertising() {
  const navigate = useNavigate();
  return (
    <div className={styles.advContainer}>
      
      <Button
        className={styles.advBtn}
        color="violet"
        // radius="xl"
        // onClick={() => {
        // navigate("/register");
      >
        <div>感謝為流浪動物出一分力</div>
        <FiXCircle className={styles.closeBtn} />
      </Button>
      
      <img
        className={styles.imgContainer}
        src="photos/adv-15s.png"
        alt="嘉頓"
      />
    </div>
  );
}
