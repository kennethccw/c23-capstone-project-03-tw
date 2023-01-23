import { ClassNames } from "@emotion/react";
import { HiChevronLeft, HiOutlineAdjustments } from "react-icons/hi";
import { HomeOrganisation } from "../api/homeAPI";
import styles from "../css/organisation.module.scss";

export function OrganisationContainer(props: { organisation: HomeOrganisation }) {
  return (
    <>
      <div className={styles.organisationContainer}>
        <img className={styles.square} src={props.organisation.logo}></img>
        <div>{props.organisation.name}</div>
      </div>
    </>
  );
}
