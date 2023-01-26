import { NavBarUtilis } from "../components/NavBarUtilis";
import styles from "../css/allActivitiesPage.module.scss";
import { Calendar4, ChevronLeft, Filter, Person, GeoAlt } from "react-bootstrap-icons";
import { TextInput } from '@mantine/core'; //https://ui.mantine.dev/category/inputs
import { IconSearch } from '@tabler/icons';
import { useNavigate } from "react-router-dom";


export default function EditorsChoice() {
    const NavBar = NavBarUtilis();
    const navigate = useNavigate();

    return (<div>
      
        <div className={styles.upperPart}>
            <div className={styles.leftArrow}><ChevronLeft className={styles.leftArrowIcon} onClick={() => { navigate('/') }} /></div>
            <div className={styles.searchBarPart}>
                <TextInput className={styles.searchBar}
                    icon={<IconSearch size={30} stroke={1.5} className={styles.iconSearch} />}
                    radius="xl"
                    size="xl"
                    placeholder="尋找關鍵字"
                    rightSectionWidth={42}
                />
            </div>
            <div className={styles.filter}><Filter className={styles.filterIcon} /></div>
        </div>

        <div className={styles.searchChance}>
            社職推介
        </div>


        
        <div className={styles.chanceContainer}>
            <div className={styles.chanceInstances}>
                <div className={styles.box}>
                    <img src="photos/carousel-02.png" className={styles.chancePhoto}></img>
                    <div className={styles.remainingPlace}><Person /> 剩餘名額 <span>2</span></div>
                </div>
                <div className={styles.organisationName}>香港動物群益會</div>
                <div className={styles.taskName}>埸內清潔義工</div>
                <div className={styles.address}>
                    <GeoAlt/>&nbsp;&nbsp;&nbsp;12134
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
                    <GeoAlt/>&nbsp;&nbsp;&nbsp;12134
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
                    <GeoAlt/>&nbsp;&nbsp;&nbsp;12134
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
                    <GeoAlt/>&nbsp;&nbsp;&nbsp;12134
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
                    <GeoAlt/>&nbsp;&nbsp;&nbsp;12134
                </div>
                <div className={styles.dateDetail}><Calendar4 />&nbsp;&nbsp;&nbsp;<span>2013</span>年<span>2</span>月<span>18</span>日</div>
            </div>
        </div>







        {NavBar}
    </div>)
}
