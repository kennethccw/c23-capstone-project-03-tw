import { OrganisationFilter } from "../components/OrganisationFilterComponent";
import { useNavigate } from "react-router-dom";
import styles from "../css/organisation.module.scss";

export default function OrganisationFilterContainer() {
  const navigate = useNavigate();
  return (
    <div>
      <OrganisationFilter />
    </div>
  );
}
