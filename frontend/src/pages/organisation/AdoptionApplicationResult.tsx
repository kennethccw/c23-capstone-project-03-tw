import { Badge, Button, Input, LoadingOverlay, MantineProvider, Paper, Select, Tabs } from "@mantine/core";
import styles from "../../css/organisation/adoptionApplicationResult.module.scss";
import { HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons";
import { OrganisationAdoptionApplicationPending } from "../../components/OrganisationAdoptionApplicationPending";
import { useQuery } from "react-query";
import { fetchJson } from "../../api/utilsAPI";
import { AdoptionApplication, AdoptionResult, getPetAdoptionResult, getPetAdoptionResultByOrganisation } from "../../api/adoptionAPI";
import AdoptionApplicationComponent from "../../components/AdoptionResultComponents";
import { resourceLimits } from "worker_threads";




export default function OrganisationAdoptionApplicationResult() {
  const navigate = useNavigate();
  // enum RejectedReason {
  //   NOT_AVALIABLE = "不適用",
  //   UNDER_21 = "未滿二十一歲",
  //   NO_WINDOW_SCREEN = "沒有裝窗網",
  //   OTHER_REASON = "其他原因",
  // }

  enum ChosenBtn {
    pending = "pending",
    handled = "handled",
  }
const organisationID=localStorage.getItem("userId")
  // const [rejectedReason, setRejectedReason] = useState(RejectedReason.NOT_AVALIABLE as string);

  // const [otherReason, setOtherReason]=useState<string>("")
  const organsationID: string | null = localStorage.getItem("userId")
  const [adoptionApplicationPendingCase, setAdoptionApplicationPendingCase]=useState<AdoptionResult[]>([])

  const[isDealing, setIsDealing]=useState<boolean>(false)
  const [chosenBtn, setChosenBtn] = useState<ChosenBtn>(ChosenBtn.pending);
  // const [chosenResult, setChosenResult] = useState<ChosenResult>(ChosenResult.BASICINFO);

  // console.log(chosenResult);
  console.log('current application=========',adoptionApplicationPendingCase )











////////////////////////////// fetch handled application //////////////////////////////////////////////////////

const getPetAdoptionResultCategorised = async () => {
  const result = await getPetAdoptionResultByOrganisation(parseInt(organisationID!));
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


console.log("pending amount:  ",data?.pendingResult.length, ":",data?.pendingResult )
console.log("handled amount:  ",data?.handledResult.length, ":",data?.handledResult )






///////////////////////////////////////////////////////

  return (
    <>
    <LoadingOverlay visible={isLoading} overlayBlur={2} />
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
          <HiXMark className={styles.closingIcon} onClick={()=>{ navigate(-1)}}/>
          <span>申請領養</span>
        </div>
        <Tabs className={styles.scheduleTabContainer} color="petscue-purple">
          <Tabs.List grow>
            <Tabs.Tab
              rightSection={
                <Badge sx={{ width: 16, height: 16, pointerEvents: "none" }} color="petscue-purple" variant="filled" size="xs" p={0}>
                  {data?.handledResult.length}
                </Badge>
              }
              value="結果" onClick={()=>setChosenBtn(ChosenBtn.handled)}
            >
              結果
            </Tabs.Tab>

            <Tabs.Tab
              value="處理中"
              rightSection={
                <Badge sx={{ width: 16, height: 16, pointerEvents: "none" }} color="petscue-purple" variant="filled" size="xs" p={0}>
                  {data?.pendingResult.length}
                </Badge>
              } onClick={()=>setChosenBtn(ChosenBtn.pending)}
            >
              處理中
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>


{/* .................................................................................................................. */}
        {/* NO APPLICATION COMPONENT */}

        {/* <div className={styles.noApplicationsAppliedContainer}>
          <h3 className={styles.noApplicationsAppliedHeader}>暫時沒有批核結果或處理中的申請</h3>
        </div> */}

        {/* NO APPLICATION COMPONENT */}

        {/* APPLICATION COMPONENT (PENDING)*/}

        {/* <div className={styles.petPaperBigContainer}>
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
                  <Input  className={styles.otherReasonInputBox} radius="md" size="md" ></Input>
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
        </div> */}

        {/* APPLICATION COMPONENT (PENDING)*/}

        {/* APPLICATION COMPONENT (APPROVED) */}

        {/* <div className={styles.petPaperBigContainer}>
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
        </div> */}
        {/* APPLICATION COMPONENT (APPROVED) */}

        {/* APPLICATION COMPONENT (REJECTED WITH OTHER REASON) */}

        {/* <div className={styles.petPaperBigContainer}>
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
        </div> */}

        {/* APPLICATION COMPONENT (REJECTED WITH OTHER REASON) */}
        {/* APPLICATION COMPONENT (REJECTED) */}

        {/* <div className={styles.petPaperBigContainer}>
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
        </div> */}

        {/* APPLICATION COMPONENT (REJECTED OR OTHER REASON) */}

         
        
        {chosenBtn === ChosenBtn.pending &&
          data?.pendingResult?.map((result) => (
            <OrganisationAdoptionApplicationPending key={result.application_id} result={result} clickHandler={() => navigate(`/adoption/detail?id=${result.pet_id}&status=${result.status}`)} image={result.image} applicantName={result.applicant_name} />
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



          
          {/* {chosenBtn===ChosenBtn.pending && adoptionApplicationPendingCase.map((eachCase)=> <OrganisationAdoptionApplicationPending key={`@@application${eachCase.id}`} image={eachCase.image} applicantName={eachCase.name} animalName={eachCase.pet_name} application={eachCase}  />
          )} */}
          
          {/* {status===ChosenBtn.handled && <AdoptionApplicationComponent/>} */}
    
      </div>



    </MantineProvider>
    </>
  );
}
