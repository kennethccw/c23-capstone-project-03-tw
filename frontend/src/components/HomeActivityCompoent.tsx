import { Carousel } from "@mantine/carousel";
import { Calendar4, Person } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import styles from "../css/home2.module.scss";
import { HomeActivity } from "../redux/home";

export function HomeActivityComponent(props: { activity: HomeActivity }) {
  const startTime = new Date(props.activity.start_time);
  const startMonth = startTime.getMonth() + 1;
  const startDate = startTime.getDate();
  const endTime = new Date(props.activity.end_time);
  const endMonth = endTime.getMonth() + 1;
  const endDate = endTime.getDate();
  const navigate = useNavigate();
  return (
    <Carousel.Slide className={styles.carouselSlide}>
      <div className={styles.box} onClick={() => navigate(`/activity/detail?id=${props.activity.id}`)}>
        <img src={`/photos/activities/${props.activity.image}`} className={styles.recommendInstancePhoto}></img>
        <div className={styles.remainingPlace}>
          <Person /> 剩餘名額 <span>{props.activity.remaining_place}</span>
        </div>
        <div className={styles.recommendInstanceDetails}>
          <div className={styles.volunteerWord}>{props.activity.name}</div>
          <div className={styles.dateDetail}>
            <Calendar4 className={styles.calendarIcon} />
            {startMonth === endMonth && startDate === endDate ? (
              <>
                &nbsp;<span>{startMonth}</span>月<span>{startDate}</span>日
              </>
            ) : (
              <>
                &nbsp;<span>{startMonth}</span>月<span>{startDate}</span>日-<span>{endMonth}</span>月<span>{endDate}</span>日
              </>
            )}
          </div>
        </div>
      </div>
    </Carousel.Slide>
  );
}
