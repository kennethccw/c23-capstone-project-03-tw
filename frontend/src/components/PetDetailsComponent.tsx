import { ClassNames } from "@emotion/react";
import styles from "../css/searchResult.module.scss";
import { HiOutlineX } from "react-icons/hi";

import { UnstyledButton, Checkbox, Text, createStyles, MantineProvider, Button } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { PetDetail } from "../api/adoptionAPI";

export function PetDetailsComponent(props: { pet: PetDetail; clickHandler: () => void }) {
  enum ChineseGender {
    male = "男",
    female = "女",
  }

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
            <img className={styles.imgContent} src={`/photos/pet/${props.pet.image}`}></img>
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
        <Button className={styles.buttonsecond} color="violet" radius="xl" onClick={props.clickHandler}>
          申請領養
        </Button>
      </MantineProvider>
    </>
  );
}
