import { NavBarUtilis } from "../components/NavBarUtilis";
import styles from "../css/allActivitiesPage.module.scss";
import { ChevronLeft, Filter } from "react-bootstrap-icons";
import { TextInput } from "@mantine/core"; //https://ui.mantine.dev/category/inputs
import { IconSearch } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { Activity } from "../components/ActivitiesCategorisedUtilis";

export default function AllActivities() {
  const NavBar = NavBarUtilis();
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.upperPart}>
        <div className={styles.leftArrow}>
          <ChevronLeft
            className={styles.leftArrowIcon}
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className={styles.searchBarPart}>
          <TextInput className={styles.searchBar} icon={<IconSearch size={30} stroke={1.5} className={styles.iconSearch} />} radius="xl" size="xl" placeholder="尋找關鍵字" rightSectionWidth={42} />
        </div>
        <div className={styles.filter}>
          <Filter className={styles.filterIcon} />
        </div>
      </div>

      <div className={styles.searchChance}>探索義工機會</div>

      {/* <Activity/> */}

      {NavBar}
    </div>
  );
}
