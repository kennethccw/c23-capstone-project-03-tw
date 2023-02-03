import { MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import LineChart from "../../components/LineChart";
import { OrganisationNavbar } from "../../components/NavBarforOrganisation";
import styles from "../../css/allActivitiesPage.module.scss";
interface Data {
  id: number;
  month: string;
  partcipants: number;
}

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    setData(  [{
      "id": 1,
      "month": "December",
      "partcipants": 0,
    },
    {
      "id": 2,
      "month": "January",
      "partcipants": 0,
    },
    {
      "id": 3,
      "month": "February",
      "partcipants": 150,
    },
    {
      "id": 4,
      "month": "March",
      "partcipants": 0,
    },
    {
      "id": 5,
      "month": "April",
      "partcipants": 0,
    }]
  
  )
  }, []);

  return (
    <MantineProvider>
      <div>


          <div className={styles.chevronAndAdjustmntIcon}>
            <HiChevronLeft
              className={styles.chevronIcon}
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
          

      <div className={styles.searchChance}>義工報告</div>
      <hr className={styles.hrStyle}></hr>
      
      <div className={styles.monthlyParticipants}>
      <div>每月參與義工活動的人數</div>
      <LineChart
        chartData={{
          labels: data.map((d) => d.month),
          datasets: [
            {
              label: "義工人數(每月)",
              data: data.map((d) => d.partcipants),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(53, 162, 235)',
              borderWidth: 1,
            },
          ],
        }}
        />
        </div>

      <OrganisationNavbar />
    </div>
        </MantineProvider>
  );
}

export default Dashboard;