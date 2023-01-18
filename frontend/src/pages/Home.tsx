import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRootSelector } from "../redux/store";
import { NavBarUtilis } from "../components/NavBarUtilis";
import styles from "../css/homepage.module.scss";
import { Bell } from "react-bootstrap-icons";
import { Carousel } from '@mantine/carousel';


export default function Home() {
  const loading = useRootSelector((state: { auth: { loading: any; }; }) => state.auth.loading);
  const navigate = useNavigate();
  const logout = () => {
    console.log("logout");
    localStorage.clear();
    navigate("/");
  };
  const [username, setUsername] = useState(localStorage.getItem("username"));
  useEffect(() => {
    if (!loading) {
      setUsername(localStorage.getItem("username"));
    }
  }, [loading]);

  const NavBar = NavBarUtilis();



  return (
    <div>
      <div className={styles.upperLayer}>

        <div className={styles.logoIconContainer}><img src="photos/logo_pic-09-09.png" className={styles.logoIcon}></img></div>
        <div className={styles.bellIconContainer}><Bell className={styles.bellIcon} /></div>

      </div>

      <div className={styles.lowerPart}>

        <div className={styles.userName}>
          <div className={styles.greeting}>&nbsp;Hi Jason{username} !</div>
          <button onClick={() => logout()}>logout</button>
        </div>

        <div className={styles.carouselPart} >
          <Carousel mx="auto" withIndicators height={400}>
            <Carousel.Slide><img src="photos/carousel-02.png" className={styles.carouselPhoto}></img></Carousel.Slide>
            <Carousel.Slide><img src="photos/寵物美容義工.jpeg" className={styles.carouselPhoto}></img></Carousel.Slide>
            <Carousel.Slide><img src="photos/義工活動.jpeg" className={styles.carouselPhoto}></img></Carousel.Slide>
          </Carousel>
        </div>
        
        <div>
          <div></div>
          <div></div>
        </div>

      </div>



      {NavBar}
    </div>
  );
}
