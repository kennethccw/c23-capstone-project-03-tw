import { OrganisationNavbar } from "../../components/NavBarforOrganisation";
import { useNavigate } from "react-router-dom";
import styles from "../../css/organisationNavbar.module.scss";
import { Button, MantineProvider } from "@mantine/core";

export default function OrganisationHomePageContainer() {
  const navigate = useNavigate();
  return (
    <MantineProvider
      theme={{
        colors: {
          blue: ["#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5"],
          ocean: ["#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED"],
        },
      }}
    >
      <div className={styles.buttonContainer}>
        <Button style={{ width: 218, height: 55, color: "white", fontSize: 16, marginLeft: 0, marginTop: 150, borderRadius: 30, fontWeight: 700 }} color="blue">
          義工報告
        </Button>
        <Button
          style={{ width: 218, height: 55, color: "white", fontSize: 16, marginLeft: 0, marginTop: 30, borderRadius: 30, fontWeight: 700 }}
          color="ocean"
          onClick={() => {
            navigate("/application");
          }}
        >
          義工活動批核
        </Button>
        <Button
          style={{ width: 218, height: 55, color: "white", fontSize: 16, marginLeft: 0, marginTop: 30, borderRadius: 30, fontWeight: 700 }}
          color="blue"
          onClick={() => {
            navigate("/editActivities");
          }}
        >
          義工活動
        </Button>
        <Button style={{ width: 218, height: 55, color: "white", fontSize: 16, marginLeft: 0, marginTop: 30, borderRadius: 30, fontWeight: 700 }} color="ocean">
          技術支援
        </Button>
        <Button style={{ width: 218, height: 55, color: "white", fontSize: 16, marginLeft: 0, marginTop: 30, borderRadius: 30, fontWeight: 700 }} color="blue">
          即時拯救流浪動物
        </Button>
        <Button style={{ width: 218, height: 55, color: "white", fontSize: 16, marginLeft: 0, marginTop: 30, borderRadius: 30, fontWeight: 700 }} color="ocean" onClick={()=>{ navigate("/organisationAdoption")}}>
          領養申請
        </Button>
        <Button
          style={{ width: 218, height: 55, color: "white", fontSize: 16, marginLeft: 0, marginTop: 30, borderRadius: 30, fontWeight: 700 }}
          color="blue"
          onClick={() => {
            navigate("/editAnimals");
          }}
        >
          更新流浪動物
        </Button>
      </div>
      <div className={styles.containerForAll}>
        <OrganisationNavbar />
      </div>
    </MantineProvider>
  );
}
