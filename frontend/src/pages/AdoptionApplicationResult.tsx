import { Badge, Button, MantineProvider, Paper, Tabs } from "@mantine/core";
import styles from "../css/adoptionApplicationResult.module.scss";
import { HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdoptionApplicationResult() {
  const navigate = useNavigate();
  // enum ChosenResult {
  //   BASICINFO = "basicInfo",
  //   TIMETABLE = "timeTable",
  //   BADGE = "badge",
  //   CONTACT = "contact",
  // }

  // const [chosenResult, setChosenResult] = useState<ChosenResult>(ChosenResult.BASICINFO);

  // console.log(chosenResult);
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
      {/* <button
        onClick={() => {
          setChosenResult(ChosenResult.BASICINFO);
        }}
      >
        basic info
      </button>
      <button
        onClick={() => {
          setChosenResult(ChosenResult.TIMETABLE);
        }}
      >
        time table
      </button>
      <button
        onClick={() => {
          setChosenResult(ChosenResult.BADGE);
        }}
      >
        badge
      </button>
      <button
        onClick={() => {
          setChosenResult(ChosenResult.CONTACT);
        }}
      >
        contact
      </button> */}

      <div className={styles.containerForAll}>
        <div className={styles.header}>
          <HiXMark className={styles.closingIcon} onClick={() => navigate(-1)} />
          <span>申請領養記錄</span>
        </div>
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

        {/* <div className={styles.noApplicationsAppliedContainer}>
          <h3 className={styles.noApplicationsAppliedHeader}>你暫時沒有已確認或處理中的申請</h3>
        </div> */}

        {/* NO APPLICATION COMPONENT */}

        {/* APPLICATION COMPONENT (NOT APPROVED)*/}

        <div className={styles.petPaperBigContainer}>
          <Paper shadow="xl" radius="xl" p="xl" className={styles.paperContainer}>
            <img className={styles.petImg} src="photos/pet/pet-sleepy.png" alt="" />
            <div className={styles.petDetailContainer}>
              <div className={styles.petLabelContainer}>
                <div className={styles.petLabelText}>動物名稱：</div>
                <div className={styles.petLabelText}>申請領養結果：</div>
                <div className={styles.petLabelText}>不通過原因：</div>
              </div>
              <div className={styles.petContentContainer}>
                <div className={styles.petContentText}>東東</div>
                <div className={styles.petContentText}>不通過</div>
                <div className={styles.petContentText}>
                  其他原因：{" "}
                  {/* </div>
                <div> */}
                  (主人曾經虐待動物)
                </div>
              </div>
            </div>
          </Paper>
        </div>

        {/* APPLICATION COMPONENT (NOT APPROVED)*/}

        {/* APPLICATION COMPONENT (APPROVED) */}

        <div className={styles.petPaperBigContainer}>
          <Paper shadow="xl" radius="xl" p="xl" className={styles.paperContainer}>
            <img className={styles.petImg} src="photos/pet/pet-sleepy.png" alt="" />
            <div className={styles.petDetailContainer}>
              <div className={styles.petLabelContainer}>
                <div className={styles.petLabelText}>動物名稱：</div>
                <div className={styles.petLabelText}>申請領養結果：</div>
              </div>
              <div className={styles.petContentContainer}>
                <div className={styles.petContentText}>東東</div>
                <div className={styles.petContentText}>通過</div>
              </div>
            </div>
          </Paper>
        </div>
        {/* APPLICATION COMPONENT (APPROVED) */}

        {/* APPLICATION COMPONENT (NOT HANDLED) */}

        <div className={styles.petPaperBigContainer}>
          <Paper shadow="xl" radius="xl" p="xl" className={styles.paperContainer}>
            <img className={styles.petImg} src="photos/pet/pet-sleepy.png" alt="" />
            <div className={styles.petDetailContainer}>
              <div className={styles.petLabelContainer}>
                <div className={styles.petLabelText}>動物名稱：</div>
                <div className={styles.petLabelText}>申請領養結果：</div>
              </div>
              <div className={styles.petContentContainer}>
                <div className={styles.petContentText}>東東</div>
                <div className={styles.petContentText}>處理中</div>
              </div>
            </div>
          </Paper>
        </div>

        {/* APPLICATION COMPONENT (NOT HANDLED) */}
      </div>
    </MantineProvider>
  );
}
