import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRootSelector } from "../redux/store";
import styles from "../css/home2.module.scss";
import { Building } from "react-bootstrap-icons";
import { Carousel } from "@mantine/carousel";
import NewNavbar from "../components/NewNavbar";
import { CiBellOn } from "react-icons/ci";
import { HiChevronRight } from "react-icons/hi";
import { useQuery } from "react-query";
import { HomeActivityComponent } from "../components/HomeActivityCompoent";
import { LoadingOverlay } from "@mantine/core";
import { getHomeActivities, getHomeNotification, NotificationType } from "../api/homeAPI";
import { io } from "socket.io-client";
import Notification from "../components/Notification";

export default function Home2() {
  const authLoading = useRootSelector((state) => state.auth.loading);
  // const activityArr = useRootSelector((state) => state.home.activity);
  // const homeLoading = useRootSelector((state) => state.home.loading);
  // console.log(activityArr);
  // const dispatch = useRootDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(homeActivityThunk());
  // }, [dispatch]);

  const socket = io("http://localhost:8080", {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  });
  interface SocketMessageData {
    converation?: string;
    image?: string;
    organisation: { id: number; name: string };
  }

  interface Message {
    organisation: string;
    count: number;
  }

  const [socketMessageData, setSocketMessageData] = useState<SocketMessageData>();
  const [socketMessageDataArr, setSocketMessageDataArr] = useState<SocketMessageData[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on(`to-clientId${localStorage.getItem("userId")}`, (data) => {
      setSocketMessageData(data);
    });
    return () => {
      socket.off("connect");
      socket.off(`to-clientId${localStorage.getItem("userId")}`);
    };
  }, []);

  const [isChangedState, setIsChangedState] = useState(false);

  useEffect(() => {
    if (socketMessageData) {
      setSocketMessageDataArr((socketMessageDataArr) => {
        socketMessageDataArr.push(socketMessageData);
        return socketMessageDataArr;
      });
      setIsChangedState(!isChangedState);
    }
  }, [socketMessageData, socketMessageDataArr]);

  console.log(socketMessageDataArr);

  const getHomeActivitiesAndNotification = async () => {
    const activityArr = await getHomeActivities();
    const notificationArr = await getHomeNotification();
    // const messageArr: { content: string; organisationId: number }[] = [];
    // console.log(notificationArr);
    // const allMessageArr = notificationArr.filter((notification) => notification.type === NotificationType.message);
    const messageArr = notificationArr.filter((notification) => notification.type === NotificationType.message);
    const badgeArr = notificationArr.filter((notification) => notification.type === NotificationType.badge);
    // console.log(badgeArr);
    const activityApprovedArr = notificationArr.filter((notification) => notification.type === NotificationType.activity);
    const adoptionApprovedArr = notificationArr.filter((notification) => notification.type === NotificationType.adoption);
    // const organisationSet = new Set<string>();
    // for (const message of allMessageArr) {
    //   organisationSet.add(message.content);
    // }
    // const organisationOfMessageArr = Array.from(organisationSet);
    // console.log(organisationOfMessageArr);
    // for (const organisation of organisationOfMessageArr) {
    //   let count = 0;
    //   let organisationId: number = 0;
    //   for (const message of allMessageArr) {
    //     if (message.content === organisation) {
    //       count++;
    //       organisationId = message.any_id!;
    //     }
    //   }
    //   messageArr.push({ content: `你收到${count}個來自${organisation}的新信息`, organisationId });
    // }
    // console.log(messageArr);
    return { activityArr, messageArr, badgeArr, activityApprovedArr, adoptionApprovedArr };
  };

  const { isLoading, isError, data, error } = useQuery({
    // react query - customised hook
    queryKey: ["home"],
    queryFn: getHomeActivitiesAndNotification, // API
    refetchInterval: 5_000,
    staleTime: 10_000,
    retry: 1,
  });

  // useEffect(() => {
  //   if (!authLoading) {
  //     setUsername(localStorage.getItem("username"));
  //   }
  // }, [authLoading]);

  // data?.map((activity) => {console.log("check id", activity.id)})

  const [isNotificationBtnClicked, setIsNotificationBtnClicked] = useState(false);

  return isNotificationBtnClicked ? (
    <Notification
      clickHandler={() => setIsNotificationBtnClicked(false)}
      data={{ messageArr: data?.messageArr, badgeArr: data?.badgeArr, activityApprovedArr: data?.activityApprovedArr, adoptionApprovedArr: data?.adoptionApprovedArr }}
    />
  ) : (
    <div className={styles.containerForAll}>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

      <div className={styles.upperLayer}>
        <div className={styles.logoIconContainer}>
          <img src="/photos/logo_pic-09-09.png" className={styles.logoIcon}></img>
        </div>
        <div className={styles.bellIconContainer} onClick={() => setIsNotificationBtnClicked(true)}>
          <CiBellOn className={styles.bellIcon} />
          {!!(socketMessageDataArr.length + (data?.messageArr.length || 0) + (data?.badgeArr.length || 0) + (data?.activityApprovedArr.length || 0) + (data?.adoptionApprovedArr.length || 0)) && (
            <div className={styles.bellCount}>
              <div>
                {socketMessageDataArr.length + (data?.messageArr.length || 0) + (data?.badgeArr.length || 0) + (data?.activityApprovedArr.length || 0) + (data?.adoptionApprovedArr.length || 0)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.lowerPart}>
        <div className={styles.userName}>
          <div className={styles.greeting}>&nbsp;你好，{localStorage.getItem("username")}！</div>
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
              <img src="/photos/carousel-02.png" className={styles.carouselPhoto}></img>
            </Carousel.Slide>
            <Carousel.Slide>
              <img src="/photos/carousel-01.png" className={styles.carouselPhoto}></img>
            </Carousel.Slide>
          </Carousel>
        </div>

        <div className={styles.socialWorkRecommendContainer}>
          <div className={styles.socialRecommendBar} onClick={() => navigate("/activity?category=editors_choice")}>
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
                  {data?.activityArr.map((activity) => activity.type === "editors_choice" && <HomeActivityComponent key={activity.id} activity={activity} />)}

                  {/* props */}
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.needHelpContainer}>
          <div className={styles.needHelpBar} onClick={() => navigate("/activity?category=urgent")}>
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
                  {data?.activityArr.map((activity) => activity.type === "urgent" && <HomeActivityComponent key={`urgent-${activity.id}`} activity={activity} />)}

                  {/* props */}
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.hotContainer}>
          <div className={styles.needHelpBar} onClick={() => navigate("/activity?category=popular")}>
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
                  {data?.activityArr.map((activity) => activity.type === "popular" && <HomeActivityComponent key={`popular-${activity.id}`} activity={activity} />)}

                  {/* props */}
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        <div onClick={() => navigate("/advertiser")}>
          <img src="photos/advertising-04.png" className={styles.banner}></img>
        </div>

        <div onClick={() => navigate("/adoption/application/detail")}>
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
    </div>
  );
}
