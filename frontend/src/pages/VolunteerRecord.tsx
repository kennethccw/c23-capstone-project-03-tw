import { MantineProvider, Timeline } from "@mantine/core";
import styles from "../css/volunteerRecord.module.scss";
import { HiXMark } from "react-icons/hi2";
import NewNavbar from "../components/NewNavbar";
import { useNavigate } from "react-router-dom";
export default function VolunteerRecord() {
  const navigate = useNavigate();
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
        <div className={styles.header}>
          <HiXMark className={styles.closingIcon} onClick={() => navigate(-1)} />
          <span>社職紀錄</span>
        </div>
        <hr className={styles.headerHr} />

        <div className={styles.forFlex100vw}>
          <div className={styles.forFlexColumn312px}>
            <div className={styles.volunteerHourValue}>0.0</div>
            <div className={styles.volunteerHourTitle}>義工時數</div>
          </div>
        </div>
        <hr className={styles.headerHr90vw} />
        <Timeline className={styles.forFlexColumn100vw} color="petscue-purple" active={3}>
          <Timeline.Item className={styles.timeLineItem} title="加入Petscue">
            <div className={styles.timeLineDate}>
              <span className={styles.timeLineYear}>2022</span>-01-19
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
        </Timeline>
        <NewNavbar activeBtn="user" />
      </div>
    </MantineProvider>
  );
}
