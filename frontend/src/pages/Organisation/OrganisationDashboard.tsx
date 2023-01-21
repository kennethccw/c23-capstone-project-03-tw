import { OrganisationNavbar } from "../../components/NavBarforOrganisation";
import { useNavigate } from "react-router-dom";
import styles from "../../css/organisationNavbar.module.scss";


export default function DashboardPicture() {
  const navigate = useNavigate();
  return (
    
      <div className={styles.containerForAll}>
        <OrganisationNavbar />
      </div>

  );
}
