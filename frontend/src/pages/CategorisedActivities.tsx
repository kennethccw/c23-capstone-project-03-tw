import styles from "../css/categorisedActivities.module.scss";
import { ChevronLeft, Filter } from "react-bootstrap-icons";
import { Input, LoadingOverlay, TextInput } from "@mantine/core"; //https://ui.mantine.dev/category/inputs
import { IconSearch } from "@tabler/icons";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
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
  const [params] = useSearchParams();
  // const params = new URLSearchParams(document.location.search);
  const [activityData, setActivityData] = useState<ActivityPreview[]>([]);
  const [activityDataForSearch, setActivityDataForSearch] = useState<ActivityPreview[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [search, setSearch] = useState<string | null>("");


  /////////////////////// 篩選功能部分 //////////////////////////////////////
  const [isFilterTriggered, setIsFilterTriggered] = useState<boolean>(false);
  const [isHKIslandChecked, setIsHKIslandChecked] = useState<boolean>(false);
  const [isKowloonChecked, setIsKowloonChecked] = useState<boolean>(false);
  const [isNTChecked, setIsNTChecked] = useState<boolean>(false);
  const [numberOfAvailableActivities, setNumberOfAvailableActivities] = useState<number>(0);

  const [isWeekendChecked, setIsWeekendChecked] = useState<boolean>(false);
  const [isWeekDayChecked, setIsWeekDayChecked] = useState<boolean>(false);
  //////////////////////////////////////////////////////////////////////////////////////

  console.log("check HK Island? : ", isHKIslandChecked);
  console.log("check kowloon? : ", isKowloonChecked);
  console.log("check新界? :", isNTChecked);
  console.log("numberOfAvailableActivitie:", numberOfAvailableActivities);
  console.log("what are you searching for? : ", search);
  console.log("activity data:", activityData)
  console.log("isWeekendCheced: ", isWeekendChecked)
  console.log("isWeekDayChecked: ", isWeekDayChecked)
console.log("activity to be rendered: ", activityDataForSearch)
  console.log("clicked filter page", isFilterTriggered)

  //////////////////////////  探索義工機會部分  ///////////////////////////////////////////////
  const searching = (searchValue: string) => {
    if (searchValue.trim() === "") {
      setIsSearching(false);
      setSearch("");
      setActivityData([...activityData]);
      console.log("searchState: ", search);
    }

    if (searchValue.trim() !== "") {
      setIsSearching(true);
      setSearch(searchValue.toLowerCase().trim());
    }
  };

  /////////////////////////  篩選功能部分/////////////////////////////////////////////////////
  const handleGoToFilter = () => {
    setIsFilterTriggered(true);
    setSearch("");
    setIsSearching(false);
    setNumberOfAvailableActivities(0);
    setIsHKIslandChecked(false)
    setIsKowloonChecked(false);
    setIsNTChecked(false)
    setIsWeekendChecked(false);
    setIsWeekDayChecked(false);
  };

  const handleGoback = () => {
    // click the cross button to go back to 探索義工 page
    setIsFilterTriggered(false);
    setIsHKIslandChecked(false);
    setIsKowloonChecked(false);
    setIsNTChecked(false);
    setNumberOfAvailableActivities(0);
    setSearch("");
    setIsSearching(false);
  };


  //////////////////// filter condition ////////////////////////////////////////////////////////
  const handleClickHKIslandChecked = () => {

    if (!isHKIslandChecked) {    // when hk island is false
      setIsHKIslandChecked(!isHKIslandChecked); //turn it hkIsland to be true
      setIsNTChecked(false);   // turn NT false
      setIsKowloonChecked(false);
    }  // turn kowloon to be false
    else {
      setIsHKIslandChecked(true)
    setIsKowloonChecked(false);
    setIsNTChecked(false);
        // keep hk island to be true
    }
  };
  // ___________________________________________________________________________________________________________//
  const handleClickKowloonChecked = () => {
    if (!isKowloonChecked) {       //when kowloon is false
      setIsKowloonChecked(!isKowloonChecked);  //turn kowloon to be true
      setIsHKIslandChecked(false)     //turn hk island to be false
      setIsNTChecked(false)   //turn nt to be false

    } else { setIsKowloonChecked(true);
      setIsHKIslandChecked(false);
      setIsNTChecked(false); }    // if true when click,keep kowloon true
  };
  // ___________________________________________________________________________________________________________//
  const handleClickNTChecked = () => {
    if (!isNTChecked) {         //when NT is false 
      setIsNTChecked(!isNTChecked);     //  turn NT to true case
      setIsHKIslandChecked(false)   // turn hk island to be false
      setIsKowloonChecked(false)     // turn kowloon to be false
    } else { setIsNTChecked(true);
      setIsHKIslandChecked(false);
      setIsKowloonChecked(false);
      }    // if true when click,keep NT true
  };


  const handleClickWeekDay = () => {
    if (!isWeekDayChecked) {   // when weekday is false
      setIsWeekDayChecked(!isWeekDayChecked); // turn weekday to be true
      setIsWeekendChecked(false) //turn weekend to be false
    }
    else {
      setIsWeekDayChecked(true); // if weekday is true when click, keep it true
      setIsWeekendChecked(false)  // // turn weekend false
    }
  }

  const handleClickWeekend = () => {
    if (!isWeekendChecked) { setIsWeekendChecked(!isWeekendChecked); setIsWeekDayChecked(false) } else { setIsWeekendChecked(true); setIsWeekDayChecked(false) }
  }



  useEffect(() => {

    setIsSearching(true);

    if (isHKIslandChecked && isWeekDayChecked) {
      let availableActivityNumber = [...activityData].filter((eachActivity) => eachActivity.district === "hong_kong_island" && new Date(eachActivity.date).getDay() !== 0 && new Date(eachActivity.date).getDay() !== 6).length;
      let availableActivity = [...activityData].filter((eachActivity) => eachActivity.district === "hong_kong_island" && new Date(eachActivity.date).getDay() !== 0 && new Date(eachActivity.date).getDay() !== 6)
      setNumberOfAvailableActivities(availableActivityNumber)
      console.log("--------------",availableActivityNumber)
      console.log("--------------",availableActivity)
    }

    else if (isHKIslandChecked && isWeekendChecked) {
      let availableActivityNumber = [...activityData].filter((eachActivity) => eachActivity.district === "hong_kong_island" && new Date(eachActivity.date).getDay() !== 1 && new Date(eachActivity.date).getDay() !== 2 && new Date(eachActivity.date).getDay() !== 3 && new Date(eachActivity.date).getDay() !== 4 && new Date(eachActivity.date).getDay() !== 5).length;
      let availableActivity = [...activityData].filter((eachActivity) => eachActivity.district === "hong_kong_island" && new Date(eachActivity.date).getDay() !== 1 && new Date(eachActivity.date).getDay() !== 2 && new Date(eachActivity.date).getDay() !== 3 && new Date(eachActivity.date).getDay() !== 4 && new Date(eachActivity.date).getDay() !== 5);
      setNumberOfAvailableActivities(availableActivityNumber)
      console.log("--------------",availableActivityNumber)
      console.log("--------------",availableActivity)
    }
    else if (isKowloonChecked && isWeekDayChecked) {
      let availableActivityNumber = [...activityData].filter((eachActivity) => eachActivity.district === "kowloon" && new Date(eachActivity.date).getDay() !== 0 && new Date(eachActivity.date).getDay() !== 6).length;
      let availableActivity = [...activityData].filter((eachActivity) => eachActivity.district === "kowloon" && new Date(eachActivity.date).getDay() !== 0 && new Date(eachActivity.date).getDay() !== 6);
      setNumberOfAvailableActivities(availableActivityNumber)
      console.log("--------------",availableActivityNumber)
      console.log("--------------",availableActivity)
    }
    else if (isKowloonChecked && isWeekendChecked) {
      let availableActivityNumber = [...activityData].filter((eachActivity) => eachActivity.district === "kowloon" && new Date(eachActivity.date).getDay() !== 1 && new Date(eachActivity.date).getDay() !== 2 && new Date(eachActivity.date).getDay() !== 3 && new Date(eachActivity.date).getDay() !== 4 && new Date(eachActivity.date).getDay() !== 5).length;
      let availableActivity = [...activityData].filter((eachActivity) => eachActivity.district === "kowloon" && new Date(eachActivity.date).getDay() !== 1 && new Date(eachActivity.date).getDay() !== 2 && new Date(eachActivity.date).getDay() !== 3 && new Date(eachActivity.date).getDay() !== 4 && new Date(eachActivity.date).getDay() !== 5);
      setNumberOfAvailableActivities(availableActivityNumber)
      console.log("--------------",availableActivityNumber)
      console.log("--------------",availableActivity)
    }
    else if (isNTChecked && isWeekDayChecked) {
      let availableActivityNumber = [...activityData].filter((eachActivity) => eachActivity.district === "new_territories" && new Date(eachActivity.date).getDay() !== 0 && new Date(eachActivity.date).getDay() !== 6).length;
      let availableActivity = [...activityData].filter((eachActivity) => eachActivity.district === "new_territories" && new Date(eachActivity.date).getDay() !== 0 && new Date(eachActivity.date).getDay() !== 6);
      setNumberOfAvailableActivities(availableActivityNumber)
      console.log("--------------",availableActivity)
    }
    else if (isNTChecked && isWeekendChecked) {
      let availableActivityNumber = [...activityData].filter((eachActivity) => eachActivity.district === "new_territories" && new Date(eachActivity.date).getDay() !== 1 && new Date(eachActivity.date).getDay() !== 2 && new Date(eachActivity.date).getDay() !== 3 && new Date(eachActivity.date).getDay() !== 4 && new Date(eachActivity.date).getDay() !== 5).length;
      let availableActivity = [...activityData].filter((eachActivity) => eachActivity.district === "new_territories" && new Date(eachActivity.date).getDay() !== 1 && new Date(eachActivity.date).getDay() !== 2 && new Date(eachActivity.date).getDay() !== 3 && new Date(eachActivity.date).getDay() !== 4 && new Date(eachActivity.date).getDay() !== 5);
      setNumberOfAvailableActivities(availableActivityNumber)
      console.log("--------------",availableActivityNumber)
      console.log("--------------",availableActivity)
    }

  }, [isHKIslandChecked, isKowloonChecked, isNTChecked, isWeekDayChecked, isWeekendChecked])

/////////////////////////////// debug space ////////////////////////////////

let availableActivityNumber = [...activityData].filter((eachActivity) => eachActivity.district === "new_territories" && new Date(eachActivity.date).getDay() !== 1 && new Date(eachActivity.date).getDay() !== 2 && new Date(eachActivity.date).getDay() !== 3 && new Date(eachActivity.date).getDay() !== 4 && new Date(eachActivity.date).getDay() !== 5).length;

console.log('check =================================',availableActivityNumber)




  //////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleClickConfirmButton = () => {
    setIsFilterTriggered(false);
    setIsHKIslandChecked(false);
    setIsKowloonChecked(false);
    setIsNTChecked(false);
    setIsSearching(true);
    if (numberOfAvailableActivities === 0) {
      alert("請選擇地點及出席日子")
    }
    else if (isHKIslandChecked && isWeekDayChecked) {
      let activityToBeRendered = [...activityData].filter((eachActivity) => eachActivity.district === "hong_kong_island" && new Date(eachActivity.date).getDay() !== 0 && new Date(eachActivity.date).getDay() !== 6);
      setActivityDataForSearch(activityToBeRendered)
    }
    else if (isHKIslandChecked && isWeekendChecked) {
      let activityToBeRendered = [...activityData].filter((eachActivity) => eachActivity.district === "hong_kong_island" && new Date(eachActivity.date).getDay() !== 1 && new Date(eachActivity.date).getDay() !== 2 && new Date(eachActivity.date).getDay() !== 3 && new Date(eachActivity.date).getDay() !== 4 && new Date(eachActivity.date).getDay() !== 5);
      setActivityDataForSearch(activityToBeRendered)
    }
    else if (isKowloonChecked && isWeekDayChecked) {
      let activityToBeRendered = [...activityData].filter((eachActivity) => eachActivity.district === "kowloon" && new Date(eachActivity.date).getDay() !== 0 && new Date(eachActivity.date).getDay() !== 6);
      setActivityDataForSearch(activityToBeRendered)
    }
    else if (isKowloonChecked && isWeekendChecked) {
      let activityToBeRendered = [...activityData].filter((eachActivity) => eachActivity.district === "kowloon" && new Date(eachActivity.date).getDay() !== 1 && new Date(eachActivity.date).getDay() !== 2 && new Date(eachActivity.date).getDay() !== 3 && new Date(eachActivity.date).getDay() !== 4 && new Date(eachActivity.date).getDay() !== 5);
      setActivityDataForSearch(activityToBeRendered)
    }
    else if (isNTChecked && isWeekDayChecked) {
      let activityToBeRendered = [...activityData].filter((eachActivity) => eachActivity.district === "new_territories" && new Date(eachActivity.date).getDay() !== 0 && new Date(eachActivity.date).getDay() !== 6);
      setActivityDataForSearch(activityToBeRendered)
    }
    else if(isNTChecked && isWeekendChecked) {
      let activityToBeRendered = [...activityData].filter((eachActivity) => eachActivity.district === "new_territories" && new Date(eachActivity.date).getDay() !== 1 && new Date(eachActivity.date).getDay() !== 2 && new Date(eachActivity.date).getDay() !== 3 && new Date(eachActivity.date).getDay() !== 4 && new Date(eachActivity.date).getDay() !== 5);
      setActivityDataForSearch(activityToBeRendered)
    }

  };

  const handleClickClearAll = () => {
    setIsHKIslandChecked(false);
    setIsKowloonChecked(false);
    setIsNTChecked(false);
    setIsWeekDayChecked(false);
    setIsWeekendChecked(false);
    setNumberOfAvailableActivities(0);
  };

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

  }, []);
  const [pageCategory, setPageCategory] = useState(PageCategory.all);

  ///////////////////////////////// 探索義工機會部分 search bar function ////////////////////
  useEffect(() => {
    // console.log("what is the activity now? : ",activityDataForSearch)
    let clonedActivityData = [...activityData];
    let filterActivityData = clonedActivityData.filter(
      (eachActivityData) =>
        eachActivityData.organisation.toLowerCase().slice(0, search!.length) === search ||
        eachActivityData.organisation.toLowerCase().includes(search!) ||
        eachActivityData.organisation.toLowerCase()[0] === search![0] ||
        eachActivityData.activity.toLowerCase().slice(0, search!.length) === search ||
        eachActivityData.activity.toLowerCase().includes(search!) ||
        eachActivityData.activity.toLowerCase().includes(search!) ||
        eachActivityData.activity.toLowerCase()[0] === search![0] ||
        eachActivityData.location.toLowerCase().includes(search!)
    );
    setActivityDataForSearch(filterActivityData);
  }, [search]);



  ////////////////////////////////////////////////////////////////////////////////////////

  // const pageCategory = useRef<PageCategory>(PageCategory.all);
  useEffect(() => {
    if (params.get("category") === PageCategory.editorsChoice || params.get("category") === PageCategory.urgent || params.get("category") === PageCategory.popular) {
      setPageCategory(params.get("category") as PageCategory);
    }
  }, [params.get("category")]);

  const getActivities = async ({ queryKey }: { queryKey: any }) => {
    const [_key, { category }] = queryKey;
    if (category === PageCategory.editorsChoice || category === PageCategory.urgent || category === PageCategory.popular) {
      const categorisedResult = await getActivitiesByCategory(category);
      return categorisedResult;
    } else {
      const allResult = await getAllActivities();
      return allResult;
    }
  };

  const { isError, data, error, isLoading } = useQuery({
    queryKey: ["activity", { category: params.get("category") }],
    queryFn: getActivities,
    refetchInterval: 5_000,
    staleTime: 10_000,
    retry: 1,
  });

  // const pageCategory = useRef<PageCategory>(PageCategory.all);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (params.get("category") === PageCategory.editorsChoice || params.get("category") === PageCategory.urgent || params.get("category") === PageCategory.popular) {
      setPageCategory(params.get("category") as PageCategory);
    } else {
      setPageCategory(PageCategory.all);
    }
  }, [params.get("category")]);
  // if (params.get("category") === PageCategory.editorsChoice || params.get("category") === PageCategory.urgent || params.get("category") === PageCategory.popular) {
  //   setPageCategory(params.get("category") as PageCategory);
  // }



  if (data && data !== activityData
    && !isSearching
  ) {
    console.log("fetched data from DB:", data);
    setActivityData(data!);
    setActivityDataForSearch(data!);
    // console.log("new data stored into Activity Data");
  }



  // console.log("activity to be render: ", activityDataForSearch)
  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

      <div className={styles.upperPart}>
        <div className={styles.chevronAndAdjustmntIcon}>
          {pageCategory !== PageCategory.all && <HiChevronLeft className={styles.backIcon} onClick={() => navigate(-1)} />}
          {!isFilterTriggered && (
            <Input.Wrapper>
              <Input
                style={pageCategory === PageCategory.all ? { marginLeft: 50 } : undefined}
                type="search"
                className={styles.searchContainer}
                icon={<HiSearch className={styles.searchIcon} />}
                placeholder="搜尋關鍵字"
                onChange={(e) => {
                  searching(e.target.value);
                }}
              />
            </Input.Wrapper>
          )}
          {!isFilterTriggered && (
            <div className={styles.adjustmentFilterIconContainer}>
              <HiOutlineAdjustments className={styles.adjustmentFilterIcon} onClick={() => handleGoToFilter()} />
            </div>
          )}
        </div>
      </div>

      {/* <div className={styles.searchBarPart}>
          <TextInput className={styles.searchBar} icon={<IconSearch size={30} stroke={1.5} className={styles.iconSearch} />} radius="xl" size="xl" placeholder="尋找關鍵字" rightSectionWidth={42} />
        </div> */}
      {/* <div className={styles.filter}>
          <Filter className={styles.filterIcon} />
        </div> */}
      {/* <div className={styles.bottomPart}> */}
      {/* <div className={styles.headerContainer}>
          {pageCategory === PageCategory.all && <div className={styles.header}>探索義工機會</div>}
          {params.get("category") === PageCategory.editorsChoice && <div className={styles.header}>Petscue 推介</div>}
          {params.get("category") === PageCategory.urgent && <div className={styles.header}>急需支援</div>}
          {params.get("category") === PageCategory.popular && <div className={styles.header}>熱門活動</div>}
        </div> */}

      <div className={styles.bottomPart}>
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
            onCheckWeekDay={() => handleClickWeekDay()}
            onCheckWeekend={() => handleClickWeekend()}
            isWeekDayChecked={isWeekDayChecked}
            isWeekendChecked={isWeekendChecked}


            onConfirm={() => {
              handleClickConfirmButton();
            }}
            numberOfAvailableActivities={numberOfAvailableActivities}
            onClearAll={() => handleClickClearAll()}
          />
        ) : (
          <>
            <div className={styles.headerContainer}>
              {pageCategory === PageCategory.all && <div className={styles.header}>探索義工機會</div>}
              {params.get("category") === PageCategory.editorsChoice && <div className={styles.header}>Petscue 推介</div>}
              {params.get("category") === PageCategory.urgent && <div className={styles.header}>急需支援</div>}
              {params.get("category") === PageCategory.popular && <div className={styles.header}>熱門活動</div>}
            </div>

            {activityDataForSearch?.map((activity) => (
              <Activity key={activity.activity_id} activity={activity} clickHandler={() => navigate(`/activity/detail?id=${activity.activity_id}`)} />
            ))}
          </>
        )}
      </div>
      <NewNavbar activeBtn={pageCategory === PageCategory.all ? "search" : "home"} />
    </>
  );
}
