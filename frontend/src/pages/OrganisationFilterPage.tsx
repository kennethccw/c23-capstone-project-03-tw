import { OrganisationFilter } from "../components/OrganisationFilterComponent";
import { useNavigate } from "react-router-dom";

export default function OrganisationFilterContainer() {
  const navigate = useNavigate();
  return (
    <div>
      <OrganisationFilter />
    </div>
  );
}
