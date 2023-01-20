import { Button, Paper } from "@mantine/core";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { RiArrowRightSLine } from "react-icons/ri";
import NewNavbar from "../components/NewNavbar";
import styles from "../css/account.module.scss";
export default function Account() {
  return (
    <div className={styles.containerForAll}>
      <h1 className={styles.header}>帳戶</h1>
      <hr className={styles.headerHr} />
      <div className={styles.forFlexColumn}>
        <Paper shadow="xl" radius="xl" p="xl" className={styles.paperContainer}>
          <div className={styles.forFlex}>
            <HiOutlineUserCircle className={styles.userProfileIcon} />
            <div>編輯帳號</div>
          </div>
          <div className={styles.profileBtn}>
            <span>查看完整帳號</span>
          </div>
        </Paper>
      </div>
      <hr className={styles.headerHr90vw} />
      <div className={styles.forFlexColumn}>
        <Button variant="subtle" color="dark" className={styles.titleContainer}>
          <div>報名紀錄</div>
          <RiArrowRightSLine />
        </Button>
        <Button variant="subtle" color="dark" className={styles.titleContainer}>
          <div>社職紀錄</div>
          <RiArrowRightSLine />
        </Button>
        <Button variant="subtle" color="dark" className={styles.titleContainer}>
          <div>徽章</div>
          <RiArrowRightSLine />
        </Button>
        <Button variant="subtle" color="dark" className={styles.titleContainer}>
          <div>申請領養紀錄</div>
          <RiArrowRightSLine />
        </Button>
      </div>
      <hr className={styles.headerHr90vw} />
      <div className={styles.forFlexColumn}>
        <Button variant="subtle" color="dark" className={styles.titleContainer}>
          <div>私隱和安全</div>
          <RiArrowRightSLine />
        </Button>
      </div>

      <hr className={styles.headerHr90vw} />
      <div className={styles.forFlexColumn}>
        <Button variant="subtle" color="dark" className={styles.titleContainer}>
          <div>聯絡我們</div>
          <RiArrowRightSLine />
        </Button>
      </div>
      <hr className={styles.headerHr90vw} />

      <div className={styles.forFlexColumn}>
        <div className={styles.forFlexColumnLastRow}>
          <Button variant="subtle" color="dark" className={styles.titleLastRow}>
            服務條款
          </Button>
          <Button variant="subtle" color="dark" className={styles.titleLastRow}>
            私隱政策
          </Button>
          <Button variant="subtle" color="violet" className={styles.logoutBtn}>
            登出
          </Button>
        </div>
      </div>

      <NewNavbar />
    </div>
  );
}
