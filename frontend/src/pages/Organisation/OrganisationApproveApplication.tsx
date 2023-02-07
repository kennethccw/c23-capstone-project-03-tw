import { useNavigate } from "react-router-dom";
import styles from "../../css/organisationMoreDetails.module.scss";
import { HiCalendar, HiChevronLeft, HiOutlineLocationMarker } from "react-icons/hi";
import { MantineProvider, Tabs, Button, Checkbox } from "@mantine/core";
import { ApplicationContainer } from "../../components/ScheduleComponents";
import { useQuery } from "react-query";
import { getPendingApplication } from "../../api/approvalActivityAPI";
import { Activity } from "../../components/ActivitiesUtilis";
import { useState } from "react";
// import ActivitiesApprovalComponent from "../../components/ActivitiesApprovalComponent";
// import { ApplicationContainer } from "../../components/ScheduleComponents";

export default function ApproveApplication() {
  const navigate = useNavigate();
enum Status{
  pending="處理中",
  approved="己批核"
}



const getPendingAndApprovalApplication=async()=>{
  const pendingApplication=await getPendingApplication();


  return{pendingApplication}
}


console.log(getPendingApplication)

const [status,setStatus]=useState<Status>(Status.pending)

  const { isError, data, error, isLoading } = useQuery({
    queryKey: ["organisation/application"],
    queryFn: getPendingAndApprovalApplication,
  });
  console.log(data);





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
          <HiChevronLeft className={styles.chevronIcon} onClick={()=>navigate(-1)}/>
        </div>

        <div className={styles.headerContainer}>
          <span className={styles.organisationTab}>義工報名批核</span>
        </div>

        <Tabs defaultValue="處理中" color="ocean" className={styles.tabList}>
          <Tabs.List grow>
            <Tabs.Tab value="處理中" onClick={()=>setStatus(Status.pending)}>處理中</Tabs.Tab>
            <Tabs.Tab value="已批核" onClick={()=>setStatus(Status.approved)}>已批核</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        {!data?.pendingApplication.length && status===Status.pending &&(
          <div className={styles.noApplicationContainer}>
            <h2>沒有未處理的申請</h2>
          </div>
        )}
        {status===Status.pending && data?.pendingApplication.map((activity, idx) => (
          <>
            <ApplicationContainer activity={activity} clickHandler={() => navigate(`/activity/detail?id=${activity.activity_id}&status=approval`)} />
            {/* <ActivitiesApprovalComponent member={activity.user_fullname!} /> */}

            {idx !== data.pendingApplication.length - 1 && <hr className={styles.hr90vw} />}
          </>
        ))}

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

        {/* <div className={styles.NameAndApprovalContainer}>
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
        </div> */}



      </div>
    </MantineProvider>
  );
}
