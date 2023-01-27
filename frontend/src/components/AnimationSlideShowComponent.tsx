import { ClassNames } from "@emotion/react";
import styles from "../css/searchResult.module.scss";
import { HiOutlineX } from "react-icons/hi";

import { UnstyledButton, Checkbox, Text, createStyles, MantineProvider, Button } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";

export function AnimalShow() {
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
            <div></div>
          <img className={styles.imgContent} src="/photos/pet/pet-blue.jpeg">
          </img>
          <div className={styles.nameContainer}>
            <div className={styles.nameContentContainer}>
            <div className={styles.nameTab}>Boss </div>
            <div className={styles.nameTab}>2.5 months </div>

            </div>
          <Button className={styles.button} color="violet" radius="xl">
          詳細資料
          </Button>
          </div>
          </div>

        </div>
      </MantineProvider>
    </>
  );
}
