import { useNavigate } from "react-router-dom";
import styles from "../../css/organisationMoreDetails.module.scss";
import { HiCalendar, HiChevronLeft, HiOutlineLocationMarker } from "react-icons/hi";
import { MantineProvider, Tabs, Button, Checkbox } from "@mantine/core";
import { ApplicationContainer } from "../../components/ScheduleComponents";
import { useQuery } from "react-query";
import { getPendingApplication } from "../../api/approvalActivityAPI";
import ActivitiesApplicantComponent from "../../components/ActivitiesApplicantComponent";
// import { ApplicationContainer } from "../../components/ScheduleComponents";

export default function ApproveApplication() {
  const navigate = useNavigate();
  // const { isError, data, error, isLoading } = useQuery({
  //   queryKey: ["organisation/application"],
  //   queryFn: getPendingApplication,
  // });
  // console.log(data);
  return (
    <MantineProvider
      theme={{
        colors: {
          ocean: ["#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5"],
          orange: ["#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93"],
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
        {/* {!data?.length && (
          <div className={styles.noApplicationContainer}>
            <h2>沒有未處理的申請</h2>
          </div>
        )}
        {data?.map((activity) => (
          <>
            <ApplicationContainer activity={activity} clickHandler={() => navigate(`/activity/detail?id=${activity.activity_id}&status=approval`)} /> */}
        {/* <ActivitiesApplicantComponent member={activity.user_id} /> */}
        {/* </>
        ))} */}

        {/* <div className={styles.activtyContainer}>
          <div className={styles.OrganisationName}> 香港動物群益會 </div>
          <div className={styles.activityName}> 場內清潔義工 (大量) </div>

          <div className={styles.locationContanier}>
            <HiOutlineLocationMarker className={styles.locationIcon} />
            <div className={styles.locationName}> 香港九龍太子基隆街46號地下 </div>
          </div>

          <div className={styles.DateContainer}>
            <HiCalendar className={styles.dateIcon} />
            <div className={styles.DateTab}> 2023年2月18日（週六） </div>
          </div>
        </div> */}
        {/* <hr className={styles.lineStyle}></hr> */}

        <div className={styles.NameAndApprovalContainer}>
          <div className={styles.memberName}>
            會員：<span className={styles.nameTab}>嗶哩叭啦星球</span>
          </div>
          <div className={styles.approveContainer}>
            <div className={styles.approveTab}>批核</div>
            <Checkbox className={styles.addressList} />
          </div>
        </div>

        <div className={styles.NameAndApprovalContainer}>
          <div className={styles.memberName}>
            會員：<span className={styles.nameTab}>嗶哩叭啦星球</span>
          </div>
          <div className={styles.approveContainer}>
            <div className={styles.approveTab}>批核</div>
            <Checkbox className={styles.addressList} />
          </div>
        </div>

        <div className={styles.NameAndApprovalContainer}>
          <div className={styles.memberName}>
            會員：<span className={styles.nameTab}>嗶哩叭啦星球</span>
          </div>
          <div className={styles.approveContainer}>
            <div className={styles.approveTab}>批核</div>
            <Checkbox className={styles.addressList} />
          </div>
        </div>
        <div className={styles.NameAndApprovalContainer}>
          <div className={styles.memberName}>
            會員：<span className={styles.nameTab}>嗶哩叭啦星球</span>
          </div>
          <div className={styles.approveContainer}>
            <div className={styles.approveTab}>批核</div>
            <Checkbox className={styles.addressList} />
          </div>
        </div>

        <div>
          <Button style={{ width: 130, height: 34, color: "black", fontSize: 14, marginLeft: 140, marginTop: 70, borderRadius: 10, marginBottom: 60 }} color="orange">
            {" "}
            確定
          </Button>
        </div>
      </div>
    </MantineProvider>
  );
}
