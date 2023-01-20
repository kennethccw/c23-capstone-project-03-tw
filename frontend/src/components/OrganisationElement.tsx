import { ClassNames } from "@emotion/react";
import { HiChevronLeft, HiOutlineAdjustments } from "react-icons/hi";
import styles from "../css/organisation.module.scss";

export function OrganisationContainer() {
  return (
    <>
          <div className={styles.organisationContainer}>
            <div className={styles.square}></div>
            <div>香港動物群益會</div>
          </div>
    </>
  );
}


