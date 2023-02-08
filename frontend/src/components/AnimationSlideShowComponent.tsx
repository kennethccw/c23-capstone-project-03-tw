import styles from "../css/searchResult.module.scss";
import { MantineProvider, Button } from "@mantine/core";
import { PetPreview } from "../api/adoptionAPI";
import React, { useState } from "react";
import DeleteActivityModal from "./DeleteActivityModal";

export function AnimalShow(props: { pet: PetPreview; clickHandler: () => void; displayDeleteButton?: boolean; onRemove?: () => void; animalToBeDeleted?: string }) {
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const showModal = () => {
    setShouldShowModal(true);
  };

  const hideModal = () => {
    setShouldShowModal(false);
  };

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
          <div className={styles.imgPreviewContainer}>
            <img className={styles.imgPreview} src={`${process.env.REACT_APP_S3_UPLOAD_BUCKET_URL}/pet/${props.pet.image}`} onClick={props.clickHandler}></img>
            {/* <img className={styles.imgPreview} src={`${process.env.REACT_APP_BACKEND_URL}/pet/${props.pet.image}`} onClick={props.clickHandler}></img> */}
            <div className={styles.nameContainer}>
              <div className={styles.nameContentContainer}>
                <div className={styles.nameTab}>{props.pet.name}</div>
                <div className={styles.nameTab}>{props.pet.age}</div>
              </div>
              <Button className={styles.button} color="violet" radius="xl" onClick={props.clickHandler}>
                {props.displayDeleteButton ? (
                  <div
                    className={styles.deleteButton}
                    onClick={(e) => {
                      showModal();
                      e.stopPropagation();
                    }}
                  >
                    刪除動物
                  </div>
                ) : (
                  <div onClick={props.clickHandler}>詳細資料</div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </MantineProvider>
      <DeleteActivityModal
        isShow={shouldShowModal}
        onDelete={() => {
          props.onRemove!();
          hideModal();
        }}
        onHide={() => hideModal()}
        activityNameToBeDeleted={props.animalToBeDeleted}
      />
    </>
  );
}
