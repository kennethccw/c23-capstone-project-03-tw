import styles from "../css/schedule.module.scss";
import { ActivityPreview } from "../api/activityAPI";
import { HiCalendar, HiOutlineLocationMarker } from "react-icons/hi";

export function Activity(props: { activity: ActivityPreview; clickHandler: () => void }) {
  const startTime = new Date(props.activity.start_time);
  const startMonth = startTime.getMonth() + 1;
  const startDate = startTime.getDate();
  const endTime = new Date(props.activity.end_time);
  const endMonth = endTime.getMonth() + 1;
  const endDate = endTime.getDate();

  return (
    <div className={styles.applicationsAppliedContainer} onClick={() => props.clickHandler()}>
      <img className={styles.applicationsAppliedImg} src={`/${props.activity.image}`} alt="" />
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
