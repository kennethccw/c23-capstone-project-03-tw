import { OrganisationFilter } from "../components/OrganisationFilterComponent";
import { useNavigate } from "react-router-dom";
import styles from "../css/organisationMoreDetails.module.scss";
import {
  HiChevronLeft,
  HiOutlineShare,
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";
import { MantineProvider, Tabs, Button } from "@mantine/core";
import { sizes } from "@mantine/core/lib/ActionIcon/ActionIcon.styles";

export default function OrganisationMoreDetails() {
  const navigate = useNavigate();
  return (
    <MantineProvider
      theme={{
        colors: {
          ocean: [
            "#585CE5",
            "#585CE5",
            "#585CE5",
            "#585CE5",
            "#585CE5",
            "#585CE5",
            "#585CE5",
            "#585CE5",
            "#585CE5",
            "#585CE5",
          ],
          "milkTea": [
            "#ECE7DD",
            "#ECE7DD",
            "#ECE7DD",
            "#ECE7DD",
            "#ECE7DD",
            "#ECE7DD",
            "#ECE7DD",
            "#ECE7DD",
            "#ECE7DD",
            "#ECE7DD",
          ],
        },
      }}
    >
      <div>
        <div className={styles.chevronAndAdjustmntIcon}>
          <HiChevronLeft className={styles.chevronIcon} />
          <HiOutlineShare className={styles.outlineShare} />
        </div>

        <Tabs defaultValue="基本資料" color="ocean" className={styles.tabList}>
          <Tabs.List grow>
            <Tabs.Tab value="基本資料">基本資料</Tabs.Tab>
            <Tabs.Tab value="義工機會">義工機會</Tabs.Tab>
            <Tabs.Tab value="查詢">查詢</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <div className={styles.detailsContainer}>
          <div className={styles.basicInfo}>基本資料</div>

          <div className={styles.organisationTabContainer}>
            <div className={styles.square}></div>
            <div className={styles.organisationName}>香港動物群益會</div>
          </div>

          <div className={styles.addressNameDetails}>
            <HiOutlineLocationMarker className={styles.locationIcon} />
            <div className={styles.locationName}>香港灣仔駱克道三號</div>
          </div>
        </div>

        <hr className={styles.hrStylist} />
        <Button style={{ width: 390, height: 58, color: "black", fontSize: 19, margin: 20, }} color="milkTea"> 義工機會</Button>
        <hr className={styles.hrStylist} />

        <div className={styles.detailsContainer}>
          <div className={styles.basicInfo}>查詢</div>
          
          <div className={styles.inquiryContainer}>
            <HiOutlineMail className={styles.inquiryIcon} /> 
            <>25272527</>
          </div>
          
          <div className={styles.inquiryContainer}>
            <HiOutlinePhone className={styles.inquiryIcon} />
            <>hkaca@gmail.com</>
          </div>
        
        </div>

      </div>
    </MantineProvider>
  );
}
