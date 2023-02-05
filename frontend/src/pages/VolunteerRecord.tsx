import { MantineProvider, Timeline } from "@mantine/core";
import styles from "../css/volunteerRecord.module.scss";
import { HiXMark } from "react-icons/hi2";
import NewNavbar from "../components/NewNavbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getVolunteerHistory } from "../api/volunteerRecordAPI";
import VolunteerRecordComponent from "../components/VolunteerRecordComponent";
export default function VolunteerRecord() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getVolunteerHistoryObj = async () => {
    const result = await getVolunteerHistory();
    const activityArr = result.map((data) => {
      return {
        activity_date: `${new Date(data.activity_date).getFullYear()}-${(new Date(data.activity_date).getMonth() + 1).toString().padStart(2, "0")}-${new Date(data.activity_date)
          .getDate()
          .toString()
          .padStart(2, "0")}`,
        activity_name: data.activity_name,
      };
    });
    let totalVolunteerHours = 0;
    for (const data of result) {
      console.log(new Date(data.activity_end_time).valueOf());
      totalVolunteerHours += (new Date(data.activity_end_time).valueOf() - new Date(data.activity_start_time).valueOf()) / 3_600_000;
      console.log(totalVolunteerHours);
    }

    const onBoardDate = `${new Date(result[0].on_board_date).getFullYear()}-${(new Date(result[0].on_board_date).getMonth() + 1).toString().padStart(2, "0")}-${new Date(result[0].on_board_date)
      .getDate()
      .toString()
      .padStart(2, "0")}`;

    return { onBoardDate, activityArr, totalVolunteerHours };
  };

  const { data, isLoading, error, isError } = useQuery({ queryKey: ["volunteer/record"], queryFn: getVolunteerHistoryObj, retry: 1, refetchInterval: 5_000 });
  console.log(data);
  return (
    <MantineProvider
      inherit
      theme={{
        colors: {
          "ocean-blue": ["#7AD1DD", "#5FCCDB", "#44CADC", "#2AC9DE", "#1AC2D9", "#11B7CD", "#09ADC3", "#0E99AC", "#128797", "#147885"],
          "bright-pink": ["#F0BBDD", "#ED9BCF", "#EC7CC3", "#ED5DB8", "#F13EAF", "#F71FA7", "#FF00A1", "#E00890", "#C50E82", "#AD1374"],
          "petscue-purple": ["#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5"],
        },
        components: {
          InputWrapper: {
            styles: () => ({
              label: {
                fontSize: 14,
              },
            }),
          },

          Select: {
            styles: (theme) => ({
              item: {
                // applies styles to selected item
                "&[data-selected]": {
                  "&, &:hover": {
                    backgroundColor: theme.colors["petscue-purple"],
                    color: theme.white,
                  },
                },

                // applies styles to hovered item (with mouse or keyboard)
                "&[data-hovered]": {},
              },
            }),
          },

          Input: {
            styles: () => ({
              input: { height: 48 },
            }),
          },

          Checkbox: {
            styles: () => ({
              label: { marginTop: -8 },
            }),
          },
        },
      }}
    >
      <div className={styles.containerForAll}>
        <div className={styles.headerContainer}>
          <div>
            <div className={styles.header}>
              <HiXMark className={styles.closingIcon} onClick={() => navigate(-1)} />
              <span>社職紀錄</span>
            </div>
            <hr className={styles.headerHr} />
          </div>
        </div>

        <div className={styles.forFlex100vw}>
          <div className={styles.forFlexColumn312px}>
            <div className={styles.volunteerHourValue}>{data?.totalVolunteerHours.toFixed(1)}</div>
            <div className={styles.volunteerHourTitle}>義工時數</div>
          </div>
        </div>
        <hr className={styles.headerHr90vw} />
        <div className={styles.timelineContainer}>
          <Timeline className={styles.forFlexColumn100vw} color="petscue-purple" active={3}>
            <Timeline.Item className={styles.timeLineItem} title="加入Petscue">
              <div className={styles.timeLineDate}>
                <span className={styles.timeLineYear}>{data?.onBoardDate.split("-")[0]}</span>-{data?.onBoardDate.split("-")[1]}-{data?.onBoardDate.split("-")[2]}
              </div>
            </Timeline.Item>
            {data?.activityArr.map((activity, idx) => (
              <>
                <Timeline.Item key={`container-${idx}`} className={styles.timeLineItem} title={activity.activity_name}>
                  <VolunteerRecordComponent key={`activity-${idx}`} activity_date={activity.activity_date} />
                </Timeline.Item>
              </>
            ))}
            {/* <div className={styles.timeLineDate}>
              <span className={styles.timeLineYear}>2022</span>-03-19
            </div> */}
            {/* <Timeline.Item className={styles.timeLineItem} title="參加寵物美容義工">
              <div className={styles.timeLineDate}>
                <span className={styles.timeLineYear}>2022</span>-03-19
              </div>
            </Timeline.Item>
            <Timeline.Item className={styles.timeLineItem} title="參加寵物美容義工">
              <div className={styles.timeLineDate}>
                <span className={styles.timeLineYear}>2022</span>-03-19
              </div>
            </Timeline.Item>
            <Timeline.Item className={styles.timeLineItem} title="參加寵物美容義工">
              <div className={styles.timeLineDate}>
                <span className={styles.timeLineYear}>2022</span>-03-19
              </div>
            </Timeline.Item>
            <Timeline.Item className={styles.timeLineItem} title="參加寵物美容義工">
              <div className={styles.timeLineDate}>
                <span className={styles.timeLineYear}>2022</span>-03-19
              </div>
            </Timeline.Item> */}
          </Timeline>
        </div>
        <NewNavbar activeBtn="user" />
      </div>
    </MantineProvider>
  );
}
