import styles from "../css/organisation.module.scss";
import { HiChevronLeft, HiOutlineAdjustments } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {OrganisationContainer} from "../components/OrganisationElement";


export default function Organisation() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div className={styles.chevronAndAdjustmntIcon}>
          <HiChevronLeft className={styles.chevronIcon} />
          <HiOutlineAdjustments className={styles.adjustmentIcon} />
        </div>
        <span className={styles.organisationTab}>機構</span>
        <hr className={styles.lineTab}></hr>
      </div>
      <div className={styles.boxContainer}>

      <OrganisationContainer />
      <OrganisationContainer />
      <OrganisationContainer />
      <OrganisationContainer />
      <OrganisationContainer />
      <OrganisationContainer />
      <OrganisationContainer />

      </div>
    </div>
  );
}
