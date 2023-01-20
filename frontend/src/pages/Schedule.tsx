import { Badge, Button, MantineProvider, Tabs } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import styles from "../css/schedule.module.scss";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiCalendar } from "react-icons/hi2";
import NewNavbar from "../components/NewNavbar";
import { ApplicationContainer, NoApplicationContainer } from "../components/ScheduleComponents";
export default function Schedule() {
  const navigate = useNavigate();
  return (
    <MantineProvider
      theme={{
        colors: {
          "ocean-blue": ["#7AD1DD", "#5FCCDB", "#44CADC", "#2AC9DE", "#1AC2D9", "#11B7CD", "#09ADC3", "#0E99AC", "#128797", "#147885"],
          "bright-pink": ["#F0BBDD", "#ED9BCF", "#EC7CC3", "#ED5DB8", "#F13EAF", "#F71FA7", "#FF00A1", "#E00890", "#C50E82", "#AD1374"],
          "petscue-purple": ["#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5"],
        },
      }}
    >
      <div className={styles.containerForAll}>
        <h1 className={styles.header}>你的日程</h1>

        <Tabs className={styles.scheduleTabContainer} color="petscue-purple">
          <Tabs.List grow>
            <Tabs.Tab
              rightSection={
                <Badge sx={{ width: 16, height: 16, pointerEvents: "none" }} color="petscue-purple" variant="filled" size="xs" p={0}>
                  6
                </Badge>
              }
              value="已確認"
            >
              已確認
            </Tabs.Tab>

            <Tabs.Tab
              value="處理中"
              rightSection={
                <Badge sx={{ width: 16, height: 16, pointerEvents: "none" }} color="petscue-purple" variant="filled" size="xs" p={0}>
                  6
                </Badge>
              }
            >
              處理中
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        {/* NO APPLICATION COMPONENT */}
        {/* <NoApplicationContainer /> */}
        {/* <div className={styles.noApplicationsAppliedContainer}>
          <h3 className={styles.noApplicationsAppliedHeader}>你暫時沒有已確認的報名</h3>
          <div className={styles.noApplicationsAppliedText}>查看其他熱門活動</div>
          <Button
            className={styles.button}
            color="petscue-purple"
            radius="xl"
            onClick={() => {
              navigate("/home");
            }}
          >
            立即探索
          </Button>
          </div> */}
        {/* NO APPLICATION COMPONENT */}
        {/* APPLICATION COMPONENT */}
        <ApplicationContainer imgPath="photos/寵物美容義工.jpeg" organisation="香港動物群益會" activity="場內清潔義工（大量）" location="香港九龍太子基隆街46號地下" date="2023年2月18日（週六）" />
        <ApplicationContainer imgPath="photos/寵物美容義工.jpeg" organisation="香港動物群益會" activity="場內清潔義工（大量）" location="香港九龍太子基隆街46號地下" date="2023年2月18日（週六）" />
        <ApplicationContainer imgPath="photos/寵物美容義工.jpeg" organisation="香港動物群益會" activity="場內清潔義工（大量）" location="香港九龍太子基隆街46號地下" date="2023年2月18日（週六）" />
        <ApplicationContainer imgPath="photos/寵物美容義工.jpeg" organisation="香港動物群益會" activity="場內清潔義工（大量）" location="香港九龍太子基隆街46號地下" date="2023年2月18日（週六）" />
        <ApplicationContainer imgPath="photos/寵物美容義工.jpeg" organisation="香港動物群益會" activity="場內清潔義工（大量）" location="香港九龍太子基隆街46號地下" date="2023年2月18日（週六）" />
        {/* <div className={styles.applicationsAppliedContainer}>
          <img className={styles.applicationsAppliedImg} src="photos/寵物美容義工.jpeg" alt="" />
          <div className={styles.applicationsAppliedTextContent}>
            <div className={styles.organisationName}>香港動物群益會</div>
            <div className={styles.activityName}>場內清潔義工（大量）</div>
            <div className={styles.detailContainer}>
              <HiOutlineLocationMarker className={styles.detailIcon} />
              <div>香港九龍太子基隆街46號地下</div>
            </div>
            <div className={styles.detailContainer}>
              <HiCalendar className={styles.detailIcon} />
              <div>2023年2月18日（週六） </div>
            </div>
          </div>
        </div> */}
        {/* APPLICATION COMPONENT */}
        <NewNavbar />
      </div>
    </MantineProvider>
  );
}