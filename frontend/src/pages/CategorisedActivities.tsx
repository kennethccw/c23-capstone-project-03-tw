import styles from "../css/allActivitiesPage.module.scss";
import { ChevronLeft, Filter } from "react-bootstrap-icons";
import { Input, LoadingOverlay, TextInput } from "@mantine/core"; //https://ui.mantine.dev/category/inputs
import { IconSearch } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { Activity } from "../components/ActivitiesUtilis";
import NewNavbar from "../components/NewNavbar";
import { useQuery } from "react-query";
import { ActivityDetail, ActivityPreview, getActivitiesByCategory, getAllActivities } from "../api/activityAPI";
import { useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiOutlineAdjustments, HiSearch } from "react-icons/hi";
import { OrganisationFilter } from "../components/OrganisationFilterComponent";
import { useSetState } from "@mantine/hooks";
import { RiContactsBookLine } from "react-icons/ri";

export default function CategorisedActivities() {
  const navigate = useNavigate();
  const params = new URLSearchParams(document.location.search);
  const [ActivityData, setActivityData] = useState<ActivityPreview[]>([])
  const [ActivityDataForSearch, setActivityDataForSearch] = useState<ActivityPreview[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [search, setSearch] = useState<string | null>("")
  const [isFilterTriggered, setIsFilterTriggered] = useState<boolean>(false)
  const [isHKIslandChecked, setIsHKIslandChecked] = useState<boolean>(false)
  const [isKowloonChecked, setIsKowloonChecked] = useState<boolean>(false)
  const [isNTChecked, setIsNTChecked] = useState<boolean>(false)

  const [numberOfAvailableActivities, setNumberOfAvailableActivities] = useState<number>(0)

  const [clearAll, setClearAll] = useState<boolean>(false)






  console.log(isHKIslandChecked, 'HK Island')
  console.log(isKowloonChecked, 'kowloon')
  console.log(isNTChecked, '新界')


  console.log(numberOfAvailableActivities, 'numberOfAvailableActivitie')
  console.log('searching?', isSearching)
  console.log('what are you searching for?', search)
  //////////////////////////  探索義工機會部分  ///////////////////////////////////////////////
  const searching = (searchValue: string) => {
    if (searchValue.trim() === "") {
      setIsSearching(false);
      setSearch("")
      setActivityData([...ActivityData])
      console.log('searchState: ', search)
    }

    if (searchValue.trim() !== "") { setIsSearching(true); setSearch(searchValue.toLowerCase().trim()); }
  }




  /////////////////////////  篩選功能部分/////////////////////////////////////////////////////
  const handleGoToFilter = () => {
    setIsFilterTriggered(true);
    setSearch("");
    setIsSearching(false)
    setNumberOfAvailableActivities(0)
    setActivityDataForSearch([])
    // setCheckedWeekdayState(false);
    // setCheckedWeekendState(false);
  }


  const handleGoback = () => {   // click the cross button to go back to 探索義工 page
    setIsFilterTriggered(false)
    setIsHKIslandChecked(false)
    setIsKowloonChecked(false)
    setIsNTChecked(false)
    setNumberOfAvailableActivities(0)
    setSearch("");
    setIsSearching(false)
  }

  const goBackButtonOnTop = () => {
    setIsFilterTriggered(false)
    setIsHKIslandChecked(false)
    setIsKowloonChecked(false)
    setIsNTChecked(false)
    setSearch("")
    navigate(-1)
    setIsSearching(false)
    setNumberOfAvailableActivities(0)
  }

  const handleClickHKIslandChecked = () => {
    setIsHKIslandChecked(!isHKIslandChecked)
    setIsSearching(!isSearching)
  }

  const handleClickKowloonChecked = () => {
    setIsKowloonChecked(!isKowloonChecked)
    setIsSearching(!isSearching)
  }

  const handleClickNTChecked = () => {
    setIsNTChecked(!isNTChecked)
    setIsSearching(!isSearching)
  }




  const handleClickConfirmButton = () => {
    let currentStoredActivity = [...ActivityData];
    if (isHKIslandChecked) {
      setActivityDataForSearch(currentStoredActivity.filter((eachActivity) => eachActivity.district === "hong_kong_island"))
      setIsFilterTriggered(false);
      setIsHKIslandChecked(false)
      setIsKowloonChecked(false)
      setIsNTChecked(false)
      setIsSearching(false)
      setNumberOfAvailableActivities(0)
    }
    else if(isKowloonChecked){
      setActivityDataForSearch(currentStoredActivity.filter((eachActivity) => eachActivity.district === "kowloon"))
      setIsFilterTriggered(false);
      setIsHKIslandChecked(false)
      setIsKowloonChecked(false)
      setIsNTChecked(false)
      setIsSearching(false)
      setNumberOfAvailableActivities(0)
    }
    else if(isNTChecked){
      setActivityDataForSearch(currentStoredActivity.filter((eachActivity) => eachActivity.district === "new_territories"))
      setIsFilterTriggered(false);
      setIsHKIslandChecked(false)
      setIsKowloonChecked(false)
      setIsNTChecked(false)
      setIsSearching(false)
      setNumberOfAvailableActivities(0)
    }
   else if(isHKIslandChecked && isKowloonChecked ){
    setActivityDataForSearch(currentStoredActivity.filter((eachActivity) => eachActivity.district === "hong_kong_island" || "kowloon"))
    setIsFilterTriggered(false);
    setIsHKIslandChecked(false)
    setIsKowloonChecked(false)
    setIsNTChecked(false)
    setIsSearching(false)
    setNumberOfAvailableActivities(0)

   }
   else if(isHKIslandChecked &&isNTChecked){
    setActivityDataForSearch(currentStoredActivity.filter((eachActivity) => eachActivity.district === "hong_kong_island" || "new_territories"))
    setIsFilterTriggered(false);
    setIsHKIslandChecked(false)
    setIsKowloonChecked(false)
    setIsNTChecked(false)
    setIsSearching(false)
    setNumberOfAvailableActivities(0)
   }
   else{
    setActivityDataForSearch(currentStoredActivity.filter((eachActivity) => eachActivity.district === "kowloon" || "new_territories"))
    setIsFilterTriggered(false);
    setIsHKIslandChecked(false)
    setIsKowloonChecked(false)
    setIsNTChecked(false)
    setIsSearching(false)
    setNumberOfAvailableActivities(0)

   }












  }

  const handleClickClearAll = () => {
    setClearAll(true)
    setIsHKIslandChecked(false)
    setIsKowloonChecked(false)
    setIsNTChecked(false)

  }



  //////////////////////////////////////////////////////////////////////////////////////////


  enum PageCategory {
    all = "all",
    editorsChoice = "editors_choice",
    urgent = "urgent",
    popular = "popular",
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (params.get("category") && params.get("category") !== PageCategory.editorsChoice && params.get("category") !== PageCategory.urgent && params.get("category") !== PageCategory.popular) {
      navigate("/activity");
    }

    // let numberOfInitialActivity= ActivityDataForSearch.length
    // console.log(numberOfInitialActivity.toString(), '<-number of initial activity')
    // setNumberOfAvailableActivities(numberOfInitialActivity.toString())
  }, []);


  ///////////////////////////////// 探索義工機會部分 search bar function ////////////////////
  useEffect(() => {
    let clonedActivityData = [...ActivityData]
    let filterActivityData = clonedActivityData.filter((eachActivityData) => eachActivityData.organisation.toLowerCase().slice(0, search!.length) === search || eachActivityData.organisation.toLowerCase().includes(search!) || eachActivityData.organisation.toLowerCase()[0] === search![0] || eachActivityData.activity.toLowerCase().slice(0, search!.length) === search || eachActivityData.activity.toLowerCase().includes(search!) || eachActivityData.activity.toLowerCase().includes(search!) || eachActivityData.activity.toLowerCase()[0] === search![0] || eachActivityData.location.toLowerCase().includes(search!))
    setActivityDataForSearch(filterActivityData)

  }, [search])

  ////////////篩選功能部分//////////
  useEffect(() => {
    let numberOfActivityToBeChosen = numberOfAvailableActivities;
    let HKIslandActivity = ActivityData.filter((eachActivity) => eachActivity.district === "hong_kong_island").length;
    if (isHKIslandChecked === true) {
      let updateActivityNum = numberOfActivityToBeChosen + HKIslandActivity
      setNumberOfAvailableActivities(updateActivityNum)
    }

    if (isHKIslandChecked === false && numberOfAvailableActivities === 0) { setNumberOfAvailableActivities(0) }
    if (isHKIslandChecked === false) {
      let updateActivityNum = numberOfActivityToBeChosen - HKIslandActivity
      setNumberOfAvailableActivities(updateActivityNum)
    }

    if (clearAll) {
      setNumberOfAvailableActivities(0)
      setClearAll(false)
    }



  }, [isHKIslandChecked])


  useEffect(() => {
    let numberOfActivityToBeChosen = numberOfAvailableActivities;
    let KowloonActivity = ActivityData.filter((eachActivity) => eachActivity.district === "kowloon").length;
    if (isKowloonChecked === true) {
      let updateActivityNum = numberOfActivityToBeChosen + KowloonActivity
      setNumberOfAvailableActivities(updateActivityNum)
    }
    if (isKowloonChecked === false && numberOfAvailableActivities === 0) { setNumberOfAvailableActivities(0) }
    if (isKowloonChecked === false) {
      let updateActivityNum = numberOfActivityToBeChosen - KowloonActivity
      setNumberOfAvailableActivities(updateActivityNum)
    }

    if (clearAll) {
      setNumberOfAvailableActivities(0)
      setClearAll(false)
    }

  }, [isKowloonChecked])


  useEffect(() => {
    let numberOfActivityToBeChosen = numberOfAvailableActivities;
    let NTActivity = ActivityData.filter((eachActivity) => eachActivity.district === "new_territories").length;
    if (isNTChecked === true) {
      let updateActivityNum = numberOfActivityToBeChosen + NTActivity
      setNumberOfAvailableActivities(updateActivityNum)
    }
    if (isNTChecked === false && numberOfAvailableActivities === 0) { setNumberOfAvailableActivities(0) }
    if (isNTChecked === false) {
      let updateActivityNum = numberOfActivityToBeChosen - NTActivity
      setNumberOfAvailableActivities(updateActivityNum)
    }

    if (clearAll) {
      setNumberOfAvailableActivities(0)
      setClearAll(false)
    }
  }, [isNTChecked])








  ////////////////////////////////////////////////////////////////////////////////////////

  const pageCategory = useRef<PageCategory>(PageCategory.all);
  if (params.get("category") === PageCategory.editorsChoice || params.get("category") === PageCategory.urgent || params.get("category") === PageCategory.popular) {
    pageCategory.current = params.get("category") as PageCategory;
  }

  const getActivities = async () => {
    if (params.get("category") === PageCategory.editorsChoice || params.get("category") === PageCategory.urgent || params.get("category") === PageCategory.popular) {
      const categorisedResult = await getActivitiesByCategory(params.get("category")!);
      return categorisedResult;
    } else {
      const allResult = await getAllActivities();
      return allResult;
    }
  };

  const { isError, data, error, isLoading } = useQuery({
    queryKey: ["activity/category"],
    queryFn: getActivities,
    refetchInterval: 5_000,
    staleTime: 10_000,
    retry: 1,
  });

  console.log(data);


  if (data && data !== ActivityData && !isSearching) {
    setActivityData(data!)
    setActivityDataForSearch(data!)
    // setNumberOfAvailableActivities(data!.length.toString())
    console.log("new data stored into Activity Data")
  }






  return (
    <div>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

      <div className={styles.upperPart}>
        <div className={styles.chevronAndAdjustmntIcon}>
          <HiChevronLeft className={styles.backIcon} onClick={() => goBackButtonOnTop()} />

          {!isFilterTriggered && <Input.Wrapper>
            <Input type="search" onChange={(e) => { searching(e.target.value) }} className={styles.searchContainer} icon={<HiSearch className={styles.searchIcon} />} placeholder="搜尋關鍵字" />
          </Input.Wrapper>}

          {!isFilterTriggered &&
            <div className={styles.adjustmentFilterIconContainer}>
              <HiOutlineAdjustments className={styles.adjustmentFilterIcon} onClick={() => handleGoToFilter()} />
            </div>}
        </div>


        {/* <div className={styles.searchBarPart}>
          <TextInput className={styles.searchBar} icon={<IconSearch size={30} stroke={1.5} className={styles.iconSearch} />} radius="xl" size="xl" placeholder="尋找關鍵字" rightSectionWidth={42} />
        </div> */}
        {/* <div className={styles.filter}>
          <Filter className={styles.filterIcon} />
        </div> */}
      </div>


      <div className={styles.bottomPart}>

        {isFilterTriggered ?
          <OrganisationFilter onBack={() => { handleGoback() }} isHKIslandChecked={isHKIslandChecked} onCheckHKI={() => handleClickHKIslandChecked()} isKowloonChecked={isKowloonChecked} onCheckKowloon={() => handleClickKowloonChecked()} isNTChecked={isNTChecked} onCheckNT={() => handleClickNTChecked()} onConfirm={() => { handleClickConfirmButton() }} numberOfAvailableActivities={numberOfAvailableActivities} onClearAll={() => handleClickClearAll()} /> :

          <div>
            {pageCategory.current === PageCategory.all && <div className={styles.searchChance}>探索義工機會</div>}
            {params.get("category") === PageCategory.editorsChoice && <div className={styles.searchChance}>Petscue 推介</div>}
            {params.get("category") === PageCategory.urgent && <div className={styles.searchChance}>急需支援</div>}
            {params.get("category") === PageCategory.popular && <div className={styles.searchChance}>熱門活動</div>}

            {ActivityDataForSearch?.map((activity) => (
              <Activity key={activity.activity_id} activity={activity} clickHandler={() => navigate(`/activity/detail?id=${activity.activity_id}`)} />
            ))}
          </div>
        }

      </div>


      {<NewNavbar activeBtn={pageCategory.current === PageCategory.all ? "search" : "home"} />}
    </div>
  );
}
