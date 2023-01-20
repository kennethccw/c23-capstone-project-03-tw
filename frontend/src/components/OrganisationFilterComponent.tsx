import { ClassNames } from "@emotion/react";
import styles from "../css/organisationFilterPage.module.scss";
import { HiOutlineX } from "react-icons/hi";

import {
  UnstyledButton,
  Checkbox,
  Text,
  createStyles,
  MantineProvider,
} from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";

export function OrganisationFilter() {
  return (
    <>
      <MantineProvider
        theme={{
          colors: {
            ocean: [
              "#585CE5",
              "#585CE5",
              "#585CE5",
              "#585CE5",
              "#585CE5",
              "#585CE5",
              "#585CE5",
              "#585CE5",
              "#585CE5",
              "#585CE5",
            ],
            "bright-pink": [
              "#F0BBDD",
              "#ED9BCF",
              "#EC7CC3",
              "#ED5DB8",
              "#F13EAF",
              "#F71FA7",
              "#FF00A1",
              "#E00890",
              "#C50E82",
              "#AD1374",
            ],
          },
        }}
      >
        <div className={styles.filterHeader}>
          <HiOutlineX className={styles.closeTab} />
          <span className={styles.filterTab}>篩選</span>
          <span className={styles.deleteAllTab}>全部清除</span>
        </div>

        <div className={styles.filterContentContainer}>
          <div className={styles.addressTab}>地點</div>
          <div>
            <Checkbox className={styles.addressList} label="香港島" color="ocean" />
            <Checkbox className={styles.addressList} label="九龍" color="ocean" />
            <Checkbox className={styles.addressList} label="新界" color="ocean" />
          </div>
        </div>
      </MantineProvider>
    </>
  );
}
