import { MantineProvider, Timeline } from "@mantine/core";
import styles from "../css/badge.module.scss";
import React from "react";
import { HiAdjustmentsHorizontal, HiXMark } from "react-icons/hi2";
import NewNavbar from "../components/NewNavbar";
import { useNavigate } from "react-router-dom";
export default function Badge() {
  const navigate = useNavigate();
  return (
    <MantineProvider
      inherit
      theme={{
        colors: {
          "ocean-blue": ["#7AD1DD", "#5FCCDB", "#44CADC", "#2AC9DE", "#1AC2D9", "#11B7CD", "#09ADC3", "#0E99AC", "#128797", "#147885"],
          "bright-pink": ["#F0BBDD", "#ED9BCF", "#EC7CC3", "#ED5DB8", "#F13EAF", "#F71FA7", "#FF00A1", "#E00890", "#C50E82", "#AD1374"],
          "petscue-purple": ["#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5", "#585ce5"],
        },
        components: {
          InputWrapper: {
            styles: () => ({
              label: {
                fontSize: 14,
              },
            }),
          },

          Select: {
            styles: (theme) => ({
              item: {
                // applies styles to selected item
                "&[data-selected]": {
                  "&, &:hover": {
                    backgroundColor: theme.colors["petscue-purple"],
                    color: theme.white,
                  },
                },

                // applies styles to hovered item (with mouse or keyboard)
                "&[data-hovered]": {},
              },
            }),
          },

          Input: {
            styles: () => ({
              input: { height: 48 },
            }),
          },

          Checkbox: {
            styles: () => ({
              label: { marginTop: -8 },
            }),
          },
        },
      }}
    >
      <div className={styles.containerForAll}>
        <div className={styles.header}>
          <HiXMark className={styles.closingIcon} onClick={() => navigate(-1)} />
          <span>徽章</span>
        </div>
        <hr className={styles.headerHr} />

        <div className={styles.forFlex100vw}>
          <div className={styles.yearContainer}>
            <h3 className={styles.yearValue}>2023</h3>
            <div className={styles.yearIcon}>
              <h3 className={styles.yearTitle}>年份</h3>
              <HiAdjustmentsHorizontal className={styles.adjustmentIcon} />
            </div>
          </div>
        </div>
        <div className={styles.badgeYearContainer}>
          <h2>愛心爆棚者</h2>
          <div className={styles.badgeContainer}>
            <img className={styles.badgesImg} src="photos/organisation/goldbadge.png" alt="" />
            <div className={styles.badgeDescription}>你一共參與了30次義工服務，得到一枚到愛心爆棚者徽章。</div>
          </div>
        </div>
        <hr className={styles.headerHr90vw} />
        <div className={styles.badgeYearContainer}>
          <h2>捐款慈善家</h2>
          <div className={styles.badgeContainer}>
            <img className={styles.badgesImg} src="photos/organisation/silverbadge.png" alt="" />
            <div className={styles.badgeDescription}>你一共捐款了10次， 得到一枚捐款慈善家銀徽章。</div>
          </div>
        </div>
        <hr className={styles.headerHr90vw} />
        <div className={styles.badgeYearContainer}>
          <h2>廣告慈善家</h2>
          <div className={styles.badgeContainer}>
            <img className={styles.badgesImg} src="photos/organisation/cropperbadge.png" alt="" />
            <div className={styles.badgeDescription}>你一共觀看了10次廣告，得到一枚廣告慈善家銅徽章。</div>
          </div>
        </div>
      </div>
      {/* <NewNavbar /> */}
    </MantineProvider>
  );
}
