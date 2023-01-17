import { IoIosArrowBack } from "react-icons/io";
import styles from "../css/login.module.scss";

export default function Donation() {
  return (
    <div>
      <IoIosArrowBack className={styles.navigateBackButton} />
      <div className={styles.adoptionDetailHeaderContainer}>
        <h1>捐款樂</h1>
      </div>
      <hr className={styles.adoptionDetailHr} />
    </div>
  );
}
