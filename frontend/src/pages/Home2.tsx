import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRootDispatch, useRootSelector } from "../redux/store";
import { NavBarUtilis } from "../components/NavBarUtilis";
import styles from "../css/home2.module.scss";
import { Bell, ChevronRight, Person, Calendar4, Building } from "react-bootstrap-icons";
import { Carousel } from "@mantine/carousel";
import NewNavbar from "../components/NewNavbar";
import { BiBell } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";
import { HiArrowRight, HiChevronRight } from "react-icons/hi";
import { useQuery } from "react-query";
import { homeActivityThunk } from "../redux/home/thunk";
import { HomeActivityComponent } from "../components/HomeActivityCompoent";
import { LoadingOverlay } from "@mantine/core";
import { getHomeActivities } from "../api/homeAPI";

export default function Home2() {
  const authLoading = useRootSelector((state) => state.auth.loading);
  // const activityArr = useRootSelector((state) => state.home.activity);
  // const homeLoading = useRootSelector((state) => state.home.loading);
  // console.log(activityArr);
  // const dispatch = useRootDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState(localStorage.getItem("username"));

  // useEffect(() => {
  //   dispatch(homeActivityThunk());
  // }, [dispatch]);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["home/activities"],
    queryFn: getHomeActivities,
    refetchInterval: 5_000,
    staleTime: 10_000,
    retry: 1,
  });

  useEffect(() => {
    if (!authLoading) {
      setUsername(localStorage.getItem("username"));
    }
  }, [authLoading]);

  return (
    <div className={styles.containerForAll}>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

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
            <div className={styles.categoryTitle}>&nbsp;&nbsp; Petscue 推介</div>
            <div className={styles.chevronBarIcon}>
              <HiChevronRight />
            </div>
          </div>

          <div className={styles.recommendInstance}>
            <div>
              <div className={styles.recommendInstancePart}>
                <Carousel slideSize="70%" align={"start"} slideGap="md" controlSize={33} withControls={false} loop dragFree>
                  {/* <Carousel.Slide className={styles.carouselSlide}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.recommendInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>Marketing義工</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 className={styles.calendarIcon} />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                    </div>
                  </Carousel.Slide>
                  <Carousel.Slide className={styles.carouselSlide}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.recommendInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>Marketing義工</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 className={styles.calendarIcon} />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                    </div>
                  </Carousel.Slide>
                  <Carousel.Slide className={styles.carouselSlide}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.recommendInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>Marketing義工</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 className={styles.calendarIcon} />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                      
                    </div>
                  </Carousel.Slide> */}

                  {/* props */}
                  {data?.map((activity) => (activity.type === "editors_choice" ? <HomeActivityComponent key={`editor-${activity.id}`} activity={activity} /> : <></>))}

                  {/* props */}
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.needHelpContainer}>
          <div className={styles.needHelpBar}>
            <div className={styles.categoryTitle}>&nbsp;&nbsp; 急需支援</div>
            <div className={styles.chevronBarIcon}>
              <HiChevronRight />
            </div>
          </div>

          <div className={styles.needHelpInstance}>
            <div>
              <div className={styles.needHelpInstancePart}>
                <Carousel slideSize="70%" align="start" slideGap="md" controlSize={33} withControls={false} loop dragFree>
                  {/* <Carousel.Slide className={styles.carouselSlide}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 className={styles.calendarIcon} />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                    </div>
                  </Carousel.Slide>
                  <Carousel.Slide className={styles.carouselSlide}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 className={styles.calendarIcon} />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                    </div>
                  </Carousel.Slide>
                  <Carousel.Slide className={styles.carouselSlide}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 className={styles.calendarIcon} />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                      
                    </div>
                  </Carousel.Slide> */}

                  {/* props */}
                  {data?.map((activity) => (activity.type === "urgent" ? <HomeActivityComponent key={`urgent-${activity.id}`} activity={activity} /> : <></>))}

                  {/* props */}
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.hotContainer}>
          <div className={styles.needHelpBar}>
            <div className={styles.categoryTitle}>&nbsp;&nbsp; 熱門活動</div>
            <div className={styles.chevronBarIcon}>
              <HiChevronRight />
            </div>
          </div>

          <div className={styles.needHelpInstance}>
            <div>
              <div className={styles.needHelpInstancePart}>
                <Carousel slideSize="70%" align="start" slideGap="md" controlSize={33} loop withControls={false} dragFree>
                  {/* <Carousel.Slide className={styles.carouselSlide}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 className={styles.calendarIcon} />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                    </div>
                  </Carousel.Slide>
                  <Carousel.Slide className={styles.carouselSlide}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 className={styles.calendarIcon} />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                    </div>
                  </Carousel.Slide>
                  <Carousel.Slide className={styles.carouselSlide}>
                    <div className={styles.box}>
                      <img src="photos/carousel-02.png" className={styles.needHelpInstancePhoto}></img>
                      <div className={styles.remainingPlace}>
                        <Person /> 剩餘名額 <span>2</span>
                      </div>
                      <div className={styles.recommendInstanceDetails}>
                        <div className={styles.volunteerWord}>賣旗日</div>
                        <div className={styles.dateDetail}>
                          <Calendar4 className={styles.calendarIcon} />
                          &nbsp;<span>3</span>月<span>4</span>日-<span>3</span>月<span>5</span>日
                        </div>
                      </div>
                    </div>
                  </Carousel.Slide> */}

                  {/* props */}
                  {data?.map((activity) => (activity.type === "popular" ? <HomeActivityComponent key={`popular-${activity.id}`} activity={activity} /> : <></>))}

                  {/* props */}
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        <div onClick={() => navigate("/advertiser")}>
          <img src="photos/advertising-04.png" className={styles.banner}></img>
        </div>

        <div onClick={() => navigate("/adoption/detail")}>
          <img src="photos/adoption-03.png" className={styles.banner}></img>
        </div>

        <div onClick={() => navigate("/donation")}>
          <img src="photos/donation-05.png" className={styles.banner}></img>
        </div>

        <div onClick={() => navigate("/adoption")}>
          <img src="photos/apply-to-adopt-06.png" className={styles.banner}></img>
        </div>

        <div className={styles.allOrganisationsContainer} onClick={() => navigate("/organisation")}>
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
