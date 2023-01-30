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
  enum ChineseAge {
    months = "月",
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
        </div>

        <div className={styles.detailsforAll}>
          <div className={styles.detailsContainer}>
            <div>
              名字：<span>{props.pet.name}</span>
            </div>
          </div>

          <div className={styles.detailsContainer}>
            <div>
              性別：<span>{ChineseGender[props.pet.gender!]}</span>
            </div>
          </div>

          <div className={styles.detailsContainer}>
            <div>
              年齡：<span></span>
            </div>
          </div>

          <div className={styles.detailsContainer}>
            <div>
              重量：<span>{`${props.pet.weight} kg`}</span>
            </div>
          </div>

          <div className={styles.detailsContainer}>
            <div>
              品種：<span>{props.pet.breed}</span>
            </div>
          </div>

          <div className={styles.illnessRecordContainer}>
            <div>
              病歷：
              <span>{props.pet.remark}</span>
            </div>
          </div>

          <div className={styles.detailsContainer}>
            <div>
              所屬機構：<span>{props.pet.organisation}</span>
            </div>
          </div>
        </div>

        <Button className={styles.buttonsecond} radius="xl">
          申請領養
        </Button>
      </MantineProvider>
    </>
  );
}
