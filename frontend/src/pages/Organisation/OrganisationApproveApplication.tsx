import { useNavigate } from "react-router-dom";
import styles from "../../css/organisationMoreDetails.module.scss";
import { HiCalendar, HiChevronLeft, HiOutlineLocationMarker } from "react-icons/hi";
import { MantineProvider, Tabs, Button, Checkbox } from "@mantine/core";
import { ApplicationContainer } from "../../components/ScheduleComponents";
import { useQuery } from "react-query";
import { getPendingApplication } from "../../api/approvalActivityAPI";
// import ActivitiesApprovalComponent from "../../components/ActivitiesApprovalComponent.tsxk";
import { ScheduleActivity } from "../../api/scheduleAPI";
import { useState } from "react";
// import ActivitiesApprovalComponent from "../../components/ActivitiesApprovalComponent";
// import { ApplicationContainer } from "../../components/ScheduleComponents";

export default function ApproveApplication() {
  const navigate = useNavigate();

  const [applicantApprovalArr, setApplicantApprovalArr] = useState<{ activity_id: number; user_id: number; is_approved: boolean }[]>([]);

  const getPendingApplicationObj = async () => {
    const results = await getPendingApplication();
    const activityIdSet = new Set<number>();
    for (const result of results) {
      activityIdSet.add(result.activity_id);
    }
    const activityIdArr = Array.from(activityIdSet);
    const applicantArr: { fullname: string; user_id: number }[] = [];
    const applicationArr: { activity: ScheduleActivity; applicants: { fullname: string; user_id: number }[] }[] = [];
    for (const activityId of activityIdArr) {
      const filteredArr = results.filter((result) => activityId === result.activity_id);
      filteredArr.forEach((activity) => {
        applicantArr.push({ fullname: activity.user_fullname!, user_id: activity.user_id! });
        setApplicantApprovalArr([...applicantApprovalArr, { activity_id: activity.activity_id, user_id: activity.user_id!, is_approved: false }]);
      });
      applicationArr.push({ activity: filteredArr[0], applicants: applicantArr });
    }
    return applicationArr;
  };

  const { isError, data, error, isLoading } = useQuery({
    queryKey: ["organisation/application"],
    queryFn: getPendingApplicationObj,
  });
  console.log(data);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if ()
  };
  const [isChecked, setIsChecked] = useState(false);
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
          <HiChevronLeft className={styles.chevronIcon} onClick={() => navigate(-1)} />
        </div>

        <div className={styles.headerContainer}>
          <span className={styles.organisationTab}>義工報名批核</span>
        </div>

        <Tabs defaultValue="處理中" color="ocean" className={styles.tabList}>
          <Tabs.List grow>
            <Tabs.Tab value="處理中">處理中</Tabs.Tab>
            <Tabs.Tab value="已批核">已批核</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        {!data?.length && (
          <div className={styles.noApplicationContainer}>
            <h2>沒有未處理的申請</h2>
          </div>
        )}
        {data?.map((activityObj, idx) => (
          <>
            <ApplicationContainer activity={activityObj.activity} clickHandler={() => navigate(`/activity/detail?id=${activityObj.activity.activity_id}&status=approval`)} />
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}>
              {/* <ActivitiesApprovalComponent member={activity.user_fullname!} clickHandler={() => navigate("/user/detail")} /> */}
              {activityObj.applicants.map((applicant) => (
                <>
                  <div className={styles.memberName} onClick={() => navigate(`/user/detail?id=${applicant.user_id}`)}>
                    會員：<span className={styles.nameTab}>{applicant.fullname}</span>
                  </div>
                  <div className={styles.approveContainer}>
                    <div className={styles.approveTab}>批核</div>
                    <Checkbox value={`${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}`} className={styles.addressList} onChange={() => setIsChecked(!isChecked)} />
                  </div>
                </>
              ))}
              <Button style={{ width: 130, height: 34, color: "black", fontSize: 14, marginLeft: 140, marginTop: 4, borderRadius: 10, marginBottom: 12 }} color="orange" type="submit">
                確定
              </Button>
            </form>
            {idx !== data.length - 1 && <hr className={styles.hr90vw} />}
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
