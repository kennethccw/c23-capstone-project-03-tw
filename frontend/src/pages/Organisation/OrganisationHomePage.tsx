import { OrganisationNavbar } from "../../components/NavBarforOrganisation";
import { useNavigate } from "react-router-dom";
import styles from "../../css/organisationNavbar.module.scss";
import { Button, MantineProvider } from "@mantine/core";

export default function OrganisationHomePageContainer() {
  const navigate = useNavigate();
  const organisationName = localStorage.getItem("username")





  return (

    <>
      <div className={styles.topPart}>
        <div className={styles.logoIconContainer}>
          <img src="/photos/logo_pic-09-09.png" className={styles.logoIcon}></img>
        </div>

        <div className={styles.greeting}>hello, {organisationName}</div></div>

      <MantineProvider
        theme={{
          colors: {
            blue: ["#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5"],
            ocean: ["#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED"],
          },
        }}
      >
        <div className={styles.buttonContainer}>
          <br></br>
          <br></br>
          <br></br>
          
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
            新增義工活動
          </Button>
          <Button style={{ width: 218, height: 55, color: "white", fontSize: 16, marginLeft: 0, marginTop: 30, borderRadius: 30, fontWeight: 700 }} color="ocean" onClick={() => { navigate("/support/panel") }}>
            即時拯救流浪動物
          </Button>
          <Button style={{ width: 218, height: 55, color: "white", fontSize: 16, marginLeft: 0, marginTop: 30, borderRadius: 30, fontWeight: 700 }} color="blue" onClick={() => { navigate("/organisationAdoption") }}>
            申請領養
          </Button>
          <Button
            style={{ width: 218, height: 55, color: "white", fontSize: 16, marginLeft: 0, marginTop: 30, borderRadius: 30, fontWeight: 700 }}
            color="ocean"
            onClick={() => {
              navigate("/editAnimals");
            }}
          >
            新增可領養的動物
          </Button>
        </div>
        <div className={styles.containerForAll}>
          <OrganisationNavbar />
        </div>
      </MantineProvider>
    </>
  );
}
