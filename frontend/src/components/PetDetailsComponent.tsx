import { ClassNames } from "@emotion/react";
import styles from "../css/searchResult.module.scss";
import { HiOutlineX } from "react-icons/hi";

import { UnstyledButton, Checkbox, Text, createStyles, MantineProvider, Button } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";

export function PetDetailsComponent() {
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
            <img className={styles.imgContent} src="/photos/pet/pet-blue.jpeg"></img>
          </div>
        </div>

        <div className={styles.detailsforAll}>
          <div className={styles.detailsContainer}>
            <div>名字：<span>Boss</span></div>
          </div>

          <div className={styles.detailsContainer}>
            <div>性別：<span>男</span></div>
          </div>

          <div className={styles.detailsContainer}>
            <div>年齡：<span>2 months</span></div>
          </div>

          <div className={styles.detailsContainer}>
            <div>重量：<span>1.8 kg</span></div>
          </div>

          <div className={styles.detailsContainer}>
            <div>品種：<span>英短</span></div>
          </div>

          <div className={styles.illnessRecordContainer}>
            <div>病歷：<span>齊針 / 已絕育 / 非常乖 / 任摸任抱 / 識砂盆便便 / 但時會屙係地。</span></div>
          </div>

          <div className={styles.detailsContainer}>
            <div>所屬機構：<span>香港關愛庇護動物之家</span></div>
          </div>
          </div>

          <Button className={styles.buttonsecond}  radius="xl">
          申請領養
          </Button>
      </MantineProvider>
    </>
  );
}
