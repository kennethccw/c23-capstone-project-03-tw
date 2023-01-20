import styles from "../css/filterPage.module.scss";
import { HiOutlineX } from "react-icons/hi";

import { Checkbox, MantineProvider } from "@mantine/core";

export function BadgeFilterYear() {
  return (
    <MantineProvider
      theme={{
        colors: {
          ocean: ["#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5"],
          "bright-pink": ["#F0BBDD", "#ED9BCF", "#EC7CC3", "#ED5DB8", "#F13EAF", "#F71FA7", "#FF00A1", "#E00890", "#C50E82", "#AD1374"],
        },
      }}
    >
      <div>
        <div className={styles.filterHeader}>
          <HiOutlineX className={styles.closeTab} />
          <span className={styles.filterTab}>篩選</span>
          <span className={styles.deleteAllTab}>全部清除</span>
        </div>

        <div className={styles.filterContentContainer}>
          <div className={styles.addressTab}>年份</div>
          <div>
            <Checkbox className={styles.addressList} label="2021" color="ocean" />
            <Checkbox className={styles.addressList} label="2022" color="ocean" />
            <Checkbox className={styles.addressList} label="2023" color="ocean" />
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}
