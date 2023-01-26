import styles from "../css/filterPage.module.scss";
import { HiOutlineX } from "react-icons/hi";

import { Button, Checkbox, MantineProvider } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function BadgeFilterYear() {
  const navigate = useNavigate();

  const [yearCheckbox1, setYearCheckbox1] = useState(false);
  const [yearCheckbox2, setYearCheckbox2] = useState(false);
  const [yearCheckbox3, setYearCheckbox3] = useState(false);

  return (
    <MantineProvider
      theme={{
        colors: {
          ocean: ["#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5"],
          "bright-pink": ["#F0BBDD", "#ED9BCF", "#EC7CC3", "#ED5DB8", "#F13EAF", "#F71FA7", "#FF00A1", "#E00890", "#C50E82", "#AD1374"],
        },
      }}
    >
      <div className={styles.containerForAll}>
        <div className={styles.filterHeader}>
          <HiOutlineX className={styles.closeTab} onClick={() => navigate(-1)} />
          <span className={styles.filterTab}>篩選</span>
          <span
            className={styles.deleteAllTab}
            onClick={() => {
              setYearCheckbox1(false);
              setYearCheckbox2(false);
              setYearCheckbox3(false);
            }}
          >
            全部清除
          </span>
        </div>

        <div className={styles.filterContentContainer}>
          <div className={styles.filterContent}>
            <div className={styles.addressTab}>年份</div>
            <div>
              <Checkbox className={styles.addressList} checked={yearCheckbox1} label="2021" value="2021" color="ocean" onChange={() => setYearCheckbox1(true)} />
              <Checkbox className={styles.addressList} checked={yearCheckbox2} label="2022" value="2022" color="ocean" onChange={() => setYearCheckbox2(true)} />
              <Checkbox className={styles.addressList} checked={yearCheckbox3} label="2023" value="2023" color="ocean" onChange={() => setYearCheckbox3(true)} />
            </div>
          </div>
          <Button className={styles.button} color="violet" radius="xl" type="submit">
            <div>顯示搜尋結果（{}）</div>
          </Button>
        </div>
      </div>
    </MantineProvider>
  );
}
