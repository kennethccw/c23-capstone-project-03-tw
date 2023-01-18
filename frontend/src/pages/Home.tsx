import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRootSelector } from "../redux/store";
import { NavBarUtilis } from "../components/NavBarUtilis";
import styles from "../css/homepage.module.scss";
import { Bell, ChevronRight, Person, Calendar4, Building } from "react-bootstrap-icons";
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
          <Carousel withIndicators height={300} withControls={false} className={styles.chevron}>
            <Carousel.Slide><img src="photos/carousel-02.png" className={styles.carouselPhoto}></img></Carousel.Slide>
            <Carousel.Slide><img src="photos/寵物美容義工.jpeg" className={styles.carouselPhoto}></img></Carousel.Slide>
            <Carousel.Slide><img src="photos/義工活動.jpeg" className={styles.carouselPhoto}></img></Carousel.Slide>
          </Carousel>
        </div>

        <br></br>

        <div className={styles.socialWorkRecommendContainer}>
          <div className={styles.socialRecommendBar}>
            <div className={styles.socialWorkRecommendWord}>&nbsp;&nbsp;社職推介</div>
            <div className={styles.chevronBarIcon}><ChevronRight /></div>
          </div>

          <br></br>

          <div className={styles.recommendInstance}>
            <div>
              <div className={styles.recommendInstancePart}>
                <Carousel slideSize="70%" height={350} align="start" slideGap="md" controlSize={33} loop withControls={false} >

                  <Carousel.Slide className={styles.recommendInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.recommendInstancePhoto}></img>
                      <div className={styles.remainingPlace}><Person /> 剩餘名額 <span>2</span></div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>Marketing義工</div>
                        <div className={styles.dateDetail}><Calendar4 />&nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日</div>
                      </div>
                    </div>

                  </Carousel.Slide>
                  <Carousel.Slide className={styles.recommendInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.recommendInstancePhoto}></img>
                      <div className={styles.remainingPlace}><Person /> 剩餘名額 <span>2</span></div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>Marketing義工</div>
                        <div className={styles.dateDetail}><Calendar4 />&nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日</div>
                      </div>
                    </div>

                  </Carousel.Slide>
                  <Carousel.Slide className={styles.recommendInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.recommendInstancePhoto}></img>
                      <div className={styles.remainingPlace}><Person /> 剩餘名額 <span>2</span></div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>Marketing義工</div>
                        <div className={styles.dateDetail}><Calendar4 />&nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日</div>
                      </div>
                    </div>

                  </Carousel.Slide>
                </Carousel>
              </div>
            </div>

          </div>



        </div>


        <div className={styles.needHelpContainer}>
          <div className={styles.needHelpBar}>
            <div className={styles.needHelpWord}>&nbsp;&nbsp; 急需支援</div>
            <div className={styles.chevronBarIcon}><ChevronRight /></div>
          </div>



          <div className={styles.needHelpInstance}>
            <div>
              <div className={styles.needHelpInstancePart}>
                <Carousel slideSize="70%" height={350} align="start" slideGap="md" controlSize={33} loop withControls={false} >

                  <Carousel.Slide className={styles.needHelpInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}><Person /> 剩餘名額 <span>2</span></div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}><Calendar4 />&nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日</div>
                      </div>
                    </div>

                  </Carousel.Slide>
                  <Carousel.Slide className={styles.needHelpInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}><Person /> 剩餘名額 <span>2</span></div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}><Calendar4 />&nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日</div>
                      </div>
                    </div>

                  </Carousel.Slide>
                  <Carousel.Slide className={styles.needHelpInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}><Person /> 剩餘名額 <span>2</span></div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}><Calendar4 />&nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日</div>
                      </div>
                    </div>

                  </Carousel.Slide>
                </Carousel>
              </div>
            </div>

          </div>



        </div>

        <div className={styles.hotContainer}>
          <div className={styles.needHelpBar}>
            <div className={styles.needHelpWord}>&nbsp;&nbsp; 熱門活動</div>
            <div className={styles.chevronBarIcon}><ChevronRight /></div>
          </div>



          <div className={styles.needHelpInstance}>
            <div>
              <div className={styles.needHelpInstancePart}>
                <Carousel slideSize="70%" height={350} align="start" slideGap="md" controlSize={33} loop withControls={false} >

                  <Carousel.Slide className={styles.needHelpInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}><Person /> 剩餘名額 <span>2</span></div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}><Calendar4 />&nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日</div>
                      </div>
                    </div>

                  </Carousel.Slide>
                  <Carousel.Slide className={styles.needHelpInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}><Person /> 剩餘名額 <span>2</span></div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}><Calendar4 />&nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日</div>
                      </div>
                    </div>

                  </Carousel.Slide>
                  <Carousel.Slide className={styles.needHelpInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}><Person /> 剩餘名額 <span>2</span></div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}><Calendar4 />&nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日</div>
                      </div>
                    </div>

                  </Carousel.Slide>
                </Carousel>
              </div>
            </div>

          </div>



        </div>


        <div>
        <img src="photos/advertising-04.png" className={styles.banner}></img>
        </div>

        <div>
        <img src="photos/adoption-03.png" className={styles.banner}></img>
        </div>

        <div>
        <img src="photos/donation-05.png" className={styles.banner}></img>
        </div>

        <div>
        <img src="photos/apply-to-adopt-06.png" className={styles.banner}></img>
        </div>

        <div className={styles.allOrganisations}>
          <Building/> &nbsp; 所有機構  
          <div className={styles.chevronBarIcon}><ChevronRight /></div>
        </div>

      </div>



      {NavBar}
    </div>
  );
}
