import { useMemo } from "react";
import styles from "../css/animalHelpChat.module.scss";
export function AnimalHelpPurple(props: { text?: string; image?: File | string; time?: Date }) {
  const timeNow = useMemo(() => {
    const time24Format = props.time ? new Date(props.time).getHours() : new Date().getHours();
    const minute = props.time ? new Date(props.time).getMinutes().toString().padStart(2, "0") : new Date().getMinutes().toString().padStart(2, "0");
    let time12Format;
    let amOrPm;
    if (time24Format > 12) {
      time12Format = time24Format - 12;
      amOrPm = "PM";
    } else {
      time12Format = time24Format;
      amOrPm = "AM";
    }
    const time = time12Format.toString().padStart(2, "0") + ":" + minute + " " + amOrPm;
    return time;
  }, []);
  return (
    <div className={styles.clientSideBigContainer}>
      <div className={styles.clientSideContainer}>
        {props.text && <div className={styles.clientSide}>{props.text}</div>}
        {props.image && <img className={styles.imgContainer} src={`${process.env.REACT_APP_BACKEND_URL}/animalNeedHelp/${props.image}`}></img>}
        {/* {props.image && <img className={styles.imgContainer} src={`${process.env.REACT_APP_S3_UPLOAD_BUCKET_URL}/animalNeedHelp/${props.image}`}></img>} */}
        {/* <div className={styles.clientSide}>我係城門水塘見到有隻狗媽媽生左好多小狗狗，狗媽媽受傷，呼吸困難。</div> */}
        <div className={styles.time}>{timeNow}</div>
      </div>
    </div>
  );
}

export function AnimalHelpWhite(props: { text?: string; image?: File | string; time?: Date }) {
  const timeNow = useMemo(() => {
    const time24Format = props.time ? new Date(props.time).getHours() : new Date().getHours();
    const minute = props.time ? new Date(props.time).getMinutes().toString().padStart(2, "0") : new Date().getMinutes().toString().padStart(2, "0");
    let time12Format;
    let amOrPm;
    if (time24Format > 12) {
      time12Format = time24Format - 12;
      amOrPm = "PM";
    } else {
      time12Format = time24Format;
      amOrPm = "AM";
    }
    const time = time12Format.toString().padStart(2, "0") + ":" + minute + " " + amOrPm;
    return time;
  }, []);
  return (
    <div className={styles.supportSideContainer}>
      {props.text && <div className={styles.supportSide}>{props.text}</div>}
      {/* {props.image && <img className={styles.imgContainer} src={`${process.env.REACT_APP_BACKEND_URL}/animalNeedHelp/${props.image}`}></img>} */}
      {props.image && <img className={styles.imgContainer} src={`${process.env.REACT_APP_S3_UPLOAD_BUCKET_URL}/animalNeedHelp/${props.image}`}></img>}
      <div className={styles.time}>{timeNow}</div>
    </div>
  );
}
