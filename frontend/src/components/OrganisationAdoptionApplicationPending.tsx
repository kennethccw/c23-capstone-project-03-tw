import styles from "../css/organisation/adoptionApplicationResult.module.scss";
import { Badge, Button, Input, MantineProvider, Paper, Select, Tabs } from "@mantine/core";
import { HiXMark } from "react-icons/hi2";
import { IconChevronDown } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AdoptionApplication,
  AdoptionResult,
  approvalOfAdoption,
  rejectOfAdoption,
  //  approvalOfAdoption
} from "../api/adoptionAPI";

type OrganisationAdoptionApplicationPendingProps = {
  image?: string;
  applicantName?: string;
  animalName?: string;
  trackRejected?: () => void;
  rejectedReason?: string;
  result?: AdoptionResult;
  clickHandler?: () => void;
};

export function OrganisationAdoptionApplicationPending(props: OrganisationAdoptionApplicationPendingProps) {
  const navigate = useNavigate();
  enum RejectedReason {
    NOT_AVALIABLE = "不適用",
    UNDER_21 = "未滿二十一歲",
    NO_WINDOW_SCREEN = "沒有裝窗網",
    OTHER_REASON = "其他原因",
  }
  let [rejectedReason, setRejectedReason] = useState(RejectedReason.NOT_AVALIABLE as string);
  const [otherReason, setOtherReason] = useState<string>("");

  console.log(rejectedReason);
  console.log(otherReason);
  // console.log(props.result?.name)

  ////////////////////////////////////////////////// form submission part  ////////////////////////////////////////////////
  const handleSubmitPassForm = async () => {
    if (rejectedReason === RejectedReason.OTHER_REASON || rejectedReason === RejectedReason.NO_WINDOW_SCREEN || rejectedReason === RejectedReason.UNDER_21) {
      alert("輸入錯誤");
      console.log("application ID: ", props.result?.application_id);
      console.log("petID:", props.result?.pet_id);
      return;
    } else {
      console.log("application ID: ", props.result?.application_id);
      console.log("petID:", props.result?.pet_id);
      const resp = await approvalOfAdoption(props.result?.application_id!, props.result?.pet_id!);
      const data = await resp.json();
      console.log(data);
      if (resp.status === 200) {
        alert("已批准申請及拒絕其他人對此的申請");
      } else {
        alert(data.message);
      }
    }
  };

  const handleSubmitRejectForm = async () => {
    if (rejectedReason === RejectedReason.NOT_AVALIABLE) {
      console.log("application ID: ", props.result?.application_id);
      console.log("petID:", props.result?.pet_id);
      alert("輸入錯誤");
    } else if (rejectedReason === "其他原因" && otherReason === "") {
      alert("請輸入其他原因");
      console.log("application ID: ", props.result?.application_id);
      console.log("petID:", props.result?.pet_id);
    } else {
      if (rejectedReason === RejectedReason.NO_WINDOW_SCREEN) {
        rejectedReason = "no_window_screen";
      }
      if (rejectedReason === RejectedReason.UNDER_21) {
        rejectedReason = "age_under_21";
      }
      if (rejectedReason === RejectedReason.OTHER_REASON) {
        rejectedReason = "other";
      }

      console.log("application ID: ", props.result?.application_id);
      console.log("petID:", props.result?.pet_id);
      console.log("rejectedReason:", rejectedReason, "otherReason:", otherReason);
      const resp = await rejectOfAdoption(props.result?.application_id!, rejectedReason!, otherReason!);
      const data = await resp.json();
      console.log(data);
      if (resp.status === 200) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className={styles.petPaperBigContainer}>
        <Paper shadow="xl" radius="xl" p="xl" className={styles.paperContainer}>
          <img className={styles.petImg} src={`${process.env.REACT_APP_S3_UPLOAD_BUCKET_URL}/pet/${props.image}`} alt="" onClick={props.clickHandler} />
          <div className={styles.petDetailContainer}>
            <div className={styles.petLabelContentContainer}>
              <div className={styles.petLabelText}>動物名稱：</div>
              <div className={styles.petContentText}>{props.result?.name}</div>
              <div className={styles.petLabelText}>申請人：</div>
              <div className={styles.petContentText}>{props.applicantName}</div>
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
                <Input className={styles.otherReasonInputBox} radius="md" size="md" onChange={(e) => setOtherReason(e.target.value)}></Input>
              </Input.Wrapper>
            )}

            <div className={styles.bottomContainer}>
              <div>領養申請通過？</div>
              <div className={styles.buttonContainer}>
                <Button className={styles.approvedButton} color="violet" radius="xl" onClick={handleSubmitPassForm}>
                  通過
                </Button>
                <Button className={styles.notApprovedButton} color="violet" radius="xl" onClick={handleSubmitRejectForm}>
                  不通過
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
}
