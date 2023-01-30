import { useNavigate } from "react-router-dom";
import styles from "../css/searchResult.module.scss";
import { HiChevronLeft, HiOutlineAdjustments, HiSearch } from "react-icons/hi";
import { MantineProvider, Input, LoadingOverlay } from "@mantine/core";
import NewNavbar from "../components/NewNavbar";
import { AnimalShow } from "../components/AnimationSlideShowComponent";
import { getAllPetAdoption } from "../api/adoptionAPI";
import { useQuery } from "react-query";
import { useEffect } from "react";

export default function AllPetShowcase() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isLoading, isError, data, error } = useQuery({
    // react query - customised hook
    queryKey: ["adoption"],
    queryFn: getAllPetAdoption, // API
    refetchInterval: 5_000,
    // staleTime: 10_000,
    retry: 1,
  });
  console.log(data);
  return (
    <MantineProvider
      theme={{
        colors: {
          ocean: ["#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93"],
        },
      }}
    >
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
      </div>
      <div className={styles.bottomPart}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        {/* <div className={styles.searchBarPart}>
          <TextInput className={styles.searchBar} icon={<IconSearch size={30} stroke={1.5} className={styles.iconSearch} />} radius="xl" size="xl" placeholder="尋找關鍵字" rightSectionWidth={42} />
        </div> */}
        {/* <div className={styles.filter}>
          <Filter className={styles.filterIcon} />
        </div> */}

        <div className={styles.headerContainer}>
          <h1 className={styles.organisationTab}>動物領養</h1>
        </div>
        {/* <hr className={styles.adoptionDetailHr} /> */}

        {data?.map((pet) => (
          <AnimalShow key={pet.pet_id} pet={pet} clickHandler={() => navigate(`/adoption/detail?id=${pet.pet_id}`)} />
        ))}
      </div>

      <NewNavbar activeBtn="home" />
    </MantineProvider>
  );
}
