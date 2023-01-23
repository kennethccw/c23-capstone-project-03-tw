import { useNavigate } from "react-router-dom";
import styles from "../../css/organisationMoreDetails.module.scss";
import {
  HiChevronLeft,
  HiOutlineShare,
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiCalendar,
} from "react-icons/hi";
import { MantineProvider, Tabs, Button } from "@mantine/core";
import { sizes } from "@mantine/core/lib/ActionIcon/ActionIcon.styles";
import { ApplicationContainer } from "../../components/ScheduleComponents";

export default function ApprovalFunction() {
  const navigate = useNavigate();
  return (
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
          "milkTea": [
            "#ECE7DD",
            "#ECE7DD",
            "#ECE7DD",
            "#ECE7DD",
            "#ECE7DD",
            "#ECE7DD",
            "#ECE7DD",
            "#ECE7DD",
            "#ECE7DD",
            "#ECE7DD",
          ],
        },
      }}
    >
      <div className={styles.controlPanelContainer}>
        <div className={styles.chevronAndAdjustmntIcon}>
          <HiChevronLeft className={styles.chevronIcon} />
        </div>

        <div className={styles.headerContainer}>
          <span className={styles.organisationTab}>義工報名批核</span>
        </div>

        <Tabs defaultValue="基本資料" color="ocean" className={styles.tabList}>
          <Tabs.List grow>
            <Tabs.Tab value="已批核">已批核</Tabs.Tab>
            <Tabs.Tab value="處理中">處理中</Tabs.Tab>
          </Tabs.List>
        </Tabs>


        <ApplicationContainer imgPath="photos/寵物美容義工.jpeg" organisation="香港動物群益會" activity="場內清潔義工（大量）" location="香港九龍太子基隆街46號地下" date="2023年2月18日（週六）" />
        <ApplicationContainer imgPath="photos/寵物美容義工.jpeg" organisation="香港動物群益會" activity="場內清潔義工（大量）" location="香港九龍太子基隆街46號地下" date="2023年2月18日（週六）" />

        <div className={styles.bottomArea}></div>
      </div>
    </MantineProvider>
  );
}
