import styles from "../css/notification.module.scss";

export default function NotificationComponent(props: { content: string; clickHandler: () => void }) {
  return (
    <>
      <div className={styles.notificationContainer} onClick={props.clickHandler}>
        <div>{props.content}</div>
      </div>
      <hr className={styles.hr90vw} />
    </>
  );
}
