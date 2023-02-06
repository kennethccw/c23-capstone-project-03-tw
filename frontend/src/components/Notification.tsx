import styles from "../css/animalNeedOurHelp.module.scss";
import notificationStyles from "../css/notification.module.scss";
import { HiChevronLeft, HiOutlineAdjustments } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { HomeActivity } from "../redux/home";
import { delHomeAdvertiser, HomeNotification } from "../api/homeAPI";
import NotificationComponent from "./NotificationComponent";
import { Divider } from "@mantine/core";

interface Message {
  organisation: string;
  count: number;
}

export default function Notification(props: {
  clickHandler: () => void;

  data: {
    // messageArr: { content: string; organisationId: number }[];
    messageArr: HomeNotification[] | undefined;
    badgeArr: HomeNotification[] | undefined;
    activityApprovedArr: HomeNotification[] | undefined;
    adoptionApprovedArr: HomeNotification[] | undefined;
  };
}) {
  const navigate = useNavigate();
  console.log(props.data);
  return (
    <>
      <div className={styles.containerForAll}>
        {/* <div> */}
        <div className={styles.chevronAndAdjustmntIcon}>
          <HiChevronLeft className={styles.chevronIcon} onClick={() => props.clickHandler()} />
          <div className={styles.chevronIcon} />
          {/* <HiOutlineAdjustments className={styles.adjustmentIcon} /> */}
        </div>
        <span className={styles.organisationTab}>通知</span>
        <hr className={styles.lineTab} />

        {!props.data?.messageArr?.length && !props.data?.badgeArr?.length && !props.data?.activityApprovedArr?.length && !props.data?.adoptionApprovedArr?.length && (
          <div className={notificationStyles.noNotificationContainer}>
            <h2>沒有任何通知</h2>
          </div>
        )}

        {!!props.data?.messageArr?.length && (
          <>
            <h2 className={notificationStyles.notificationHeader}>信息</h2> {/* <hr className={notificationStyles.hr90vw}  />*/}
          </>
        )}
        {props.data?.messageArr?.map((message) => (
          <NotificationComponent
            key={message.id}
            content={`你收到${message.count}個來自${message.content}的新信息`}
            clickHandler={async () => {
              await delHomeAdvertiser(message.id);
              navigate(`/help/chatroom?id=${message.any_id}`);
            }}
          />
        ))}
        {!!props.data?.badgeArr?.length && (
          <>
            <h2 className={notificationStyles.notificationHeader}>徽章</h2> {/* <hr className={notificationStyles.hr90vw}  />*/}
          </>
        )}
        {props.data?.badgeArr?.map((badge) => (
          <NotificationComponent
            key={badge.id}
            content={badge.content}
            clickHandler={async () => {
              await delHomeAdvertiser(badge.id);
              navigate("/badge");
            }}
          />
        ))}
        {!!props.data?.activityApprovedArr?.length && (
          <>
            <h2 className={notificationStyles.notificationHeader}>活動</h2> {/* <hr className={notificationStyles.hr90vw}  />*/}
          </>
        )}
        {props.data?.activityApprovedArr?.map((activity) => (
          <NotificationComponent key={activity.id} content={activity.content} clickHandler={() => navigate("/badge")} />
        ))}
        {!!props.data?.adoptionApprovedArr?.length && (
          <>
            <h2 className={notificationStyles.notificationHeader}>領養</h2> {/* <hr className={notificationStyles.hr90vw}  />*/}
          </>
        )}
        {props.data?.adoptionApprovedArr?.map((adoption) => (
          <NotificationComponent key={adoption.id} content={adoption.content} clickHandler={() => navigate("/badge")} />
        ))}
      </div>
    </>
  );
}
