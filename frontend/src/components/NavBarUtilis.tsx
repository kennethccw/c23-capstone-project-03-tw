import styles from "../css/navBar.module.scss";
import { Search, LightningFill, HouseDoorFill, MenuButtonWideFill, PersonCircle} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export function NavBarUtilis() {
  const navigate = useNavigate();
  return (
 <div className={styles.navBarContainer}>
  <div className={styles.navBarIcon} onClick={()=>{navigate('/')}}><Search/></div>
  <div className={styles.navBarIcon} onClick={()=>{navigate('/')}}><LightningFill/></div>
  <div className={styles.navBarIcon} onClick={()=>{navigate('/')}}><HouseDoorFill/></div>
  <div className={styles.navBarIcon} onClick={()=>{navigate('/')}}><MenuButtonWideFill/></div>
  <div className={styles.navBarIcon} onClick={()=>{navigate('/')}}><PersonCircle/></div>
 </div>
  );
}



