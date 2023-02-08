import { useNavigate } from "react-router-dom";
import styles from "../../css/organisationMoreDetails.module.scss";
import { HiCalendar, HiChevronLeft, HiOutlineLocationMarker } from "react-icons/hi";
import { MantineProvider, Tabs, Button, Checkbox } from "@mantine/core";
import { ApplicationContainer } from "../../components/ScheduleComponents";
import { useQuery } from "react-query";
// import ActivitiesApprovalComponent from "../../components/ActivitiesApprovalComponent.tsxk";
import { ScheduleActivity } from "../../api/scheduleAPI";
import { getApprovedApplication, getPendingApplication, putPendingApplication } from "../../api/approvalActivityAPI";
import { Activity } from "../../components/ActivitiesUtilis";
import { useState } from "react";
// import ActivitiesApprovalComponent from "../../components/ActivitiesApprovalComponent";
// import { ApplicationContainer } from "../../components/ScheduleComponents";

export default function ApproveApplication() {
  const navigate = useNavigate();

  // const [applicantApprovalArr, setApplicantApprovalArr] = useState<{ activity_id: number; user_id: number; is_approved: boolean }[]>([]);
  const [applicantApprovalArr, setApplicantApprovalArr] = useState<string[]>([]);

  // const getPendingApplicationObj = async () => {
  //   const results = await getPendingApplication();
  //   const activityIdSet = new Set<number>();
  //   for (const result of results) {
  //     activityIdSet.add(result.activity_id);
  //   }
  //   const activityIdArr = Array.from(activityIdSet);
  //   const applicantArr: { fullname: string; user_id: number }[] = [];
  //   const applicationArr: { activity: ScheduleActivity; applicants: { fullname: string; user_id: number }[] }[] = [];
  //   for (const activityId of activityIdArr) {
  //     const filteredArr = results.filter((result) => activityId === result.activity_id);
  //     filteredArr.forEach((activity) => {
  //       applicantArr.push({ fullname: activity.user_fullname!, user_id: activity.user_id! });
  //       setApplicantApprovalArr([...applicantApprovalArr, { activity_id: activity.activity_id, user_id: activity.user_id!, is_approved: false }]);
  //     });
  //     applicationArr.push({ activity: filteredArr[0], applicants: applicantArr });
  //   }
  //   return applicationArr;
  // };
  const getPendingAndApprovalApplication = async () => {
    const approvedApplication = await getApprovedApplication();
    const results = await getPendingApplication();
    const activityIdSet = new Set<number>();
    for (const result of results) {
      activityIdSet.add(result.activity_id);
    }
    const activityIdArr = Array.from(activityIdSet);
    const applicantArr: { fullname: string; user_id: number }[] = [];
    const pendingApplication: { activity: ScheduleActivity; applicants: { fullname: string; user_id: number }[] }[] = [];
    for (const activityId of activityIdArr) {
      const filteredArr = results.filter((result) => activityId === result.activity_id);
      filteredArr.forEach((activity) => {
        applicantArr.push({ fullname: activity.user_fullname!, user_id: activity.user_id! });
        // setApplicantApprovalArr(applicantApprovalArr.concat([{ activity_id: activity.activity_id, user_id: activity.user_id!, is_approved: false }]));
      });
      pendingApplication.push({ activity: filteredArr[0], applicants: applicantArr });
    }
    console.log(applicantArr);

    return { pendingApplication, approvedApplication };
  };

  const { isError, data, error, isLoading } = useQuery({
    queryKey: ["organisation/application"],
    queryFn: getPendingAndApprovalApplication,
    refetchInterval: 5_000,
    staleTime: 10_000,
    retry: 1,
  });
  console.log("approvedApplications: ",data?.approvedApplication);

  console.log("pendingApplications" ,data?.pendingApplication)
  console.log(data);
  const [isChecked, setIsChecked] = useState(false);
  enum Status {
    pending = "處理中",
    approved = "己批核",
  }

  console.log(applicantApprovalArr);

  const [status, setStatus] = useState<Status>(Status.pending);
  console.log(data);
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>, activity_id: number) => {
    e.preventDefault();

    const formStringArr = applicantApprovalArr.filter((item) => parseInt(item.split("-")[2]) === activity_id);

    const formObjArr = formStringArr.map((form) => {
      return {
        fullname: form.split("-")[0],
        user_id: parseInt(form.split("-")[1]),
        activity_id: parseInt(form.split("-")[2]),
        is_approved: form.split("-")[3] === "approved",
        is_rejected: form.split("-")[3] === "rejected",
      };
    });

    const resp = await putPendingApplication(formObjArr);
    const result = await resp.json();
    if (resp.status === 200) {
      setStatus(Status.approved);
    } else {
      alert(result.message);
    }
  };
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
            <Tabs.Tab value="處理中" onClick={() => setStatus(Status.pending)}>
              處理中
            </Tabs.Tab>
            <Tabs.Tab value="已批核" onClick={() => setStatus(Status.approved)}>
              批核結果
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        {!data?.pendingApplication.length && status === Status.pending && (
          <div className={styles.noApplicationContainer}>
            <h2>沒有未處理的申請</h2>
          </div>
        )}
        {status === Status.pending &&
          data?.pendingApplication.map((activityObj, idx) => (
            <>
              <ApplicationContainer activity={activityObj.activity} clickHandler={() => navigate(`/activity/detail?id=${activityObj.activity.activity_id}&status=approval`)} />
              <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e, activityObj.activity.activity_id)}>
                {/* <ActivitiesApprovalComponent member={activity.user_fullname!} clickHandler={() => navigate("/user/detail")} /> */}
                {activityObj.applicants.map((applicant) => (
                  <>
                    <div className={styles.memberName}>
                      會員：
                      <span className={styles.nameTab} onClick={() => navigate(`/user/detail?id=${applicant.user_id}`)}>
                        {applicant.fullname}
                      </span>
                    </div>
                    <div className={styles.approveContainer}>
                      <div className={styles.approveTab}>批核</div>
                      <Checkbox
                        checked={applicantApprovalArr.includes(`${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}-approved`)}
                        value={`${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}`}
                        className={styles.addressList}
                        onChange={() =>
                          setApplicantApprovalArr(
                            // applicantApprovalArr.includes(`${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}-rejected`) ||
                            applicantApprovalArr.includes(`${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}-approved`)
                              ? applicantApprovalArr.filter(
                                  (item) =>
                                    // item !== `${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}-rejected` &&
                                    item !== `${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}-approved`
                                )
                              : [
                                  ...applicantApprovalArr.filter(
                                    (item) =>
                                      // item !== `${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}-approved` &&
                                      item !== `${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}-rejected`
                                  ),
                                  `${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}-approved`,
                                ]
                          )
                        }
                      />
                      <div className={styles.approveTab}>不接納</div>
                      <Checkbox
                        value={`${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}`}
                        checked={applicantApprovalArr.includes(`${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}-rejected`)}
                        className={styles.addressList}
                        onChange={() =>
                          setApplicantApprovalArr(
                            // applicantApprovalArr.includes(`${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}-approved`) ||
                            applicantApprovalArr.includes(`${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}-rejected`)
                              ? applicantApprovalArr.filter(
                                  (item) =>
                                    // item !== `${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}-approved` &&
                                    item !== `${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}-rejected`
                                )
                              : [
                                  ...applicantApprovalArr.filter(
                                    (item) =>
                                      // item !== `${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}-approved` &&
                                      item !== `${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}-approved`
                                  ),
                                  `${applicant.fullname}-${applicant.user_id}-${activityObj.activity.activity_id}-rejected`,
                                ]
                          )
                        }
                      />
                    </div>
                  </>
                ))}
                <Button style={{ width: 130, height: 34, color: "black", fontSize: 14, marginLeft: 140, marginTop: 4, borderRadius: 10, marginBottom: 12 }} color="orange" type="submit">
                  確定
                </Button>
              </form>
              {idx !== data.pendingApplication.length - 1 && <hr className={styles.hr90vw} />}
            </>
          ))}
        {/* {status === Status.pending &&
          data?.pendingApplication.map((activity, idx) => (
            <>
              <ApplicationContainer activity={activity.activity} clickHandler={() => navigate(`/activity/detail?id=${activity.activity.activity_id}&status=approval`)} />

              {idx !== data.pendingApplication.length - 1 && <hr className={styles.hr90vw} />}
            </>
          ))} */}

        {!data?.approvedApplication.length && status===Status.approved&&(
          <div className={styles.noApplicationContainer}>
            <h2>暫未有已批核的申請</h2>
          </div>
        )}

        {status === Status.approved && data?.approvedApplication.map((activity, idx) => (
          <>
            <ApplicationContainer activity={activity} clickHandler={() => navigate(`/activity/detail?id=${activity.activity_id}&status=approval`)} status={"approved"}/>




            {idx !== data.approvedApplication.length - 1 && <hr className={styles.hr90vw} />}
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
