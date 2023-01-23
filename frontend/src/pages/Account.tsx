import { Button, Paper } from "@mantine/core";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import NewNavbar from "../components/NewNavbar";
import styles from "../css/account.module.scss";
export default function Account() {
  const navigate = useNavigate();
  return (
    <div className={styles.containerForAll}>
      <h1 className={styles.header}>帳戶</h1>
      <hr className={styles.headerHr} />
      <div className={styles.forFlexColumn}>
        <Paper shadow="xl" radius="xl" p="xl" className={styles.paperContainer}>
          <div className={styles.forFlex}>
            <HiOutlineUserCircle className={styles.userProfileIcon} />
            <div>{localStorage.getItem("username")}</div>
          </div>
          <div className={styles.profileBtn} onClick={() => navigate("/profile")}>
            <span>查看完整帳號</span>
          </div>
        </Paper>
      </div>
      <hr className={styles.headerHr90vw} />
      <div className={styles.forFlexColumn}>
        <Button variant="subtle" color="dark" className={styles.titleContainer} onClick={() => navigate("/profile")}>
          <div>報名紀錄</div>
          <RiArrowRightSLine size={24} />
        </Button>
        <Button variant="subtle" color="dark" className={styles.titleContainer} onClick={() => navigate("/record")}>
          <div>社職紀錄</div>
          <RiArrowRightSLine size={24} />
        </Button>
        <Button variant="subtle" color="dark" className={styles.titleContainer} onClick={() => navigate("/badge")}>
          <div>徽章</div>
          <RiArrowRightSLine size={24} />
        </Button>
        <Button variant="subtle" color="dark" className={styles.titleContainer} onClick={() => navigate("/result")}>
          <div>申請領養紀錄</div>
          <RiArrowRightSLine size={24} />
        </Button>
      </div>
      <hr className={styles.headerHr90vw} />
      <div className={styles.forFlexColumn}>
        <Button variant="subtle" color="dark" className={styles.titleContainer} onClick={() => navigate("/privacy-and-security")}>
          <div>私隱和安全</div>
          <RiArrowRightSLine size={24} />
        </Button>
      </div>

      <hr className={styles.headerHr90vw} />
      <div className={styles.forFlexColumn}>
        <Button variant="subtle" color="dark" className={styles.titleContainer} onClick={() => navigate("/contact")}>
          <div>聯絡我們</div>
          <RiArrowRightSLine size={24} />
        </Button>
      </div>
      <hr className={styles.headerHr90vw} />

      <div className={styles.forFlexColumn}>
        <div className={styles.forFlexColumnLastRow}>
          <Button variant="subtle" color="dark" className={styles.titleLastRow} onClick={() => navigate("/profile")}>
            服務條款
          </Button>
          <Button variant="subtle" color="dark" className={styles.titleLastRow} onClick={() => navigate("/profile")}>
            私隱政策
          </Button>
          <Button
            variant="subtle"
            color="violet"
            className={styles.logoutBtn}
            onClick={() => {
              navigate("/");
              localStorage.clear();
            }}
          >
            登出
          </Button>
        </div>
      </div>

      <NewNavbar activeBtn="user" />
    </div>
  );
}
