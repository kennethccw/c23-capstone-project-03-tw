import { useNavigate } from "react-router-dom";
import styles from "../css/searchResult.module.scss";
import { HiChevronLeft, HiSearch } from "react-icons/hi";
import { MantineProvider, Input, LoadingOverlay } from "@mantine/core";
import NewNavbar from "../components/NewNavbar";
import { PetDetailsComponent } from "../components/PetDetailsComponent";
import { getPetAdoptionById } from "../api/adoptionAPI";
import { useQuery } from "react-query";

export default function PetDetails() {
  const navigate = useNavigate();
  const params = new URLSearchParams(document.location.search);
  const getPetAdoptionByIdNoParam = async () => {
    const data = await getPetAdoptionById(params.get("id")!);
    return data;
  };
  const { isLoading, isError, data, error } = useQuery({
    // react query - customised hook
    queryKey: ["adoption/detail"],
    queryFn: getPetAdoptionByIdNoParam, // API
    // refetchInterval: 5_000,
    // staleTime: 10_000,
    // retry: 1,
  });

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
            <HiChevronLeft className={styles.chevronIcon} onClick={() => {
              navigate(-1);
            }}/>

            {/* <Input.Wrapper>
              <Input
                type="search"
                className={styles.searchContainer}
                icon={<HiSearch className={styles.searchIcon} />}
                placeholder="搜尋關鍵字"
              />
            </Input.Wrapper> */}
          </div>
        </div>
        <div className={styles.headerContainer}>
          <span className={styles.organisationTab}>動物領養</span>
        </div>
        {/* <hr className={styles.adoptionDetailHr} /> */}

       {data && <PetDetailsComponent pet={data!} clickHandler={() => navigate(`/adoption/application?id=${data?.pet_id}`)} />}
      </div>

      <NewNavbar activeBtn="search" />
    </MantineProvider>
  );
}
