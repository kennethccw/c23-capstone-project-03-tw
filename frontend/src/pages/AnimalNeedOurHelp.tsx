import styles from "../css/animalNeedOurHelp.module.scss";
import { useNavigate } from "react-router-dom";
import {OrganisationContainer} from "../components/OrganisationElement";
import { HiChevronLeft, HiOutlineAdjustments } from "react-icons/hi";
import NewNavbar from "../components/NewNavbar";

export default function AnimalNeedOurHelp() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div className={styles.chevronAndAdjustmntIcon}>
          <HiChevronLeft className={styles.chevronIcon} />
          <HiOutlineAdjustments className={styles.adjustmentIcon} />
        </div>
        <span className={styles.organisationTab}>即時對話</span>
        <hr className={styles.lineTab}></hr>
      </div>
      <div className={styles.boxContainer}>

      <OrganisationContainer />
      <OrganisationContainer />
      <OrganisationContainer />
      <OrganisationContainer />
      </div>
      
      <NewNavbar />
    </div>
  );
}



