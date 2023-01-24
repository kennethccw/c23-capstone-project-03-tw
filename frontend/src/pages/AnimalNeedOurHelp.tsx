import styles from "../css/animalNeedOurHelp.module.scss";
import { useNavigate } from "react-router-dom";
import { OrganisationContainer } from "../components/OrganisationElement";
import { HiChevronLeft, HiOutlineAdjustments } from "react-icons/hi";
import NewNavbar from "../components/NewNavbar";
import { useQuery } from "react-query";
import { getOrganisationList } from "../api/organisationAPI";

export default function AnimalNeedOurHelp() {
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["organisation"],
    queryFn: getOrganisationList,
    refetchInterval: 5_000,
    staleTime: 10_000,
    retry: 1,
  });
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
        {data?.map((organisation) => (
          <OrganisationContainer key={organisation.id} organisation={organisation} page="animalNeedHelp" />
        ))}
      </div>

      <NewNavbar activeBtn="bolt" />
    </div>
  );
}
