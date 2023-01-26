import styles from "../css/allActivitiesPage.module.scss";
import { Calendar4, ChevronLeft, Filter, Person, GeoAlt } from "react-bootstrap-icons";


export function Activity() {

    return (
        <>
            <div className={styles.chanceContainer}>
                <div className={styles.chanceInstances}>
                    <div className={styles.box}>
                        <img src="photos/carousel-02.png" className={styles.chancePhoto}></img>
                        <div className={styles.remainingPlace}><Person /> 剩餘名額 <span>2</span></div>
                    </div>
                    <div className={styles.organisationName}>香港動物群益會</div>
                    <div className={styles.taskName}>埸內清潔義工</div>
                    <div className={styles.address}>
                        <GeoAlt />&nbsp;&nbsp;&nbsp;12134
                    </div>
                    <div className={styles.dateDetail}><Calendar4 />&nbsp;&nbsp;&nbsp;<span>2013</span>年<span>2</span>月<span>18</span>日</div>
                </div>

                <div className={styles.chanceInstances}>
                    <div className={styles.box}>
                        <img src="photos/carousel-02.png" className={styles.chancePhoto}></img>
                        <div className={styles.remainingPlace}><Person /> 剩餘名額 <span>2</span></div>
                    </div>
                    <div className={styles.organisationName}>香港動物群益會</div>
                    <div className={styles.taskName}>埸內清潔義工</div>
                    <div className={styles.address}>
                        <GeoAlt />&nbsp;&nbsp;&nbsp;12134
                    </div>
                    <div className={styles.dateDetail}><Calendar4 />&nbsp;&nbsp;&nbsp;<span>2013</span>年<span>2</span>月<span>18</span>日</div>
                </div>

                <div className={styles.chanceInstances}>
                    <div className={styles.box}>
                        <img src="photos/carousel-02.png" className={styles.chancePhoto}></img>
                        <div className={styles.remainingPlace}><Person /> 剩餘名額 <span>2</span></div>
                    </div>
                    <div className={styles.organisationName}>香港動物群益會</div>
                    <div className={styles.taskName}>埸內清潔義工</div>
                    <div className={styles.address}>
                        <GeoAlt />&nbsp;&nbsp;&nbsp;12134
                    </div>
                    <div className={styles.dateDetail}><Calendar4 />&nbsp;&nbsp;&nbsp;<span>2013</span>年<span>2</span>月<span>18</span>日</div>
                </div>

                <div className={styles.chanceInstances}>
                    <div className={styles.box}>
                        <img src="photos/carousel-02.png" className={styles.chancePhoto}></img>
                        <div className={styles.remainingPlace}><Person /> 剩餘名額 <span>2</span></div>
                    </div>
                    <div className={styles.organisationName}>香港動物群益會</div>
                    <div className={styles.taskName}>埸內清潔義工</div>
                    <div className={styles.address}>
                        <GeoAlt />&nbsp;&nbsp;&nbsp;12134
                    </div>
                    <div className={styles.dateDetail}><Calendar4 />&nbsp;&nbsp;&nbsp;<span>2013</span>年<span>2</span>月<span>18</span>日</div>
                </div>

                <div className={styles.chanceInstances}>
                    <div className={styles.box}>
                        <img src="photos/carousel-02.png" className={styles.chancePhoto}></img>
                        <div className={styles.remainingPlace}><Person /> 剩餘名額 <span>2</span></div>
                    </div>
                    <div className={styles.organisationName}>香港動物群益會</div>
                    <div className={styles.taskName}>埸內清潔義工</div>
                    <div className={styles.address}>
                        <GeoAlt />&nbsp;&nbsp;&nbsp;12134
                    </div>
                    <div className={styles.dateDetail}><Calendar4 />&nbsp;&nbsp;&nbsp;<span>2013</span>年<span>2</span>月<span>18</span>日</div>
                </div>
            </div>
        </>
    )

}