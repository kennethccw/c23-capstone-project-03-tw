import { Paper } from "@mantine/core";
import { AdoptionResult, AdoptionResultStatus } from "../api/adoptionAPI";
import styles from "../css/adoptionApplicationResult.module.scss";

export default function AdoptionApplicationComponent(props: { result: AdoptionResult; clickHandler: () => void }) {
  enum AdoptionResultChineseStatus {
    pending = "處理中",
    success = "通過",
    fail = "不通過",
    cancelled = "已取消",
  }
  enum AdoptionResultChineseFailReason {
    not_applicable = "不適用",
    age_under_21 = "未滿二十一歲",
    no_window_screen = "沒有裝窗網",
    other = "其他原因",
  }

  return (
    <div className={styles.petPaperBigContainer} onClick={props.clickHandler}>
      <Paper shadow="xl" radius="xl" p="xl" className={styles.paperContainer}>
        <img className={styles.petImg} src={`${process.env.REACT_APP_BACKEND_URL}/pet/${props.result.image}`} alt="" />
        <div className={styles.petDetailContainer}>
          <div className={styles.petLabelContentContainer}>
            <div className={styles.petLabelText}>動物名稱：</div>
            <div className={styles.petContentText}>{props.result.name}</div>
          </div>
          <div className={styles.petLabelContentContainer}>
            <div className={styles.petLabelText}>申請結果：</div>
            <div className={styles.petContentText}>{AdoptionResultChineseStatus[props.result.status]}</div>
          </div>
          {props.result.status === AdoptionResultStatus.fail && (
            <div className={styles.petLabelContentContainer}>
              <div className={styles.petLabelText}>不通過原因：</div>
              <div className={styles.petContentText}>
                {AdoptionResultChineseFailReason[props.result.fail_reason]}
                {props.result.other_fail_reason && <> = {props.result.other_fail_reason}</>}
              </div>
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
}
