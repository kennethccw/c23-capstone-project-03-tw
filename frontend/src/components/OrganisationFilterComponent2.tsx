import { ClassNames } from "@emotion/react";
import styles from "../css/filterPage.module.scss";
import { HiOutlineX } from "react-icons/hi";

import { UnstyledButton, Checkbox, Text, createStyles, MantineProvider } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";

interface OrganisationFilterProps {
  onBack?: () => void;
  isHKIslandChecked?: boolean;
  isKowloonChecked?: boolean;
  isNTChecked?: boolean;
  onCheckHKI?: () => void;
  onCheckKowloon?: () => void;
  onCheckNT?: () => void;
  onCheckWeekDay?: () => void;
  onCheckWeekend?: () => void;
  onConfirm?: () => void;
  numberOfAvailableActivities?: number;
  onClearAll?: () => void;
  isWeekDayChecked?: boolean;
  isWeekendChecked?: boolean;
  status?: string;
}

export default function OrganisationFilter(props: OrganisationFilterProps) {
  return (
    <>
      <MantineProvider
        theme={{
          colors: {
            ocean: ["#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5"],
            "bright-pink": ["#F0BBDD", "#ED9BCF", "#EC7CC3", "#ED5DB8", "#F13EAF", "#F71FA7", "#FF00A1", "#E00890", "#C50E82", "#AD1374"],
          },
        }}
      >
        <div className={styles.filterHeader}>
          <HiOutlineX className={styles.closeTab} onClick={props.onBack} />
          <span className={styles.filterTab}>篩選</span>
          <span className={styles.deleteAllTab} onClick={props.onClearAll}>
            全部清除
          </span>
        </div>

        <div className={styles.filterContentContainer}>
          <div className={styles.addressTab}>地點</div>

          <div className={styles.addressContainer}>
            <Checkbox className={styles.addressList} label="香港島" color="ocean" checked={props.isHKIslandChecked} onClick={props.onCheckHKI} />
            <Checkbox className={styles.addressList} label="九龍" color="ocean" checked={props.isKowloonChecked} onClick={props.onCheckKowloon} />
            <Checkbox className={styles.addressList} label="新界" color="ocean" checked={props.isNTChecked} onClick={props.onCheckNT} />
          </div>

          {props.status !== "organisation" && (
            <div>
              <div className={styles.timeslotTab}>出席日子</div>
              <div className={styles.timeslotContainer}>
                <label className={`${styles.weekDay}`} style={{ background: props.isWeekDayChecked === true ? "#d0d1ff" : "none" }} onClick={props.onCheckWeekDay}>
                  平日 （週一至週五）{" "}
                </label>
                <label className={`${styles.weekend}`} style={{ background: props.isWeekendChecked === true ? "#d0d1ff" : "none" }} onClick={props.onCheckWeekend}>
                  週末 （週六至週日）
                </label>
              </div>
            </div>
          )}

          <div className={styles.countAndConfirmContainer}>
            <div className={styles.available}> 可選擇義工數目： {props.numberOfAvailableActivities}</div>
            <div className={styles.confirmButton} onClick={props.onConfirm}>
              確定
            </div>
          </div>
        </div>
      </MantineProvider>
    </>
  );
}
