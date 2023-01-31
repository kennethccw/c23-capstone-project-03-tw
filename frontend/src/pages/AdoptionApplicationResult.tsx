import { Badge, MantineProvider, Paper, Tabs } from "@mantine/core";
import styles from "../css/adoptionApplicationResult.module.scss";
import { HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import AdoptionApplicationComponent from "../components/AdoptionResultComponents";
import { useQuery } from "react-query";
import { getPetAdoptionResult } from "../api/adoptionAPI";
import { useState } from "react";
import NewNavbar from "../components/NewNavbar";

export default function AdoptionApplicationResult() {
  const navigate = useNavigate();
  enum ChosenBtn {
    pending = "pending",
    handled = "handled",
  }

  const getPetAdoptionResultCategorised = async () => {
    const result = await getPetAdoptionResult();
    const pendingResult = result.filter((result) => result.status === "pending");
    const handledResult = result.filter((result) => result.status !== "pending");
    return { pendingResult, handledResult };
  };

  const { isError, error, data, isLoading } = useQuery({
    queryKey: ["adoption/result"],
    queryFn: getPetAdoptionResultCategorised,
    refetchInterval: 5_000,
    // staleTime: 10_000,
    retry: 1,
  });

  const [chosenBtn, setChosenBtn] = useState<ChosenBtn>(ChosenBtn.pending);

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
          <h1>申請領養記錄</h1>
        </div>
        <Tabs className={styles.scheduleTabContainer} color="petscue-purple" defaultValue="處理中">
          <Tabs.List grow>
            <Tabs.Tab
              onClick={() => setChosenBtn(ChosenBtn.pending)}
              value="處理中"
              rightSection={
                !!data?.pendingResult?.length && (
                  <Badge sx={{ width: 20, height: 20, pointerEvents: "none" }} color="petscue-purple" variant="filled" size="xs" p={0}>
                    {data?.pendingResult.length}
                  </Badge>
                )
              }
            >
              處理中
            </Tabs.Tab>
            <Tabs.Tab
              onClick={() => setChosenBtn(ChosenBtn.handled)}
              rightSection={
                !!data?.handledResult?.length && (
                  <Badge sx={{ width: 20, height: 20, pointerEvents: "none" }} color="petscue-purple" variant="filled" size="xs" p={0}>
                    {data?.handledResult.length}
                  </Badge>
                )
              }
              value="已確認"
            >
              已確認
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {/* NO APPLICATION COMPONENT */}

        {/* <div className={styles.noApplicationsAppliedContainer}>
          <h3 className={styles.noApplicationsAppliedHeader}>你暫時沒有已確認或處理中的申請</h3>
        </div> */}

        {/* NO APPLICATION COMPONENT */}

        {/* APPLICATION COMPONENT (NOT APPROVED)*/}

        {chosenBtn === ChosenBtn.pending &&
          data?.pendingResult?.map((result) => (
            <AdoptionApplicationComponent key={result.application_id} result={result} clickHandler={() => navigate(`/adoption/detail?id=${result.pet_id}&status=${result.status}`)} />
          ))}
        {chosenBtn === ChosenBtn.pending && data?.pendingResult?.length === 0 && (
          <div className={styles.noApplicationsAppliedContainer}>
            <h3 className={styles.noApplicationsAppliedHeader}>你暫時沒有處理中的申請</h3>
          </div>
        )}

        {chosenBtn === ChosenBtn.handled &&
          data?.handledResult?.map((result) => (
            <AdoptionApplicationComponent key={result.application_id} result={result} clickHandler={() => navigate(`/adoption/detail?id=${result.pet_id}&status=${result.status}`)} />
          ))}
        {chosenBtn === ChosenBtn.handled && data?.handledResult?.length === 0 && (
          <div className={styles.noApplicationsAppliedContainer}>
            <h3 className={styles.noApplicationsAppliedHeader}>你暫時沒有已確認的申請</h3>
          </div>
        )}

        {/* <div className={styles.petPaperBigContainer}>
          <Paper shadow="xl" radius="xl" p="xl" className={styles.paperContainer}>
            <img className={styles.petImg} src="/photos/pet/pet-sleepy.png" alt="" />
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
                <div className={styles.petContentText}>其他原因 - 主人曾經虐待動物</div>
              </div>
            </div>
          </Paper>
        </div> */}

        {/* APPLICATION COMPONENT (NOT APPROVED)*/}

        {/* APPLICATION COMPONENT (APPROVED) */}

        {/* <div className={styles.petPaperBigContainer}>
          <Paper shadow="xl" radius="xl" p="xl" className={styles.paperContainer}>
            <img className={styles.petImg} src="/photos/pet/pet-sleepy.png" alt="" />
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
        </div> */}
        {/* APPLICATION COMPONENT (APPROVED) */}

        {/* APPLICATION COMPONENT (NOT HANDLED) */}

        {/* <div className={styles.petPaperBigContainer}>
          <Paper shadow="xl" radius="xl" p="xl" className={styles.paperContainer}>
            <img className={styles.petImg} src="/photos/pet/pet-sleepy.png" alt="" />
            <div className={styles.petDetailContainer}>
              <div className={styles.petLabelContentContainer}>
                <div className={styles.petLabelText}>動物名稱：</div>
                <div className={styles.petContentText}>東東</div>
              </div>
              <div className={styles.petLabelContentContainer}>
                <div className={styles.petLabelText}>申請結果：</div>
                <div className={styles.petContentText}>處理中</div>
              </div>
            </div>
          </Paper>
        </div> */}

        {/* APPLICATION COMPONENT (NOT HANDLED) */}
      </div>
      <NewNavbar activeBtn="user" />
    </MantineProvider>
  );
}
