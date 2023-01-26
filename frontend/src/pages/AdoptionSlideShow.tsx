import { useNavigate } from "react-router-dom";
import styles from "../css/searchResult.module.scss";
import {
  HiChevronLeft,
  HiOutlineShare,
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiCalendar,
  HiSearch,
} from "react-icons/hi";
import {
  MantineProvider,
  Tabs,
  Button,
  Checkbox,
  TextInput,
  Input,
} from "@mantine/core";
import { IconCamera, IconSearch, IconSend } from "@tabler/icons";
import { ChevronLeft } from "react-bootstrap-icons";
import NewNavbar from "../components/NewNavbar";
import { AnimalShow } from "../components/AnimationSlideShowComponent";

export default function AdoptionShowDetails() {
  const navigate = useNavigate();
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

        <AnimalShow />
        <AnimalShow />
        <AnimalShow />
        <AnimalShow />
    
      </div>

<NewNavbar activeBtn="search" />
    </MantineProvider>
  );
}
