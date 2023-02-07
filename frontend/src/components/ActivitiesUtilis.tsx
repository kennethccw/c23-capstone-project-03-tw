import styles from "../css/schedule.module.scss";
import { ActivityPreview } from "../api/activityAPI";
import { HiCalendar, HiOutlineLocationMarker } from "react-icons/hi";
import DeleteActivityModal from "./DeleteActivityModal";
import React, { useState } from "react";

export function Activity(props: { activity: ActivityPreview; clickHandler: () => void; displayDeleteButton?: boolean; onRemove?: () => void; activityToBeDeleted?: string }) {
  const startTime = new Date(props.activity.start_time);
  const startMonth = startTime.getMonth() + 1;
  const startDate = startTime.getDate();
  const endTime = new Date(props.activity.end_time);
  const endMonth = endTime.getMonth() + 1;
  const endDate = endTime.getDate();
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const showModal = () => {
    setShouldShowModal(true);
  };

  const hideModal = () => {
    setShouldShowModal(false);
  };

  return (
    <>
      <div className={styles.applicationsAppliedContainer} onClick={() => props.clickHandler()}>
        {/* <img className={styles.applicationsAppliedImg} src={`${process.env.REACT_APP_BACKEND_URL}/activities/${props.activity.image}`} alt="" /> */}
        <img className={styles.applicationsAppliedImg} src={`${process.env.REACT_APP_S3_UPLOAD_BUCKET_URL}/activities/${props.activity.image}`} alt="" />
        <div className={styles.detailPart}>
          <div className={styles.applicationsAppliedTextContent}>
            <div className={styles.organisationName}>{props.activity.organisation}</div>
            <div className={styles.activityName}>{props.activity.activity}</div>
            <div className={styles.detailContainer}>
              <HiOutlineLocationMarker className={styles.detailIcon} />
              <div>{props.activity.location}</div>
            </div>
            <div className={styles.detailContainer}>
              <HiCalendar className={styles.detailIcon} />
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

          {props.displayDeleteButton && (
            <div
              className={styles.deleteButton}
              onClick={(e) => {
                showModal();
                e.stopPropagation();
              }}
            >
              刪除活動
            </div>
          )}
        </div>
      </div>

      <DeleteActivityModal
        isShow={shouldShowModal}
        onDelete={() => {
          props.onRemove!();
          hideModal();
        }}
        onHide={() => hideModal()}
        activityNameToBeDeleted={props.activityToBeDeleted}
      />
    </>
  );
}
