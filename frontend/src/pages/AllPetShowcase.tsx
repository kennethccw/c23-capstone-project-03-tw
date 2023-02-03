import { useNavigate } from "react-router-dom";
import styles from "../css/searchResult.module.scss";
import { HiChevronLeft, HiSearch } from "react-icons/hi";
import { MantineProvider, Input, LoadingOverlay } from "@mantine/core";
import NewNavbar from "../components/NewNavbar";
import { AnimalShow } from "../components/AnimationSlideShowComponent";
import { getAllPetAdoption } from "../api/adoptionAPI";
import { useQuery } from "react-query";
import { PetPreview } from "../api/adoptionAPI";
import { useEffect, useRef, useState } from "react";
import { RiContrastDropLine } from "react-icons/ri";
import { valueGetters } from "@mantine/core/lib/Box/style-system-props/value-getters/value-getters";

export default function AllPetShowcase() {
  const navigate = useNavigate();

  const [petData, setPetData] = useState<PetPreview[]>([]); // this is to first store the fetched data
  const [petDataForSearch, setPetDataForSearch] = useState<PetPreview[]>([]); // this is to clone the petData for the storage of each time search result of the search bar. Even one change in the input value of search bar will restore the search result in petDataForSearch

  // console.log([petData, "the current petData state"])
  // console.log([petDataForSearch, "the current petDataForSearch state"])
  const [isSearching, setIsSearching] = useState<boolean>(false); // this is to identify whether the user is searching or not. If searching, isSearching state becomes true and it is the "signal" to prevent the ongoing storage of fetched data into petData
  const [search, setSearch] = useState<string | null>(""); // to store the current state of the search bar input value
  // console.log('the current searching record (also the search state) is', search)
  // if (isSearching) { console.log("searching now") }
  // else { console.log("you are not searching now") }

  const searching = (searchValue: string) => {
    // step 4: triggered by the typing of search word, even one input character will trigger the searching of the required information in the cloned petData
    if (searchValue.trim() === "") {
      setIsSearching(false);
      setSearch("");
      setPetData([...petData]);
      console.log("searchState: ", search);
    }

    if (searchValue.trim() !== "") {
      setIsSearching(true);
      setSearch(searchValue.toLowerCase().trim());
    }
  };

  useEffect(() => {
    // step 6: after the change of search is confirmed (which means we confirm the value in the current search state is exactly the same as out text input), do the filtering actio by cloning and filtering the petData. The filtered item is then stored in petDataForSearch and rendered in UI
    let clonedPetData = [...petData];
    let filterPetData = clonedPetData.filter(
      (eachPetData) =>
        eachPetData.name.toLowerCase().slice(0, search!.length) === search ||
        eachPetData.name.toLowerCase().includes(search!) ||
        eachPetData.name.toLowerCase()[0] === search![0] ||
        eachPetData.age.toString().slice(0, search!.length) === search
    );
    setPetDataForSearch(filterPetData);
    // console.log("finally filter the required data and start to render again")
  }, [search]);

  const { isLoading, isError, data, error } = useQuery({
    // react query - customised hook
    queryKey: ["adoption"],
    queryFn: getAllPetAdoption, // API
    refetchInterval: 5_000,
    staleTime: 10_000,
    retry: 1,
  });
  // console.log(data, 'fetched data from database')
  // console.log('is searching?', isSearching)

  if (data && data !== petData && !isSearching) {
    // step 1: to ensure fetched data is 1) successfully collected and 2) without being the same as the petData value, 3) under the condition of not doing searching (which means no texts in the search bar)
    setPetData(data!); // step 2: this is to store the fetched data into petData (this storing action only does one time for the ongoing same value of the fetched data to prevent petData from updating and updating). However, the main function of petData is to act as a 'reference' being cloned by petDataForSearch => any changing in petDataForSearch (used to render the UI) will not affect the value of petData.
    setPetDataForSearch(data!); // step 3: as we use petDataForSearch to render the animals information, this line helps store the fetched data in petDataForSearch for the beginning rendering (you can see that nothing will be rendered if just use the initial state of petDataForSearch)
    // console.log("new data fetched to petData and setPetDataForSearch (which is for searching usage)!!")
  }

  return (
    <MantineProvider
      theme={{
        colors: {
          ocean: ["#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93"],
        },
      }}
    >
      <div className={styles.containerForAll}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <div className={styles.headNavBar}>
          <div className={styles.chevronAndAdjustmntIcon}>
            <HiChevronLeft
              className={styles.chevronIcon}
              onClick={() => {
                navigate(-1);
              }}
            />

            <Input.Wrapper>
              <Input
                type="search"
                onChange={(e) => {
                  searching(e.target.value);
                }}
                className={styles.searchContainer}
                icon={<HiSearch className={styles.searchIcon} />}
                placeholder="搜尋關鍵字"
              />
            </Input.Wrapper>
          </div>
        </div>

        <div className={styles.headerContainer}>
          <span className={styles.organisationTab}>動物領養</span>
        </div>
        <hr className={styles.adoptionDetailHr} />

        {petDataForSearch?.map((pet) => (
          <AnimalShow key={pet.pet_id} pet={pet} clickHandler={() => navigate(`/adoption/detail?id=${pet.pet_id}`)} />
        ))}
      </div>

      <NewNavbar activeBtn="search" />
    </MantineProvider>
  );
}
