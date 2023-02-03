import { useMemo, useRef, useState } from "react";
import { HiClipboardList, HiHome, HiLightningBolt, HiSearchCircle, HiUserCircle } from "react-icons/hi";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styles from "../css/newNavBar.module.scss";

export default function NewNavbar(props: { activeBtn: string; isSearchClicked?: boolean }) {
  enum ChosenBtn {
    SEARCH = "search",
    BOLT = "bolt",
    HOME = "home",
    CLIPBOARD = "clipboard",
    USER = "user",
  }
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const [chosenBtn, setChosenBtn] = useState(sessionStorage.getItem("navIcon") || ChosenBtn.HOME);
  // const chosenBtn = useRef(ChosenBtn.HOME);
  const chosenBtn = props.activeBtn;
  return (
    <>
      <div className={styles.navBArList}>
        {/* {chosenBtn.current === ChosenBtn.SEARCH ? ( */}
        {chosenBtn === ChosenBtn.SEARCH ? (
          <div className={`${styles.navbarIconBackground} ${styles.navbarIconBackgroundActive}`} onClick={() => navigate("/search")}>
            <HiSearchCircle className={`${styles.navbarIcon} ${styles.searchNav} ${styles.navIconActive}`} />
          </div>
        ) : (
          <div
            className={styles.navbarIconBackground}
            onClick={() => {
              // queryClient.invalidateQueries().then(() => navigate("/search"));
              navigate("/search");
            }}
          >
            <HiSearchCircle className={`${styles.navbarIcon} ${styles.searchNav}`} />
          </div>
        )}
        {/* {chosenBtn.current === ChosenBtn.BOLT ? ( */}
        {chosenBtn === ChosenBtn.BOLT ? (
          <div className={`${styles.navbarIconBackground} ${styles.navbarIconBackgroundActive}`} onClick={() => navigate("/help")}>
            <HiLightningBolt className={`${styles.navbarIcon}  ${styles.navIconActive}`} />
          </div>
        ) : (
          <div
            className={styles.navbarIconBackground}
            onClick={() => {
              // chosenBtn.current = ChosenBtn.BOLT;
              // sessionStorage.setItem("navIcon", ChosenBtn.BOLT);
              // setChosenBtn(ChosenBtn.BOLT);
              navigate("/help");
            }}
          >
            <HiLightningBolt className={`${styles.navbarIcon} `} />
          </div>
        )}
        {/* {chosenBtn.current === ChosenBtn.HOME ? ( */}
        {chosenBtn === ChosenBtn.HOME ? (
          <div className={`${styles.navbarIconBackground} ${styles.navbarIconBackgroundActive}`} onClick={() => navigate("/home")}>
            <HiHome className={`${styles.navbarIcon}  ${styles.navIconActive}`} />
          </div>
        ) : (
          <div
            className={styles.navbarIconBackground}
            onClick={() => {
              // chosenBtn.current = ChosenBtn.HOME;
              // sessionStorage.setItem("navIcon", ChosenBtn.HOME);
              // setChosenBtn(ChosenBtn.HOME);
              navigate("/home");
            }}
          >
            <HiHome className={`${styles.navbarIcon} `} />
          </div>
        )}
        {/* {chosenBtn.current === ChosenBtn.CLIPBOARD ? ( */}
        {chosenBtn === ChosenBtn.CLIPBOARD ? (
          <div className={`${styles.navbarIconBackground} ${styles.navbarIconBackgroundActive}`} onClick={() => navigate("/schedule")}>
            <HiClipboardList className={`${styles.navbarIcon}  ${styles.navIconActive}`} />
          </div>
        ) : (
          <div
            className={styles.navbarIconBackground}
            onClick={() => {
              // chosenBtn.current = ChosenBtn.CLIPBOARD;
              // sessionStorage.setItem("navIcon", ChosenBtn.CLIPBOARD);
              // setChosenBtn(ChosenBtn.CLIPBOARD);
              navigate("/schedule");
            }}
          >
            <HiClipboardList className={`${styles.navbarIcon} `} />
          </div>
        )}
        {/* {chosenBtn.current === ChosenBtn.USER ? ( */}
        {chosenBtn === ChosenBtn.USER ? (
          <div className={`${styles.navbarIconBackground} ${styles.navbarIconBackgroundActive}`} onClick={() => navigate("/account")}>
            <HiUserCircle className={`${styles.navbarIcon} ${styles.userNav} ${styles.navIconActive}`} />
          </div>
        ) : (
          <div
            className={styles.navbarIconBackground}
            onClick={() => {
              // chosenBtn.current = ChosenBtn.USER;
              // sessionStorage.setItem("navIcon", ChosenBtn.USER);
              // setChosenBtn(ChosenBtn.USER);
              navigate("/account");
            }}
          >
            <HiUserCircle className={`${styles.navbarIcon} ${styles.userNav}`} />
          </div>
        )}
      </div>
    </>
  );
}
