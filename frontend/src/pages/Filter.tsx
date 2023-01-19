import { useNavigate } from "react-router-dom";
import { XLg } from "react-bootstrap-icons";
import styles from "../css/allActivitiesPage.module.scss";



export default function Filter() {
    const navigate = useNavigate();

    return (
        <div>
            <div className={styles.upperPartFilter}>
                <div className={styles.XLgIcon}><XLg/></div>
                <div className={styles.filterWord} >篩選</div>
                <div className={styles.deleteAllWord}>全部清除</div>
            </div>

            <div>地點</div>

            <div className={styles.middlePart} >
                <div>
                    <input type="checkbox"></input>
                    <div>香港島</div>
                </div>
                <div>
                    <input type="checkbox"></input>
                    <div>九龍</div>
                </div>
                <div>
                    <input type="checkbox"></input>
                    <div>新界</div>
                </div>
            </div>

            <div className={styles.lowerPart}>
                <div></div>
                <div>平日（週一至週五）</div>
                <div>週末（週六至週日）</div>
            </div>





        </div>)
}