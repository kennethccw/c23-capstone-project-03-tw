import { Timeline } from "@mantine/core";
import styles from "../css/volunteerRecord.module.scss";
export default function VolunteerRecordComponent(props: { activity_date: string }) {
  return (
    // <Timeline.Item className={styles.timeLineItem} title={props.activity_name}>
    <div className={styles.timeLineDate}>
      <span className={styles.timeLineYear}>{props.activity_date.split("-")[0]}</span>-{props.activity_date.split("-")[1]}-{props.activity_date.split("-")[2]}
    </div>
    // </Timeline.Item>
  );
}
