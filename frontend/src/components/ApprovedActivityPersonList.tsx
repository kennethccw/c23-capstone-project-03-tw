import { ScheduleActivity } from "../api/scheduleAPI";
import styles from "../css/schedule.module.scss";

export function ApprovedActivityPersonList(props:{eachPerson:string}) {

    return (<>

        <div className={styles.nameList}>
            <div className={styles.memberName}>會員：{props.eachPerson }</div>
            <div className={styles.approvedWord}>申請已經批核</div>
        </div>

    </>)
}