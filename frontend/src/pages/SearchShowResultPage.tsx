import styles from "../css/searchResult.module.scss";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft, HiSearch } from "react-icons/hi";
import NewNavbar from "../components/NewNavbar";
import { Input } from "@mantine/core";

export default function SearchResultFuction() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.headNavBar}>
        <div className={styles.chevronAndAdjustmntIcon}>
          <HiChevronLeft className={styles.chevronIcon} />

          <Input.Wrapper>
            <Input type="search" className={styles.searchContainer} icon={<HiSearch className={styles.searchIcon} />} placeholder="搜尋關鍵字" />
          </Input.Wrapper>
        </div>
      </div>
      <div className={styles.volunterOpportunity}>義工機會</div>

      <div className={styles.activityContaner}>
        <div className={styles.activityTab}>美容義工</div>
        <div className={styles.activitycontent}>香港領養動物中心</div>
      </div>

      <hr className={styles.lineTab}></hr>

      <div className={styles.activityContaner}>
        <div className={styles.activityTab}>美容義工</div>
        <div className={styles.activitycontent}>香港領養動物中心</div>
      </div>

      <hr className={styles.lineTab}></hr>

      <NewNavbar activeBtn="search" />
    </div>
  );
}
