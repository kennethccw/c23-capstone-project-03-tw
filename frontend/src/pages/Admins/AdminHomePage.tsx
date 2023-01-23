import { OrganisationNavbar } from "../../components/NavBarforOrganisation";
import { useNavigate } from "react-router-dom";
import styles from "../../css/organisationNavbar.module.scss";
import { Button, MantineProvider } from '@mantine/core';

export default function OrganisationHomePageContainer() {
  const navigate = useNavigate();
  return (
    <MantineProvider
      theme={{
        colors: {
          "blue": ["#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5", "#585CE5"],
          "ocean": ["#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED", "#A7A0ED"],
        },
      }}
    >
    <div>
      <Button style={{ width: 218, height: 55, color: "white", fontSize: 16, marginLeft: 100, marginTop: 350, borderRadius: 30, fontWeight: 700}} color="blue">
        義工報告
      </Button>

      <div className={styles.containerForAll}>
        <OrganisationNavbar />
      </div>
    </div>
    </MantineProvider>
  );
}
