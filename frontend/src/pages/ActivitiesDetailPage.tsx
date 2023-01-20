import { useNavigate } from "react-router-dom";
import { NavBarUtilis } from "../components/NavBarUtilis";
import styles from "../css/allActivitiesPage.module.scss";


export default function ActivitiesDetailPage() {
    const NavBar = NavBarUtilis();
    const navigate = useNavigate();

    return (    
        <div>
            <div className={styles.buttonPart}>activities Detail</div>

        </div>



    )}