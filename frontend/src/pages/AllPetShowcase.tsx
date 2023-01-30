import { useNavigate } from "react-router-dom";
import styles from "../css/searchResult.module.scss";
import {
  HiChevronLeft,
  HiSearch,
} from "react-icons/hi";
import {
  MantineProvider,
  Input,
  LoadingOverlay,
} from "@mantine/core";
import NewNavbar from "../components/NewNavbar";
import { AnimalShow } from "../components/AnimationSlideShowComponent";
import { getAllPetAdoption } from "../api/adoptionAPI";
import {useQuery} from 'react-query'


export default function AllPetShowcase() {
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery({ // react query - customised hook 
    queryKey: ["adoption"],
    queryFn: getAllPetAdoption, // API
    refetchInterval: 5_000,
    // staleTime: 10_000,
    retry: 1,
  });
  console.log(data)
  return (
    <MantineProvider
      theme={{
        colors: {
          ocean: [
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
          ],
        },
      }}
    >
      <div className={styles.containerForAll}>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <div className={styles.headNavBar}>
          <div className={styles.chevronAndAdjustmntIcon}>
            <HiChevronLeft className={styles.chevronIcon} />

            <Input.Wrapper>
              <Input type="search" className={styles.searchContainer} icon={<HiSearch className={styles.searchIcon} />} placeholder="搜尋關鍵字" />
            </Input.Wrapper>
          </div>
        </div>

        <div className={styles.headerContainer}>
          <span className={styles.organisationTab}>動物領養</span>
        </div>
        <hr className={styles.adoptionDetailHr} />

        {data?.map((pet) => <AnimalShow key={pet.pet_id} pet={pet} clickHandler={() => navigate(`/adoption/detail?id=${pet.pet_id}`)}/>)}
    
      </div>

<NewNavbar activeBtn="search" />
    </MantineProvider>
  );
}
