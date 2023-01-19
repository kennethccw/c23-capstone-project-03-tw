import styles from "../css/schedule.module.scss";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { HiCalendar, HiOutlineLocationMarker } from "react-icons/hi";

export function NoApplicationContainer() {
  const navigate = useNavigate();
  return (
    <div className={styles.noApplicationsAppliedContainer}>
      <h3 className={styles.noApplicationsAppliedHeader}>你暫時沒有已確認的報名</h3>
      <div className={styles.noApplicationsAppliedText}>查看其他熱門活動</div>
      <Button
        className={styles.button}
        color="petsuce-purple"
        radius="xl"
        onClick={() => {
          navigate("/home");
        }}
      >
        立即探索
      </Button>
    </div>
  );
}

interface Application {
  imgPath: string;
  organisation: string;
  activity: string;
  location: string;
  date: string;
}

export function ApplicationContainer(props: Application) {
  return (
    <div className={styles.applicationsAppliedContainer}>
      <img className={styles.applicationsAppliedImg} src={props.imgPath} alt="" />
      <div className={styles.applicationsAppliedTextContent}>
        <div className={styles.organisationName}>{props.organisation}</div>
        <div className={styles.activityName}>{props.activity}</div>
        <div className={styles.detailContainer}>
          <HiOutlineLocationMarker className={styles.detailIcon} />
          <div>{props.location}</div>
        </div>
        <div className={styles.detailContainer}>
          <HiCalendar className={styles.detailIcon} />
          <div>{props.date} </div>
        </div>
      </div>
    </div>
  );
}
