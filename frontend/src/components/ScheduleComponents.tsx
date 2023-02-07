import styles from "../css/schedule.module.scss";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { HiCalendar, HiOutlineLocationMarker } from "react-icons/hi";
import { ScheduleActivity } from "../api/scheduleAPI";

export function NoApplicationContainer() {
  const navigate = useNavigate();
  return (
    <div className={styles.noApplicationsAppliedContainer}>
      <h3 className={styles.noApplicationsAppliedHeader}>你暫時沒有已確認或處理中的報名</h3>
      <div className={styles.noApplicationsAppliedText}>查看其他熱門活動</div>
      <Button
        className={styles.button}
        color="petscue-purple"
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

export function ApplicationContainer(props: { activity: ScheduleActivity; clickHandler: () => void }) {
  const startTime = new Date(props.activity.start_time);
  const startMonth = startTime.getMonth() + 1;
  const startDate = startTime.getDate();
  const endTime = new Date(props.activity.end_time);
  const endMonth = endTime.getMonth() + 1;
  const endDate = endTime.getDate();

  return (
    <div className={styles.applicationsAppliedContainer} onClick={() => props.clickHandler()}>
      <img className={styles.applicationsAppliedImg} src={`${process.env.REACT_APP_BACKEND_URL}/activities/${props.activity.image}`} alt="" />
      {/* <img className={styles.applicationsAppliedImg} src={`${process.env.REACT_APP_S3_UPLOAD_BUCKET_URL}/activities/${props.activity.image}`} alt="" /> */}
      <div className={styles.applicationsAppliedTextContent}>
        <div className={styles.organisationName}>{props.activity.organisation}</div>
        <div className={styles.activityName}>{props.activity.activity}</div>
        <div className={styles.detailContainer}>
          <HiOutlineLocationMarker className={styles.detailIcon} />
          <div>{props.activity.location}</div>
        </div>
        <div className={styles.detailContainer}>
          <HiCalendar className={styles.detailIcon} />
          {startMonth === endMonth && startDate === endDate ? (
            <>
              &nbsp;<span>{startMonth}</span>月<span>{startDate}</span>日
            </>
          ) : (
            <>
              &nbsp;<span>{startMonth}</span>月<span>{startDate}</span>日-<span>{endMonth}</span>月<span>{endDate}</span>日
            </>
          )}
        </div>
      </div>
    </div>
  );
}
