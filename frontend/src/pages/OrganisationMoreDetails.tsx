import { OrganisationFilter } from "../components/OrganisationFilterComponent";
import { useNavigate } from "react-router-dom";
import styles from "../css/organisationMoreDetails.module.scss";
import { HiChevronLeft, HiOutlineShare, HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import { MantineProvider, Tabs, Button, LoadingOverlay } from "@mantine/core";
import { sizes } from "@mantine/core/lib/ActionIcon/ActionIcon.styles";
import { useQuery } from "react-query";
import { getOrganisationDetail } from "../api/organisationAPI";

export default function OrganisationMoreDetails() {
  const navigate = useNavigate();
  const params = new URLSearchParams(document.location.search);
  const id: number = parseInt(params.get("id")!);
  const getOrganisationDetailNoParam = () => {
    const res = getOrganisationDetail(id);
    return res;
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["organisation/detail"],
    queryFn: getOrganisationDetailNoParam,
    // refetchInterval: 5_000,
    // staleTime: 10_000,
    // retry: 1,
  });

  const imgPath = "/photos/organisation";

  return (
    <MantineProvider
      theme={{
        colors: {
          ocean: ["#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5"],
          milkTea: ["#ECE7DD", "#ECE7DD", "#ECE7DD", "#ECE7DD", "#ECE7DD", "#ECE7DD", "#ECE7DD", "#ECE7DD", "#ECE7DD", "#ECE7DD"],
        },
      }}
    >
      <div className={styles.containerForAll}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />

        <div className={styles.chevronAndAdjustmntIcon}>
          <HiChevronLeft className={styles.chevronIcon} onClick={() => navigate(-1)} />
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
            <img className={styles.square} src={imgPath + "/" + data?.logo}></img>
            <div className={styles.organisationName}>{data?.name}</div>
          </div>

          <div className={styles.addressNameDetails}>
            <HiOutlineLocationMarker className={styles.locationIcon} />
            <div className={styles.locationName}>{data?.address}</div>
          </div>
        </div>

        <hr className={styles.hrStylist} />
        <div className={styles.choiceBtnContainer}>
          <Button className={styles.choice} color="milkTea">
            {" "}
            義工機會
          </Button>
        </div>
        <hr className={styles.hrStylist} />

        <div className={styles.detailsContainer}>
          <div className={styles.basicInfo}>查詢</div>

          <div className={styles.inquiryContainer}>
            <HiOutlineMail className={styles.inquiryIcon} />
            <>{data?.mobile}</>
          </div>

          <div className={styles.inquiryContainer}>
            <HiOutlinePhone className={styles.inquiryIcon} />
            <>{data?.email}</>
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}
