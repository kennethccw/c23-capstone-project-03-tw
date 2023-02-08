import { useNavigate } from "react-router-dom";
import styles from "../css/organisationMoreDetails.module.scss";
import detailStyles from "../css/activitiesDetails.module.scss";
import { HiChevronLeft, HiOutlineShare } from "react-icons/hi";
import { MantineProvider, Tabs, Button, LoadingOverlay, Modal } from "@mantine/core";
import { Calendar4, GeoAlt, Person, House, Telephone, Envelope } from "react-bootstrap-icons";
import { useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { District, getActivityDetail, putActivityApplication } from "../api/activityAPI";

export default function ActivitiesDetailPage() {
  const navigate = useNavigate();

  enum PageStatus {
    beforeApplication = "beforeApplication",
    pending = "pending",
    confirmed = "confirmed",
  }

  const params = new URLSearchParams(document.location.search);

  const pageStatusRef = useRef<string>(PageStatus.beforeApplication);
  if (params.get("status")) {
    pageStatusRef.current = params.get("status")!;
  }

  const getActivityDetailNoParam = async () => {
    const data = await getActivityDetail(params.get("id")!);
    return {
      data,
      startTime: new Date(data.start_time),
      startYear: new Date(data.start_time).getFullYear(),
      startMonth: new Date(data.start_time).getMonth() + 1,
      startDate: new Date(data.start_time).getDate(),
      startHr: new Date(data.start_time).getHours().toString().padStart(2, "0"),
      startMin: new Date(data.start_time).getMinutes().toString().padStart(2, "0"),
      startDay: new Date(data.start_time).getDay(),
      endTime: new Date(data.end_time),
      endYear: new Date(data.end_time).getFullYear(),
      endMonth: new Date(data.end_time).getMonth() + 1,
      endDate: new Date(data.end_time).getDate(),
      endHr: new Date(data.end_time).getHours().toString().padStart(2, "0"),
      endMin: new Date(data.end_time).getMinutes().toString().padStart(2, "0"),
      endDay: new Date(data.end_time).getDay(),
    };
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["activity/detail"],
    queryFn: getActivityDetailNoParam,
    // refetchInterval: 5_000,
    // staleTime: 10_000,
    // retry: 1,
  });

  const role = localStorage.getItem("role");

  console.log(params.get("pending"));
  const [opened, setOpened] = useState(false);

  const convertNumberToDay = (idx: number) => {
    const dayArr = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
    return dayArr[idx];
  };
  const convertEnumToDistrict = (district: District) => {
    const dayArr = { kowloon: "九龍", hong_kong_island: "香港島", new_territories: "新界" };
    return dayArr[district];
  };

  //   console.log(data);
  //   const [startTime, setStartTime] = useState<Date>();
  //   const [startYear, setStartYear] = useState<number>();
  //   const [startMonth, setStartMonth] = useState<number>();
  //   const [startDate, setStartDate] = useState<number>();
  //   const [startHr, setStartHr] = useState<string>();
  //   const [startMin, setStartMin] = useState<string>();
  //   const [startDay, setStartDay] = useState<number>();
  //   const [endTime, setEndTime] = useState<Date>();
  //   const [endYear, setEndYear] = useState<number>();
  //   const [endMonth, setEndMonth] = useState<number>();
  //   const [endDate, setEndDate] = useState<number>();
  //   const [endHr, setEndHr] = useState<string>();
  //   const [endMin, setEndMin] = useState<string>();
  //   const [endDay, setEndDay] = useState<number>();

  //   useEffect(() => {
  //     if (data) {
  //       setStartTime(new Date(data.start_time));
  //       setStartYear(startTime?.getFullYear());
  //       setStartMonth(startTime?.getMonth());
  //       setStartDate(startTime?.getDate());
  //       setStartHr(startTime?.getHours().toString().padStart(2, "0"));
  //       setStartMin(startTime?.getMinutes().toString().padStart(2, "0"));
  //       setStartDay(startTime?.getDay());
  //       setEndTime(new Date(data.end_time));
  //       setEndYear(endTime?.getFullYear());
  //       setEndMonth(endTime?.getMonth());
  //       setEndDate(endTime?.getDate());
  //       setEndHr(endTime?.getHours().toString().padStart(2, "0"));
  //       setEndMin(endTime?.getMinutes().toString().padStart(2, "0"));
  //       setEndDay(endTime?.getDay());
  //     }
  //   }, [data]);

  const [choice, setChoice] = useState("basicInfo");
  const click = (value: string) => {
    setChoice(value);
  };
  console.log(choice === "basicInfo");
  return (
    <MantineProvider
      theme={{
        colors: {
          ocean: ["#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5"],
          milkTea: ["#ECE7DD", "#ECE7DD", "#ECE7DD", "#ECE7DD", "#ECE7DD", "#ECE7DD", "#ECE7DD", "#ECE7DD", "#ECE7DD", "#ECE7DD"],
        },
      }}
    >
      <div className={styles.containerForAll}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />

        <div className={styles.upperPart}>
          <div className={styles.chevronAndAdjustmntIcon}>
            <HiChevronLeft
              className={styles.chevronIcon}
              onClick={() => {
                navigate(-1);
              }}
            />
            <HiOutlineShare className={styles.outlineShare} />
          </div>

          <Tabs defaultValue="基本資料" color="ocean" className={styles.tabList}>
            <Tabs.List className={detailStyles.choices}>
              <Tabs.Tab value="基本資料" onClick={() => click("basicInfo")}>
                基本資料
              </Tabs.Tab>
              <Tabs.Tab value="時間表" onClick={() => click("schedule")}>
                時間表
              </Tabs.Tab>
              <Tabs.Tab value="活動須知" onClick={() => click("badge")}>
                活動須知
              </Tabs.Tab>
              <Tabs.Tab value="查詢" onClick={() => click("enquiry")}>
                查詢
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </div>

        <div className={detailStyles.lowerPart}>
          {choice === "basicInfo" ? (
            <div className={detailStyles.basicInfo}>
              <div className={detailStyles.chanceInstances}>
                <div className={detailStyles.box}>
                  {/* <img src={`${process.env.REACT_APP_BACKEND_URL}/activities/${data?.data.image}`} className={detailStyles.chancePhoto}></img> */}
                  <img src={`${process.env.REACT_APP_S3_UPLOAD_BUCKET_URL}/activities/${data?.data.image}`} className={detailStyles.chancePhoto}></img>
                </div>
                <div className={detailStyles.organisationName}>{data?.data.organisation}</div>
                <div className={detailStyles.taskName}>{data?.data.activity}</div>
                <div className={detailStyles.address}>
                  <GeoAlt />
                  &nbsp;&nbsp; {convertEnumToDistrict(data?.data.district!)}
                </div>
                <div className={detailStyles.dateDetail}>
                  <Calendar4 />
                  &nbsp;&nbsp;&nbsp;<span>{data?.startYear}</span>年<span>{data?.startMonth}</span>月<span>{data?.startDate}</span>日&nbsp;&nbsp;（{convertNumberToDay(data?.startDay!)}）
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          {choice === "schedule" ? (
            <div className={detailStyles.schedule}>
              <div className={detailStyles.scheduleWord}></div>
              <div className={detailStyles.serviceButton}>義工服務</div>
              <div>
                <div className={detailStyles.sameDetail}>此環節必須出席全部時段</div>
                <div className={detailStyles.where}>{convertEnumToDistrict(data?.data.district!)}</div>
                <div className={detailStyles.sameDetail}>
                  <GeoAlt className={detailStyles.scheduleIcon} /> &nbsp;{data?.data.location}
                </div>
                <div className={detailStyles.sameDetail}>
                  <Calendar4 className={detailStyles.scheduleIcon} /> &nbsp;<span>{data?.startYear}</span>年<span>{data?.startMonth}</span>月<span>{data?.startDate}</span>日（
                  <span>{convertNumberToDay(data?.startDay!)}</span>）
                  <span>
                    {data?.startHr}:{data?.startMin}-{data?.endHr}:{data?.endMin}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          {choice === "badge" ? (
            <div className={detailStyles.badge}>
              <div className={detailStyles.badgeWordTitle}>活動簡介</div>
              <p className={detailStyles.badgeWordDetail}>{data?.data.description}</p>
              <div className={detailStyles.badgeWordTitle}>參加者要求</div>
              <p className={detailStyles.badgeWordDetail}>{data?.data.requirement}</p>
            </div>
          ) : (
            <div></div>
          )}

          {choice === "enquiry" ? (
            <div className={detailStyles.enquiry}>
              <div className={detailStyles.enquiryWord}>
                <House className={detailStyles.enquiryIcon} />
                &nbsp;<span>{data?.data.organisation}</span>
              </div>
              <div className={detailStyles.enquiryWord}>
                <Telephone className={detailStyles.enquiryIcon} />
                &nbsp;<span>{data?.data.mobile}</span>
              </div>
              <div className={detailStyles.enquiryWord}>
                <Envelope className={detailStyles.enquiryIcon} />
                &nbsp;<span>{data?.data.email}</span>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className={detailStyles.joinPart}>
          <div className={detailStyles.left}>
            <div className={detailStyles.personIcon}>
              <Person />
            </div>
            <div className={detailStyles.countPart}>
              <div>
                剩餘名額<span>{data?.data.remaining_place}</span>
              </div>
              <div>
                (<span>{data?.data.total_place}</span>個名額)
              </div>
            </div>
          </div>
          <div className={detailStyles.right}>
            {pageStatusRef.current === PageStatus.beforeApplication && role !== "organisation" && (
              <Button disabled={!data?.data.remaining_place} color="pink" className={detailStyles.joinButton} onClick={() => navigate(`/activity/application?id=${params.get("id")!}`)}>
                <div>參加</div>
              </Button>
            )}
            {params.get("status") === PageStatus.pending && (
              <Button color="pink" className={detailStyles.joinButton} onClick={() => setOpened(true)}>
                <div>取消報名</div>
              </Button>
            )}
            {params.get("status") === PageStatus.confirmed && (
              <Button disabled color="pink" className={detailStyles.joinButton}>
                <div>取消報名</div>
              </Button>
            )}
            <Modal radius="lg" size="80%" centered overlayOpacity={0.55} overlayBlur={3} opened={opened} onClose={() => setOpened(false)} className={detailStyles.modalConfirmCancelModal}>
              <div className={detailStyles.modalConfirmCancelContainer}>
                <h2 className={detailStyles.modalConfirmCancelTitle}>確定取消報名？</h2>
                <Button
                  color="pink"
                  className={detailStyles.joinButton}
                  onClick={async () => {
                    const res = await putActivityApplication(params.get("id")!);
                    const result = await res.json();
                    if (res.status === 200) {
                      navigate("/application/cancellation");
                    } else {
                      alert(result.message);
                    }
                  }}
                >
                  <div>確定</div>
                </Button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}
