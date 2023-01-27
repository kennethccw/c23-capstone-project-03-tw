import { useNavigate } from "react-router-dom";
import styles from "../../css/animalHelpChat.module.scss";
import {
  HiChevronLeft,
} from "react-icons/hi";
import {
  MantineProvider,
} from "@mantine/core";

export default function AnimalHelpToDoListfrom() {
  const navigate = useNavigate();
  return (
    <MantineProvider
      theme={{
        colors: {
          ocean: [
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
          ],
        },
      }}
    >
      <div>
        <div>
          <div className={styles.chevronIconContainer}>
            <HiChevronLeft className={styles.chevronIconTab} />
          </div>
        </div>

        <div>
          <div className={styles.taskContanier}>
            <div className={styles.taskTab}>你有2個信息來自嗶哩叭啦星球</div>
          </div>
          <div className={styles.statusContainer}>
            <div className={styles.statusTab}>拯救進行中</div>
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}
