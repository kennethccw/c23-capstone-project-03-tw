import { Checkbox } from "@mantine/core";
import styles from "../../css/organisationMoreDetails.module.scss";

export default function ActivitiesApplicantComponent(props: { member: string }) {
  return (
    <div className={styles.NameAndApprovalContainer}>
      <div className={styles.memberName}>
        會員：<span className={styles.nameTab}>嗶哩叭啦星球</span>
      </div>
      <div className={styles.approveContainer}>
        <div className={styles.approveTab}>批核</div>
        <Checkbox className={styles.addressList} />
      </div>
    </div>
  );
}
