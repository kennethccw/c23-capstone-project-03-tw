import styles from "../css/organisation.module.scss";
import { HiChevronLeft, HiOutlineAdjustments } from "react-icons/hi";
import { Outlet, useNavigate } from "react-router-dom";
import { OrganisationContainer } from "../components/OrganisationElement";
import { useQuery } from "react-query";
import { getOrganisationList, OrganisationList } from "../api/organisationAPI";
import { LoadingOverlay } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { OrganisationFilter } from "../components/OrganisationFilterComponent";
export default function Organisation() {
  const navigate = useNavigate();
  const status = "organisation"

  const url = window.location.toString();
  const [isFilterTriggered, setIsFilterTriggered] = useState<boolean>(false);
  const [isHKIslandChecked, setIsHKIslandChecked] = useState<boolean>(false);
  const [isKowloonChecked, setIsKowloonChecked] = useState<boolean>(false);
  const [isNTChecked, setIsNTChecked] = useState<boolean>(false);
  const [organisationData, setOrganisationData] = useState<OrganisationList[]>([]);
  const [organisationDataForSearch, setOrganisationDataForSearch] = useState<OrganisationList[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [numberOfAvailableOrganisations, setNumberOfAvailableOrganisations] = useState<number>(0);

  const handleGoToFilter = () => {
    setIsFilterTriggered(true);
    setIsSearching(false);
    setNumberOfAvailableOrganisations(0);
    setIsHKIslandChecked(false)
    setIsKowloonChecked(false);
    setIsNTChecked(false)
  };

  const handleGoback = () => {
    setIsFilterTriggered(false);
    setIsHKIslandChecked(false);
    setIsKowloonChecked(false);
    setIsNTChecked(false);
    setNumberOfAvailableOrganisations(0);
    setIsSearching(false);
  };

  const handleClickHKIslandChecked = () => {

    if (!isHKIslandChecked) {
      setIsHKIslandChecked(!isHKIslandChecked);
      setIsNTChecked(false);
      setIsKowloonChecked(false);
    }
    else {
      setIsHKIslandChecked(true)
    }
  };

  const handleClickKowloonChecked = () => {
    if (!isKowloonChecked) {
      setIsKowloonChecked(!isKowloonChecked);
      setIsHKIslandChecked(false)
      setIsNTChecked(false)

    } else { setIsKowloonChecked(true); }
  };

  const handleClickNTChecked = () => {
    if (!isNTChecked) {
      setIsNTChecked(!isNTChecked);
      setIsHKIslandChecked(false)
      setIsKowloonChecked(false)
    } else { setIsNTChecked(true) }
  };



  useEffect(() => {

    setIsSearching(true);

    if (isHKIslandChecked) {
      let availableOrganisationNumber = [...organisationData].filter((eachOrganisation) => eachOrganisation.district === "hong_kong_island").length;
      setNumberOfAvailableOrganisations(availableOrganisationNumber)
    }
    else if (isKowloonChecked) {
      let availableOrganisationNumber = [...organisationData].filter((eachOrganisation) => eachOrganisation.district === "kowloon").length;
      setNumberOfAvailableOrganisations(availableOrganisationNumber)
    }
    else {
      let availableOrganisationNumber = [...organisationData].filter((eachOrganisation) => eachOrganisation.district === "new_territories").length;
      setNumberOfAvailableOrganisations(availableOrganisationNumber)
    }

  }, [isHKIslandChecked, isKowloonChecked, isNTChecked])



  const handleClickConfirmButton = () => {
    setIsFilterTriggered(false);
    setIsHKIslandChecked(false);
    setIsKowloonChecked(false);
    if (numberOfAvailableOrganisations === 0) {
      alert("請選擇地點")
    }
    else if (isHKIslandChecked) {
      let organisationToBeRendered = [...organisationData].filter((eachOrganisation) => eachOrganisation.district === "hong_kong_island");
      setOrganisationDataForSearch(organisationToBeRendered)
    }
    else if (isKowloonChecked) {
      let organisationToBeRendered = [...organisationData].filter((eachOrganisation) => eachOrganisation.district === "kowloon");
      setOrganisationDataForSearch(organisationToBeRendered)
    }
    else if (isNTChecked) {
      let organisationToBeRendered = [...organisationData].filter((eachOrganisation) => eachOrganisation.district === "new_territories");
      setOrganisationDataForSearch(organisationToBeRendered)}
  
}



const handleClickClearAll = () => {
  setIsHKIslandChecked(false);
  setIsKowloonChecked(false);
  setIsNTChecked(false);
  setNumberOfAvailableOrganisations(0);
};


const { isLoading, isError, data, error } = useQuery({
  queryKey: ["organisation"],
  queryFn: getOrganisationList,
  refetchInterval: 5_000,
  staleTime: 10_000,
  retry: 1,
});

if (data && data !== organisationData
  && !isSearching
) {
  console.log("fetched data from DB:", data);
  setOrganisationData(data!);
  setOrganisationDataForSearch(data!);
  // console.log("new data stored into Activity Data");
}



return (
  <>
    {!url.split("/organisation")[1] ? (
      <div>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />

        <div>
          <div className={styles.chevronAndAdjustmntIcon}>
            {!isFilterTriggered && <HiChevronLeft className={styles.chevronIcon} onClick={() => navigate(-1)} />}
            {!isFilterTriggered && <HiOutlineAdjustments className={styles.adjustmentIcon} onClick={() => handleGoToFilter()} />}
          </div>
          {!isFilterTriggered && <span className={styles.organisationTab}>機構</span>}
          {!isFilterTriggered && <hr className={styles.lineTab}></hr>}
        </div>
        <div className={styles.boxContainer}>
          {isFilterTriggered ? (
            <OrganisationFilter
              onBack={() => {
                handleGoback();
              }}
              isHKIslandChecked={isHKIslandChecked}
              onCheckHKI={() => handleClickHKIslandChecked()}
              isKowloonChecked={isKowloonChecked}
              onCheckKowloon={() => handleClickKowloonChecked()}
              isNTChecked={isNTChecked}
              onCheckNT={() => handleClickNTChecked()}
              status={status}

              onConfirm={() => {
                handleClickConfirmButton();
              }}
              numberOfAvailableActivities={numberOfAvailableOrganisations}
              onClearAll={() => handleClickClearAll()}
            />
          ) : data?.map((organisation) => (
            <OrganisationContainer key={organisation.id} organisation={organisation} page="organisationList" />
          ))}
        </div>
      </div>
    ) : (
      <Outlet />
    )
    }
  </>
);
}
