import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRootSelector } from "../redux/store";
import { NavBarUtilis } from "../components/NavBarUtilis";
import styles from "../css/home2.module.scss";
import { Bell, ChevronRight, Person, Calendar4, Building } from "react-bootstrap-icons";
import { Carousel } from "@mantine/carousel";
import NewNavbar from "../components/NewNavbar";
import { BiBell } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";
import { HiArrowRight, HiChevronRight } from "react-icons/hi";

export default function Home2() {
  const loading = useRootSelector((state: { auth: { loading: any } }) => state.auth.loading);
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
    <div className={styles.containerForAll}>
      <div className={styles.upperLayer}>
        <div className={styles.logoIconContainer}>
          <img src="photos/logo_pic-09-09.png" className={styles.logoIcon}></img>
        </div>
        <div className={styles.bellIconContainer}>
          <CiBellOn className={styles.bellIcon} />
        </div>
      </div>

      <div className={styles.lowerPart}>
        <div className={styles.userName}>
          <div className={styles.greeting}>&nbsp;你好，{username}！</div>
        </div>

        <div className={styles.carouselPart}>
          <Carousel
            withIndicators
            height={290}
            withControls={false}
            className={styles.chevron}
            styles={{
              indicator: {
                width: 12,
                height: 12,
              },
            }}
          >
            <Carousel.Slide>
              <img src="photos/carousel-02.png" className={styles.carouselPhoto}></img>
            </Carousel.Slide>
            <Carousel.Slide>
              <img src="photos/carousel-01.png" className={styles.carouselPhoto}></img>
            </Carousel.Slide>
          </Carousel>
        </div>

        <div className={styles.socialWorkRecommendContainer}>
          <div className={styles.socialRecommendBar}>
            <div className={styles.socialWorkRecommendWord}>&nbsp;&nbsp; 社職推介</div>
            <div className={styles.chevronBarIcon}>
              <HiChevronRight />
            </div>
          </div>

          <div className={styles.recommendInstance}>
            <div>
              <div className={styles.recommendInstancePart}>
                <Carousel slideSize="70%" align={"start"} slideGap="md" controlSize={33} withControls={false} loop dragFree>
                  <Carousel.Slide className={styles.recommendInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.recommendInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>Marketing義工</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                    </div>
                  </Carousel.Slide>
                  <Carousel.Slide className={styles.recommendInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.recommendInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>Marketing義工</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                    </div>
                  </Carousel.Slide>
                  <Carousel.Slide className={styles.recommendInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.recommendInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>Marketing義工</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                      {/* <div className={styles.clickForMore}>
                        <HiArrowRight />
                        <div className={styles.clickForMoreText}>更多</div>
                      </div> */}
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
            <div className={styles.chevronBarIcon}>
              <HiChevronRight />
            </div>
          </div>

          <div className={styles.needHelpInstance}>
            <div>
              <div className={styles.needHelpInstancePart}>
                <Carousel slideSize="70%" align="start" slideGap="md" controlSize={33} withControls={false} loop dragFree>
                  <Carousel.Slide className={styles.needHelpInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                    </div>
                  </Carousel.Slide>
                  <Carousel.Slide className={styles.needHelpInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                    </div>
                  </Carousel.Slide>
                  <Carousel.Slide className={styles.needHelpInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                      {/* <HiArrowRight className={styles.clickForMore} /> */}
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
            <div className={styles.chevronBarIcon}>
              <HiChevronRight />
            </div>
          </div>

          <div className={styles.needHelpInstance}>
            <div>
              <div className={styles.needHelpInstancePart}>
                <Carousel slideSize="70%" align="start" slideGap="md" controlSize={33} loop withControls={false} dragFree>
                  <Carousel.Slide className={styles.needHelpInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                    </div>
                  </Carousel.Slide>
                  <Carousel.Slide className={styles.needHelpInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                    </div>
                  </Carousel.Slide>
                  <Carousel.Slide className={styles.needHelpInstanceBox}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
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

        <div className={styles.allOrganisationsContainer}>
          <div className={styles.allOrganisations}>
            <Building className={styles.buildingIcon} />
            所有機構
            <div className={styles.chevronBarIcon}>
              <HiChevronRight />
            </div>
          </div>
        </div>
      </div>

      <NewNavbar activeBtn="home" />
      {/* {NavBar} */}
    </div>
  );
}
