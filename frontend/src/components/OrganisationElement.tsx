import { ClassNames } from "@emotion/react";
import { HiChevronLeft, HiOutlineAdjustments } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import type { OrganisationList } from "../api/organisationAPI";
import styles from "../css/organisation.module.scss";

export function OrganisationContainer(props: { organisation: OrganisationList; page: string }) {
  const navigate = useNavigate();
  const imgPath = "/photos/organisation";

  return (
    <>
      <div className={styles.organisationContainer} onClick={props.page === "organisationList" ? () => navigate(`/organisation/detail?id=${props.organisation.id}`) : () => navigate(-1)}>
        <img className={styles.square} src={imgPath + "/" + props.organisation.logo}></img>
        <div>{props.organisation.name}</div>
      </div>
    </>
  );
}
