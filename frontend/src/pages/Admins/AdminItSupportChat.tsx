import { useNavigate } from "react-router-dom";
import styles from "../../css/animalHelpChat.module.scss";
import {
  HiChevronLeft,
  HiOutlineShare,
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiCalendar,
} from "react-icons/hi";
import { MantineProvider, Tabs, Button, Checkbox, TextInput } from "@mantine/core";
import { sizes } from "@mantine/core/lib/ActionIcon/ActionIcon.styles";
import { ApplicationContainer } from "../../components/ScheduleComponents";
import { IconCamera, IconSend } from "@tabler/icons";

export default function ItHelpFunction() {
  const navigate = useNavigate();
  return (
    <MantineProvider
    theme={{
      colors: {
        ocean: [
          "#F7BB93",
          "#F7BB93",
          "#F7BB93",
          "#F7BB93",
          "#F7BB93",
          "#F7BB93",
          "#F7BB93",
          "#F7BB93",
          "#F7BB93",
          "#F7BB93",
        ],
      },
    }}
  >

    <div>

      <div>
        <div className={styles.chevronAndAdjustmntIcon}>
          <HiChevronLeft className={styles.chevronIcon} />
        </div>

        <div className={styles.conversationContainer}>

          <div className={styles.dateTab}>今天</div>

          <div className={styles.clientSideBigContainer}>
            <div className={styles.clientSideContainer}>
              <div className={styles.clientSide}>有bug</div>
            </div>
          </div>
          <div className={styles.supportSideContainer}>
            <div className={styles.supportSide}>有咩可以幫到你？</div>
          </div>

          <div className={styles.supportSideContainer}>
            <div className={styles.supportSide}>有咩可以幫到你？</div>
          </div>  <div className={styles.supportSideContainer}>
            <div className={styles.supportSide}>有咩可以幫到你？</div>
          </div>  <div className={styles.supportSideContainer}>
            <div className={styles.supportSide}>app有咩bug？ </div>
          </div>  

          <Button style={{ width: 230, height: 34, color: "black", fontSize: 14, marginLeft: 100, marginTop: 130, borderRadius: 10, marginBottom: 80}} color="ocean" >技術問題已經解決，結束對話。</Button>
        </div>

        <div className={styles.textBigContainer}>
          <div className={styles.textContainer}>
            <IconCamera className={styles.textInputIconLeft} size={27} />

            <TextInput
              className={styles.textInputClass}
              placeholder="輸入文字"
              style={{ width: 290 }}
            />

            <IconSend className={styles.textInputIconRight} size={25} />
          </div>
        </div>

      </div>
    </div>
  </MantineProvider>
  );
}