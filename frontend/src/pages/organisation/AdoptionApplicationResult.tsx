import { Badge, Button, Input, MantineProvider, Paper, Select, Tabs } from "@mantine/core";
import styles from "../../css/organisation/adoptionApplicationResult.module.scss";
import { HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons";

export default function OrganisationAdoptionApplicationResult() {
  const navigate = useNavigate();
  enum RejectedReason {
    NOT_AVALIABLE = "不適用",
    UNDER_21 = "未滿二十一歲",
    NO_WINDOW_SCREEN = "沒有裝窗網",
    OTHER_REASON = "其他原因",
  }

  const [rejectedReason, setRejectedReason] = useState(RejectedReason.NOT_AVALIABLE as string);
  console.log(rejectedReason);
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
              input: { height: 40 },
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
          <HiXMark className={styles.closingIcon} />
          <span>申請領養</span>
        </div>
        <Tabs className={styles.scheduleTabContainer} color="petscue-purple">
          <Tabs.List grow>
            <Tabs.Tab
              rightSection={
                <Badge sx={{ width: 16, height: 16, pointerEvents: "none" }} color="petscue-purple" variant="filled" size="xs" p={0}>
                  6
                </Badge>
              }
              value="結果"
            >
              結果
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
          <h3 className={styles.noApplicationsAppliedHeader}>暫時沒有批核結果或處理中的申請</h3>
        </div> */}

        {/* NO APPLICATION COMPONENT */}

        {/* APPLICATION COMPONENT (NOT APPROVED)*/}

        <div className={styles.petPaperBigContainer}>
          <Paper shadow="xl" radius="xl" p="xl" className={styles.paperContainer}>
            <img className={styles.petImg} src="photos/pet/pet-sleepy.png" alt="" />
            <div className={styles.petDetailContainer}>
              <div className={styles.petLabelContentContainer}>
                <div className={styles.petLabelText}>動物名稱：</div>
                <div className={styles.petContentText}>東東</div>
              </div>
              <div className={styles.petLabelContentContainer}>
                <div className={styles.petLabelText}>不通過原因：</div>
              </div>
              <div className={styles.petContentContainer}></div>
            </div>
            <form>
              <Select
                onChange={(value: string) => setRejectedReason(value)}
                radius="md"
                size="md"
                className={styles.rejectedReasonOption}
                color="petscue-purple"
                // label="性別"
                placeholder="不適用"
                rightSection={<IconChevronDown size={14} />}
                rightSectionWidth={30}
                styles={{ rightSection: { pointerEvents: "none" } }}
                data={[
                  { value: "不適用", label: "不適用" },
                  { value: "未滿二十一歲", label: "未滿二十一歲" },
                  { value: "沒有裝窗網", label: "沒有裝窗網" },
                  { value: "其他原因", label: "其他原因" },
                ]}
              />

              {rejectedReason === "其他原因" && (
                <Input.Wrapper className={styles.otherReasonContainer}>
                  <span className={styles.inputLabelText}>其他原因：</span>
                  <Input className={styles.otherReasonInputBox} radius="md" size="md"></Input>
                </Input.Wrapper>
              )}
              <div className={styles.bottomContainer}>
                <div>領養申請通過？</div>
                <div className={styles.buttonContainer}>
                  <Button
                    className={styles.approvedButton}
                    color="violet"
                    radius="xl"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    通過
                  </Button>
                  <Button
                    className={styles.notApprovedButton}
                    color="violet"
                    radius="xl"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    不通過
                  </Button>
                </div>
              </div>
            </form>
          </Paper>
        </div>

        {/* APPLICATION COMPONENT (NOT APPROVED)*/}

        {/* APPLICATION COMPONENT (APPROVED) */}

        <div className={styles.petPaperBigContainer}>
          <Paper shadow="xl" radius="xl" p="xl" className={styles.paperContainer}>
            <img className={styles.petImg} src="photos/pet/pet-sleepy.png" alt="" />
            <div className={styles.petDetailContainer}>
              <div className={styles.petLabelContentContainer}>
                <div className={styles.petLabelText}>動物名稱：</div>
                <div className={styles.petContentText}>東東</div>
              </div>
              <div className={styles.petLabelContentContainer}>
                <div className={styles.petLabelText}>申請結果：</div>
                <div className={styles.petContentText}>通過</div>
              </div>
            </div>
          </Paper>
        </div>
        {/* APPLICATION COMPONENT (APPROVED) */}

        {/* APPLICATION COMPONENT (NOT APPROVED OTHER REASON) */}

        <div className={styles.petPaperBigContainer}>
          <Paper shadow="xl" radius="xl" p="xl" className={styles.paperContainer}>
            <img className={styles.petImg} src="photos/pet/pet-sleepy.png" alt="" />
            <div className={styles.petDetailContainer}>
              <div className={styles.petLabelContentContainer}>
                <div className={styles.petLabelText}>動物名稱：</div>
                <div className={styles.petContentText}>東東</div>
              </div>
              <div className={styles.petLabelContentContainer}>
                <div className={styles.petLabelText}>申請結果：</div>
                <div className={styles.petContentText}>不通過</div>
              </div>
              <div className={styles.petLabelContentContainer}>
                <div className={styles.petLabelText}>不通過原因：</div>
                <div className={styles.petContentText}>其他原因</div>
              </div>
              <div className={styles.petLabelContentContainer}>
                <div className={styles.petLabelText}>其他原因：</div>
                <div className={styles.petContentText}>主人曾經虐待動物</div>
              </div>
            </div>
          </Paper>
        </div>

        {/* APPLICATION COMPONENT (NOT APPROVED OTHER REASON) */}
        {/* APPLICATION COMPONENT (NOT APPROVED) */}

        <div className={styles.petPaperBigContainer}>
          <Paper shadow="xl" radius="xl" p="xl" className={styles.paperContainer}>
            <img className={styles.petImg} src="photos/pet/pet-sleepy.png" alt="" />
            <div className={styles.petDetailContainer}>
              <div className={styles.petLabelContentContainer}>
                <div className={styles.petLabelText}>動物名稱：</div>
                <div className={styles.petContentText}>東東</div>
              </div>
              <div className={styles.petLabelContentContainer}>
                <div className={styles.petLabelText}>申請結果：</div>
                <div className={styles.petContentText}>不通過</div>
              </div>
              <div className={styles.petLabelContentContainer}>
                <div className={styles.petLabelText}>不通過原因：</div>
                <div className={styles.petContentText}>未滿二十一歲</div>
              </div>
            </div>
          </Paper>
        </div>

        {/* APPLICATION COMPONENT (NOT APPROVED) */}
      </div>
    </MantineProvider>
  );
}
