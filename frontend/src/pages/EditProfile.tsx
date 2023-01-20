import { Button, Checkbox, Input, MantineProvider, Select } from "@mantine/core";
// import { DatePicker } from "@mantine/dates";
import InputMask from "react-input-mask";
import { IconArrowNarrowRight, IconChevronDown, IconCircleX } from "@tabler/icons";
import { useForm } from "react-hook-form";
import { HiXMark } from "react-icons/hi2";
import styles from "../css/editProfile.module.scss";
import NewNavbar from "../components/NewNavbar";
export default function EditProfile() {
  const { register, watch } = useForm({
    defaultValues: {
      username: "",
      email: "",
      mobile: "",
      birthday: "",
      gender: "",
    },
  });

  const watchUsername = watch("username");
  const regexUsername = /^[A-Za-z0-9]+$/.test(watchUsername);
  const isCorrectFormatUsername = (/^[A-Za-z0-9]+$/.test(watchUsername) && watchUsername.length <= 16 && watchUsername.length >= 6) || watchUsername === "";

  const watchEmail = watch("email");
  const isCorrectFormatEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(watchEmail) || watchEmail === "";

  const watchMobile = watch("mobile");
  const isMobileInvalid = (watchMobile.length !== 8 || !/^[0-9]+$/.test(watchMobile)) && watchMobile !== "";
  const watchBirthday = watch("birthday");
  const isBirthdayInvalid = (new Date(watchBirthday).toString() === "Invalid Date" || new Date(watchBirthday) > new Date()) && watchBirthday !== "" && watchBirthday !== "____-__-__";
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
          <span>編輯帳戶</span>
        </div>
        <hr className={styles.headerHr} />

        <div className={styles.forFlex100vw}>
          <div className={styles.forFlex312px}>
            <h3>帳戶資料</h3>
          </div>
        </div>
        <form className={styles.formContainer}>
          {isCorrectFormatUsername ? (
            <Input.Wrapper id="username" className={styles.input} label="帳戶名稱" withAsterisk>
              <Input id="username" radius="md" size="md" placeholder="輸入帳戶名稱" type="text" {...register("username", { required: true })} />
            </Input.Wrapper>
          ) : (
            <Input.Wrapper id="username" className={styles.input} label="帳戶名稱" withAsterisk>
              <Input id="username" radius="md" size="md" placeholder="輸入帳戶名稱" type="text" {...register("username", { required: true })} invalid />
              <div className={styles.validationAllContainer}>
                {!(watchUsername.length <= 16 && watchUsername.length >= 6) && watchUsername !== "" && <div className={styles.validationText}>長度為6個字符至16個字符之間</div>}
                {!regexUsername && watchUsername !== "" && <div className={styles.validationText}>只可由大、小寫字母以及數字組成</div>}
              </div>
            </Input.Wrapper>
          )}

          {isCorrectFormatEmail ? (
            <Input.Wrapper id="email" className={styles.input} label="電子郵件" withAsterisk>
              <Input id="email" radius="md" size="md" placeholder="輸入電子郵件" type="email" {...register("email", { required: true })} />
            </Input.Wrapper>
          ) : (
            <Input.Wrapper id="email" className={styles.input} label="電子郵件" withAsterisk error="請輸入正確的電子郵件帳戶">
              <Input id="email" radius="md" size="md" placeholder="輸入電子郵件" type="email" {...register("email", { required: true })} invalid />
            </Input.Wrapper>
          )}

          {isMobileInvalid ? (
            <Input.Wrapper id="mobile" className={styles.input} label="聯絡電話" withAsterisk error="請輸入正確的聯絡電話">
              <Input id="mobile" radius="md" size="md" placeholder="輸入聯絡電話" type="text" {...register("mobile", { required: true })} invalid />
            </Input.Wrapper>
          ) : (
            <Input.Wrapper id="mobile" className={styles.input} label="聯絡電話" withAsterisk>
              <Input id="mobile" radius="md" size="md" placeholder="輸入聯絡電話" type="text" {...register("mobile", { required: true })} />
            </Input.Wrapper>
          )}

          {isBirthdayInvalid ? (
            <Input.Wrapper id="birthday" className={styles.input} label="出生日子" required error="請輸入正確的生日日期 (格式為YYYY-MM-DD)">
              <Input id="birthday" radius="md" size="md" component={InputMask} mask="9999-99-99" placeholder="輸入出生日子" {...register("birthday", { required: true })} invalid />
            </Input.Wrapper>
          ) : (
            <Input.Wrapper id="birthday" className={styles.input} label="出生日子" required>
              <Input id="birthday" radius="md" size="md" component={InputMask} mask="9999-99-99" placeholder="輸入出生日子" {...register("birthday", { required: true })} />
            </Input.Wrapper>
          )}

          <Select
            radius="md"
            size="md"
            className={styles.input}
            color="petscue-purple"
            label="性別"
            placeholder="選擇你的性別"
            rightSection={<IconChevronDown size={14} />}
            rightSectionWidth={30}
            styles={{ rightSection: { pointerEvents: "none" } }}
            data={[
              { value: "male", label: "男" },
              { value: "female", label: "女" },
              { value: "others", label: "其他或不提供" },
            ]}
          />
          <Checkbox className={`${styles.input} ${styles.checkbox}`} label="我同意根據私隱政策中所列出的原因使用我的個人資料作推廣，收取會員通訊及最新資訊用途。" color="petscue-purple" />
          <Button className={styles.button} color="violet" radius="xl" type="submit">
            <div>更新個人資料</div>
            <IconArrowNarrowRight className={styles.rightArrowIcon} />
          </Button>
        </form>
        <NewNavbar />
      </div>
    </MantineProvider>
  );
}
