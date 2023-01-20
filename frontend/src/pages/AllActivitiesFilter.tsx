import { OrganisationFilter } from "../components/OrganisationFilterComponent";
import { useNavigate } from "react-router-dom";
import {
  UnstyledButton,
  Checkbox,
  Text,
  createStyles,
  MantineProvider,
} from "@mantine/core";
import styles from "../css/organisationFilterPage.module.scss";


export default function AllActivitiesFilter() {
  const navigate = useNavigate();
  return (
    <div>
      <OrganisationFilter />


      <div className={styles.filterContentContainer}>
        <div className={styles.addressTab}>出席日子</div>
        <div className={styles.dateContainer}>
          <div className={styles.firstDate}>平日 （週一至週五）</div>
          <div className={styles.secondDate}>週末 （週六至週日）</div>
        </div>
      </div>



    </div>
  );
}