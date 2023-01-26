import { Button, MantineProvider } from "@mantine/core";
import styles from "../css/deletedMessage.module.scss";
import { useNavigate } from "react-router-dom";
export default function DeletedMessage() {
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
      <div className={styles.logoContainer}>
        <h3 className={styles.noticeText}>我們已經刪除你的帳戶</h3>
        <img className={styles.logo} src="photos/logo_pic-09-09.png" alt="" />
        <img className={styles.logoText} src="photos/logo_word-10.png" alt="" />
        <div className={styles.sologan}>你的帳戶已被刪除，我們希望你能回來並再次加入我們。</div>
        <Button
          className={styles.button}
          color="violet"
          radius="xl"
          onClick={() => {
            navigate("/register");
          }}
        >
          返回主頁
        </Button>
      </div>
    </MantineProvider>
  );
}
