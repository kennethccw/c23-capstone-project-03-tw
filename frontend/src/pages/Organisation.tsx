import styles from "../css/organisation.module.scss";
import { HiChevronLeft, HiOutlineAdjustments } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { OrganisationContainer } from "../components/OrganisationElement";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getHomeOrganisation } from "../api/homeAPI";
import { LoadingOverlay } from "@mantine/core";

export default function Organisation() {
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["organisation"],
    queryFn: getHomeOrganisation,
    refetchInterval: 5_000,
    staleTime: 10_000,
    retry: 1,
  });
  return (
    <div>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

      <div>
        <div className={styles.chevronAndAdjustmntIcon}>
          <HiChevronLeft className={styles.chevronIcon} onClick={() => navigate(-1)} />
          <HiOutlineAdjustments className={styles.adjustmentIcon} />
        </div>
        <span className={styles.organisationTab}>機構</span>
        <hr className={styles.lineTab}></hr>
      </div>
      <div className={styles.boxContainer}>
        {data?.map((organisation) => (
          <OrganisationContainer key={organisation.id} organisation={organisation} />
        ))}
        {/* <OrganisationContainer />
        <OrganisationContainer />
        <OrganisationContainer />
        <OrganisationContainer />
        <OrganisationContainer />
        <OrganisationContainer />
        <OrganisationContainer /> */}
      </div>
    </div>
  );
}
