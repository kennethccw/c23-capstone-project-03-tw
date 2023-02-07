import { ClassNames } from "@emotion/react";
import styles from "../css/searchResult.module.scss";
import { HiOutlineX } from "react-icons/hi";

import { UnstyledButton, Checkbox, Text, createStyles, MantineProvider, Button, Modal } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { AdoptionResultStatus, PetDetail, putPetAdoptionApplication } from "../api/adoptionAPI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function PetDetailsComponent(props: { pet: PetDetail; clickHandler: () => void; status?: AdoptionResultStatus }) {
  enum ChineseGender {
    male = "男",
    female = "女",
  }

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  let role=localStorage.getItem('role')
  const cancelAdoptionApplication = async () => {
    const resp = await putPetAdoptionApplication(props.pet.pet_id);
    const result = await resp.json();
    if (resp.status === 200) {
      navigate("/application/cancellation");
    } else {
      alert(result.message);
    }
  };

  // const REACT_APP_FILE_BASE = "https://server.ericlcf.me/uploads"
  // const REACT_APP_FILE_BASE = "http://localhost:8080";

  return (
    <>
      <MantineProvider
        theme={{
          colors: {
            ocean: ["#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5"],
            "bright-pink": ["#F0BBDD", "#ED9BCF", "#EC7CC3", "#ED5DB8", "#F13EAF", "#F71FA7", "#FF00A1", "#E00890", "#C50E82", "#AD1374"],
          },
        }}
      >
        <div className={styles.petContainer}>
          <div className={styles.imgContainer}>
            <img className={styles.imgContent} src={`${process.env.REACT_APP_S3_UPLOAD_BUCKET_URL}/pet/${props.pet.image}`}></img>
            {/* <img className={styles.imgContent} src={`${process.env.REACT_APP_BACKEND_URL}/pet/${props.pet.image}`}></img> */}
          </div>

          <div className={styles.detailsBigContainer}>
            <div className={styles.detailsContainer}>
              <div className={styles.detailLabelAndContent}>
                <div className={styles.detailLabel}>名字：</div>
                <div className={styles.detailContent}>{props.pet.name}</div>
              </div>
              <div className={styles.detailLabelAndContent}>
                <div className={styles.detailLabel}>性別：</div>
                <div className={styles.detailContent}>{ChineseGender[props.pet.gender!]}</div>
              </div>
              <div className={styles.detailLabelAndContent}>
                <div className={styles.detailLabel}>年齡：</div>
                <div className={styles.detailContent}>{props.pet.age}</div>
              </div>
              <div className={styles.detailLabelAndContent}>
                <div className={styles.detailLabel}>重量：</div>
                <div className={styles.detailContent}>{`${props.pet.weight} kg`}</div>
              </div>
              <div className={styles.detailLabelAndContent}>
                <div className={styles.detailLabel}>品種：</div>
                <div className={styles.detailContent}>{props.pet.breed}</div>
              </div>
              <div className={styles.detailLabelAndContent}>
                <div className={styles.detailLabel}>備注：</div>
                <div className={styles.detailContent}>{props.pet.remark}</div>
              </div>
              <div className={styles.detailLabelAndContent}>
                <div className={styles.detailLabel}>所屬機構：</div>
                <div className={styles.detailContent}>{props.pet.organisation}</div>
              </div>
            </div>
          </div>
        </div>
        {!props.status && role!=="organisation" && (
          <Button className={styles.buttonsecond} color="violet" radius="xl" onClick={props.clickHandler}>
            申請領養
          </Button>
        )}
        {props.status === AdoptionResultStatus.pending &&  role!=="organisation" && (
          <Button className={styles.buttonsecond} color="violet" radius="xl" onClick={() => setOpened(true)}>
            取消申請
          </Button>
        )}
        <Modal radius="lg" size="80%" centered overlayOpacity={0.55} overlayBlur={3} opened={opened} onClose={() => setOpened(false)} className={styles.modalConfirmCancelModal}>
          <div className={styles.modalConfirmCancelContainer}>
            <h2 className={styles.modalConfirmCancelTitle}>確定取消申請？</h2>
            <Button color="pink" className={styles.joinButton} onClick={cancelAdoptionApplication}>
              <div>確定</div>
            </Button>
          </div>
        </Modal>
      </MantineProvider>
    </>
  );
}
