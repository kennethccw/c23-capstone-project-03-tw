import styles from "../css/animalNeedOurHelp.module.scss";
import { useNavigate } from "react-router-dom";
import { OrganisationContainer } from "../components/OrganisationElement";
import { HiChevronLeft, HiOutlineAdjustments } from "react-icons/hi";
import NewNavbar from "../components/NewNavbar";
import { useQuery } from "react-query";
import { getOrganisationList } from "../api/organisationAPI";
import { useMemo } from "react";

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
    <>
      <div className={styles.containerForAll}>
        {/* <div> */}
        <div className={styles.chevronAndAdjustmntIcon}>
          {/* <HiChevronLeft className={styles.chevronIcon} /> */}
          <div className={styles.chevronIcon} />
          <HiOutlineAdjustments className={styles.adjustmentIcon} />
        </div>
        <span className={styles.organisationTab}>即時對話</span>
        <hr className={styles.lineTab}></hr>
        {/* </div> */}
        <div className={styles.boxContainer}>
          {data?.map((organisation) => (
            <OrganisationContainer key={organisation.id} organisation={organisation} page="animalNeedHelp" />
          ))}
          {data && data.length % 2 === 1 && <div className={styles.emptyBox}></div>}
        </div>
      </div>
      <NewNavbar activeBtn="bolt" />
    </>
  );
}
