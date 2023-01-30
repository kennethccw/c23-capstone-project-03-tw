import styles from "../css/categorisedActivities.module.scss";
import { ChevronLeft, Filter } from "react-bootstrap-icons";
import { Input, LoadingOverlay, TextInput } from "@mantine/core"; //https://ui.mantine.dev/category/inputs
import { IconSearch } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { Activity } from "../components/ActivitiesUtilis";
import NewNavbar from "../components/NewNavbar";
import { useQuery } from "react-query";
import { getActivitiesByCategory, getAllActivities } from "../api/activityAPI";
import { useEffect, useRef } from "react";
import { HiChevronLeft, HiOutlineAdjustments, HiSearch } from "react-icons/hi";

export default function CategorisedActivities() {
  const navigate = useNavigate();
  const params = new URLSearchParams(document.location.search);

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
  });

  console.log(data);

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

      <div className={styles.upperPart}>
        <div className={styles.chevronAndAdjustmntIcon}>
          <HiChevronLeft className={styles.backIcon} onClick={() => navigate(-1)} />
          <Input.Wrapper>
            <Input type="search" className={styles.searchContainer} icon={<HiSearch className={styles.searchIcon} />} placeholder="搜尋關鍵字" />
          </Input.Wrapper>
          <div className={styles.adjustmentFilterIconContainer}>
            <HiOutlineAdjustments className={styles.adjustmentFilterIcon} />
          </div>
        </div>
        {/* <div className={styles.searchBarPart}>
          <TextInput className={styles.searchBar} icon={<IconSearch size={30} stroke={1.5} className={styles.iconSearch} />} radius="xl" size="xl" placeholder="尋找關鍵字" rightSectionWidth={42} />
        </div> */}
        {/* <div className={styles.filter}>
          <Filter className={styles.filterIcon} />
        </div> */}
      </div>
      <div className={styles.bottomPart}>
        <div className={styles.headerContainer}>
          {pageCategory.current === PageCategory.all && <div className={styles.header}>探索義工機會</div>}
          {params.get("category") === PageCategory.editorsChoice && <div className={styles.header}>Petscue 推介</div>}
          {params.get("category") === PageCategory.urgent && <div className={styles.header}>急需支援</div>}
          {params.get("category") === PageCategory.popular && <div className={styles.header}>熱門活動</div>}
        </div>

        {data?.map((activity) => (
          <Activity key={activity.activity_id} activity={activity} clickHandler={() => navigate(`/activity/detail?id=${activity.activity_id}`)} />
        ))}
      </div>
      {<NewNavbar activeBtn={pageCategory.current === PageCategory.all ? "search" : "home"} />}
    </>
  );
}
