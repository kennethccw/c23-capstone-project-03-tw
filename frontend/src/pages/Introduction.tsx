import styles from "../css/login.module.scss";
export default function Introduction() {
  return (
    <div className={styles.welcomeContainer}>
      <h1 className={styles.welcomeText}>歡迎有愛心的你</h1>
      <h1>加入成為義工！</h1>
    </div>
  );
}
