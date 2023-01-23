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
import {
  MantineProvider,
  Tabs,
  Button,
  Checkbox,
  TextInput,
} from "@mantine/core";
import { sizes } from "@mantine/core/lib/ActionIcon/ActionIcon.styles";
import { ApplicationContainer } from "../../components/ScheduleComponents";
import { IconCamera, IconSend } from "@tabler/icons";
import { OrganisationNavbar } from "../../components/NavBarforOrganisation";

export default function AdminsHelpToDoListfrom() {
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
          <div className={styles.chevronIconContainer}>
            <HiChevronLeft className={styles.chevronIconTab} />
          </div>
        </div>

        <div>
          <div className={styles.taskContanier}>
            <div className={styles.taskTab}>你有2個信息來自保護動物協會</div>
          </div>
          <div className={styles.statusContainer}>
            <div className={styles.statusTab}>問題已經解決</div>
          </div>
        </div>
      </div>
      <OrganisationNavbar />
    </MantineProvider>
  );
}
