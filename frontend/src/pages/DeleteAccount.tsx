import { Button, MantineProvider } from "@mantine/core";
import styles from "../css/deleteAccount.module.scss";
import { HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
export default function PrivacyAndSecurity() {
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
          <HiXMark className={styles.closingIcon} />
          <span>刪除帳戶</span>
        </div>
        <hr className={styles.headerHr} />
        <div className={styles.forFlexColumn}>
          <div className={styles.deleteAccountTitle}>感謝你一直以來對Petscue的支持。</div>
          <div className={styles.deleteAccountContent}>請注意，帳戶刪除後，你的報名紀錄和義工紀錄也會一併刪除，也會取消所有機構會員連結。</div>
          <Button
            className={styles.button}
            color="violet"
            radius="xl"
            onClick={() => {
              navigate("/register");
            }}
          >
            確定刪除
          </Button>
        </div>
      </div>
    </MantineProvider>
  );
}
