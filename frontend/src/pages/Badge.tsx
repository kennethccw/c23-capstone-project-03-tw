import { MantineProvider, Timeline } from "@mantine/core";
import styles from "../css/badge.module.scss";
import React, { useEffect, useState } from "react";
import { HiAdjustmentsHorizontal, HiXMark } from "react-icons/hi2";
import NewNavbar from "../components/NewNavbar";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { BadgeImage, BadgeList, BadgeRank, BadgeType, getBadges } from "../api/badgeAPI";
export default function Badge() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["badge"],
    queryFn: getBadges,
  });
  console.log(data);

  enum BadgeChineseRank {
    gold = "金",
    silver = "銀",
    copper = "銅",
  }

  const convertRankToImg = (rank: BadgeRank) => {
    const imgFile = BadgeImage[rank];

    return imgFile;
  };
  const convertRankToChinese = (rank: BadgeRank) => {
    const chineseRank = BadgeChineseRank[rank];

    return chineseRank;
  };

  interface BadgeObj {
    advertising_philanthropist?: BadgeList;
    donation_philanthropist?: BadgeList;
    warmhearted?: BadgeList;
  }

  const [badgeObj, setBadgeObj] = useState<BadgeObj>();

  const convertBadgeListToBadgeObj = (badges: BadgeList[]) => {
    const badgeObj: BadgeObj = {};
    console.log(badges);
    for (const badge of badges) {
      if (badge.badge_id === BadgeType.advertising_philanthropist) {
        badgeObj.advertising_philanthropist = badge;
      }
      if (badge.badge_id === BadgeType.donation_philanthropist) {
        badgeObj.donation_philanthropist = badge;
      }
      if (badge.badge_id === BadgeType.warmhearted) {
        badgeObj.warmhearted = badge;
      }
    }
    setBadgeObj(badgeObj);
  };

  useEffect(() => {
    if (data) {
      convertBadgeListToBadgeObj(data.badges);
    }
  }, [data]);

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
            <div className={styles.yearIcon} onClick={() => navigate("/badge/filter")}>
              <h3 className={styles.yearTitle}>年份</h3>
              <HiAdjustmentsHorizontal className={styles.adjustmentIcon} />
            </div>
          </div>
        </div>
        <div className={styles.badgeYearContainer}>
          <h2>愛心爆棚家</h2>
          <div className={styles.badgeContainer}>
            {data?.activityParticipatedTimes?.total_activities_participated_times ? (
              <>
                <img className={styles.badgesImg} src={`/photos/organisation/${convertRankToImg(badgeObj?.warmhearted?.rank!)}`} alt="" />
                <div className={styles.badgeDescription}>
                  你一共參與了{data.activityParticipatedTimes.total_activities_participated_times}次義工服務，得到一枚到愛心爆棚者{convertRankToChinese(badgeObj?.warmhearted?.rank!)}徽章。
                </div>
              </>
            ) : (
              <>
                <div className={styles.badgesText}>尚未有徽章</div>
                <div className={styles.badgeDescription}>你一共參與了0次義工服務，未有得到愛心爆棚者徽章。</div>
              </>
            )}
          </div>
        </div>
        <hr className={styles.headerHr90vw} />
        <div className={styles.badgeYearContainer}>
          <h2>捐款慈善家</h2>
          <div className={styles.badgeContainer}>
            {data?.donationAmount?.total_donation ? (
              <>
                <img className={styles.badgesImg} src={`/photos/organisation/${convertRankToImg(badgeObj?.donation_philanthropist?.rank!)}`} alt="" />
                <div className={styles.badgeDescription}>
                  你一共捐款了 ${data?.donationAmount?.total_donation}， 得到一枚捐款慈善家{convertRankToChinese(badgeObj?.donation_philanthropist?.rank!)}徽章。
                </div>
              </>
            ) : (
              <>
                <div className={styles.badgesText}>尚未有徽章</div>
                <div className={styles.badgeDescription}>你一共捐款了 $0，未有得到捐款慈善家徽章。</div>
              </>
            )}
          </div>
        </div>
        <hr className={styles.headerHr90vw} />
        <div className={styles.badgeYearContainer}>
          <h2>廣告慈善家</h2>
          <div className={styles.badgeContainer}>
            {data?.advertiserWatchedTimes?.total_advertising_watch_times ? (
              <>
                <img className={styles.badgesImg} src={`/photos/organisation/${convertRankToImg(badgeObj?.advertising_philanthropist?.rank!)}`} alt="" />
                <div className={styles.badgeDescription}>
                  你一共觀看了{data?.advertiserWatchedTimes?.total_advertising_watch_times}次廣告，得到一枚廣告慈善家{convertRankToChinese(badgeObj?.advertising_philanthropist?.rank!)}徽章。
                </div>
              </>
            ) : (
              <>
                <div className={styles.badgesText}>尚未有徽章</div>
                <div className={styles.badgeDescription}>你一共觀看了0次廣告，未有得到廣告慈善家徽章。</div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <NewNavbar /> */}
    </MantineProvider>
  );
}
