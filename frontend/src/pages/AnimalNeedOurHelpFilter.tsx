import { OrganisationFilter } from "../components/OrganisationFilterComponent";
import { useNavigate } from "react-router-dom";
import NewNavbar from "../components/NewNavbar";

export default function HelpLocationFilter() {
  const navigate = useNavigate();
  return (
    <div>
      <OrganisationFilter />
      <NewNavbar activeBtn="bolt" />
    </div>
  );
}
