import styles from "../css/categorisedActivities.module.scss";
import { ChevronLeft, Filter } from "react-bootstrap-icons";
import { Input, LoadingOverlay, TextInput } from "@mantine/core"; //https://ui.mantine.dev/category/inputs
import { IconSearch } from "@tabler/icons";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Activity } from "../components/ActivitiesUtilis";
import NewNavbar from "../components/NewNavbar";
import { useQuery, useQueryClient, QueryKey } from "react-query";
import { getActivitiesByCategory, getAllActivities } from "../api/activityAPI";
import { useEffect, useMemo, useRef, useState } from "react";
import { HiChevronLeft, HiOutlineAdjustments, HiSearch } from "react-icons/hi";

export default function CategorisedActivities() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

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
    return () => {
      <></>;
    };
  }, []);

  const [pageCategory, setPageCategory] = useState(PageCategory.all);

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

  console.log(data);

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

      <div className={styles.upperPart}>
        <div className={styles.chevronAndAdjustmntIcon}>
          {pageCategory !== PageCategory.all && <HiChevronLeft className={styles.backIcon} onClick={() => navigate(-1)} />}
          <Input.Wrapper>
            <Input
              style={pageCategory === PageCategory.all ? { marginLeft: 50 } : undefined}
              type="search"
              className={styles.searchContainer}
              icon={<HiSearch className={styles.searchIcon} />}
              placeholder="搜尋關鍵字"
            />
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
          {pageCategory === PageCategory.all && <div className={styles.header}>探索義工機會</div>}
          {params.get("category") === PageCategory.editorsChoice && <div className={styles.header}>Petscue 推介</div>}
          {params.get("category") === PageCategory.urgent && <div className={styles.header}>急需支援</div>}
          {params.get("category") === PageCategory.popular && <div className={styles.header}>熱門活動</div>}
        </div>

        {data?.map((activity) => (
          <Activity key={activity.activity_id} activity={activity} clickHandler={() => navigate(`/activity/detail?id=${activity.activity_id}`)} />
        ))}
      </div>
      {<NewNavbar activeBtn={pageCategory === PageCategory.all ? "search" : "home"} />}
    </>
  );
}
