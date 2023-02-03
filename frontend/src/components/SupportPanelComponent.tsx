import styles from "../css/animalHelpChat.module.scss";
export enum Status {
  pending = "拯救進行中",
}

export default function SupportPanelComponent(props: { numberOfMessages: number; username: string; status: Status; clickHandler: () => void }) {
  return (
    <div>
      <div className={styles.taskContanier} onClick={() => props.clickHandler()}>
        <div className={styles.taskTab}>
          你有{props.numberOfMessages}個信息來自{props.username}
        </div>
      </div>
      <div className={styles.statusContainer}>
        <div className={styles.statusTab}>{props.status}</div>
      </div>
    </div>
  );
}
