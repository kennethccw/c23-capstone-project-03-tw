import { Button, Checkbox, Input, LoadingOverlay, MantineProvider, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import InputMask from "react-input-mask";
import { IconArrowNarrowRight, IconChevronDown, IconCircleX } from "@tabler/icons";
import { useForm } from "react-hook-form";
import { HiXMark } from "react-icons/hi2";
import styles from "../css/activityApplication.module.scss";
import NewNavbar from "../components/NewNavbar";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getProfile, putProfile } from "../api/profileAPI";
import { fetchJson } from "../api/utilsAPI";
import { useNavigate } from "react-router-dom";
import { getValue } from "@testing-library/user-event/dist/utils";
import { postActivityApplication } from "../api/activityAPI";
export default function ActivityApplication() {
  enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "others",
  }
  interface Profile {
    username: string;
    email: string;
    mobile?: string;
    birthday?: Date;
    gender?: string;
  }

  const params = new URLSearchParams(document.location.search);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["activity/application"],
    queryFn: getProfile,
    // refetchInterval: 5_000,
    // staleTime: 10_000,
    // retry: 1,
  });

  // const { isLoading, isError, data, error } = useQuery("profile", () =>
  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/user/profile`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   })
  // );
  const { register, watch, getValues, setValue } = useForm({
    defaultValues: { fullname: data?.fullname || "", username: data?.username || "", email: data?.email || "", mobile: data?.mobile || "", birthday: data?.birthday || "", checkbox: false },

    // username: data?.username || "",
    // email: data?.email || "",
    // mobile: data?.mobile || "",
    // birthday: data?.birthday || "",
    // gender: data?.gender || "",
    // checkbox: false,
    // },
  });
  const [gender, setGender] = useState(data?.gender || "");
  useEffect(() => {
    if (!isLoading) {
      setValue("username", data?.username || "");
      setValue("email", data?.email || "");
      setValue("mobile", data?.mobile || "");
      setValue(
        "birthday",
        data?.birthday
          ? `${new Date(data.birthday).getFullYear().toString().padStart(2, "0")}-${(new Date(data.birthday).getMonth() + 1).toString().padStart(2, "0")}-${new Date(data.birthday)
              .getDate()
              .toString()
              .padStart(2, "0")}`
          : ""
      );
      setValue("fullname", data?.fullname || "");
      console.log(data?.gender);
      setGender(data?.gender || "");
    }
  }, [data]);

  console.log(data, "react query data");
  console.log(isError, "react query error");

  const watchUsername = watch("username");
  const regexUsername = /^[A-Za-z0-9]+$/.test(watchUsername);
  const isCorrectFormatUsername = (/^[A-Za-z0-9]+$/.test(watchUsername) && watchUsername.length <= 16 && watchUsername.length >= 6) || watchUsername === "";

  const watchEmail = watch("email");
  const isCorrectFormatEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(watchEmail) || watchEmail === "";

  const watchMobile = watch("mobile");
  const isMobileInvalid = (watchMobile.length !== 8 || !/^[0-9]+$/.test(watchMobile)) && watchMobile !== "";
  const watchBirthday = watch("birthday");
  const isBirthdayInvalid = (new Date(watchBirthday).toString() === "Invalid Date" || new Date(watchBirthday) > new Date()) && watchBirthday !== "" && watchBirthday !== "____-__-__";

  console.log(watchBirthday);

  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !isCorrectFormatUsername ||
      !isCorrectFormatEmail ||
      isMobileInvalid ||
      isBirthdayInvalid ||
      watchUsername === "" ||
      watchEmail === "" ||
      watchMobile === "" ||
      watchBirthday === "" ||
      gender === ""
    ) {
      alert("請正確輸入再遞交");
      return;
    }
    if (!getValues().checkbox) {
      alert("請先同意Petscue的服務條款，私穩政策及個人資料收集聲明，再遞交");
      return;
    }
    const profile = { fullname: getValues().fullname, username: watchUsername, email: watchEmail, mobile: watchMobile, birthday: new Date(watchBirthday), gender: gender };
    const resp = await postActivityApplication(params.get("id")!, profile);
    const result = await resp.json();
    if (resp.status === 200 && !result.message) {
      localStorage.setItem("username", watchUsername);
      navigate("/application/success");
    } else {
      localStorage.setItem("username", watchUsername);
      alert(result.message);
    }
  };
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
        <LoadingOverlay visible={isLoading} overlayBlur={2} />

        <div className={styles.header}>
          <HiXMark className={styles.closingIcon} onClick={() => navigate(-1)} />
          <span>活動申請表</span>
        </div>
        <hr className={styles.headerHr} />

        {/* <div className={styles.forFlex100vw}>
          <div className={styles.forFlex312px}>
            <h3>帳戶資料</h3>
          </div>
        </div> */}
        <form className={styles.formContainer} onSubmit={submitHandler}>
          <Input.Wrapper id="email" className={styles.input} label="電子郵件" error={isCorrectFormatEmail ? undefined : "請輸入正確的電子郵件帳戶"}>
            <Input id="email" radius="md" size="md" placeholder="輸入電子郵件" type="email" {...register("email", { required: true })} invalid={isCorrectFormatEmail ? undefined : true} />
          </Input.Wrapper>
          <Input.Wrapper id="username" className={styles.input} label="帳戶名稱">
            <Input id="username" radius="md" size="md" placeholder="輸入帳戶名稱" type="text" {...register("username", { required: true })} invalid={isCorrectFormatUsername ? undefined : true} />
            <div className={styles.validationAllContainer}>
              {!(watchUsername.length <= 16 && watchUsername.length >= 6) && watchUsername !== "" && <div className={styles.validationText}>長度為6個字符至16個字符之間</div>}
              {!regexUsername && watchUsername !== "" && <div className={styles.validationText}>只可由大、小寫字母以及數字組成</div>}
            </div>
          </Input.Wrapper>
          <Input.Wrapper id="fullname" className={styles.input} label="中文或英文全寫">
            <Input id="fullname" radius="md" size="md" placeholder="輸入中文或英文全寫" type="text" {...register("fullname", { required: true })} />
          </Input.Wrapper>

          <Input.Wrapper id="mobile" className={styles.input} label="聯絡電話" error={isMobileInvalid ? "請輸入正確的聯絡電話" : undefined}>
            <Input id="mobile" radius="md" size="md" placeholder="輸入聯絡電話" type="text" {...register("mobile", { required: true })} invalid={isMobileInvalid ? true : undefined} />
          </Input.Wrapper>

          <Input.Wrapper id="birthday" className={styles.input} label="出生日子" error={isBirthdayInvalid ? "請輸入正確的生日日期 (格式為YYYY-MM-DD)" : undefined}>
            <Input
              id="birthday"
              radius="md"
              size="md"
              component={InputMask}
              mask="9999-99-99"
              placeholder="輸入出生日子"
              {...register("birthday", { required: true })}
              invalid={isBirthdayInvalid ? true : undefined}
            />
          </Input.Wrapper>

          <Select
            onChange={(value: Gender) => setGender(value)}
            value={gender}
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
          <Checkbox
            className={`${styles.input} ${styles.checkbox}`}
            label="我同意根據私隱政策中所列出的原因使用我的個人資料作推廣，收取會員通訊及最新資訊用途。"
            color="petscue-purple"
            {...register("checkbox", { required: true })}
          />
          <Button className={styles.button} color="violet" radius="xl" type="submit">
            <div>遞交報名表格</div>
            <IconArrowNarrowRight className={styles.rightArrowIcon} />
          </Button>
        </form>
        {/* <NewNavbar activeBtn="user" /> */}
      </div>
    </MantineProvider>
  );
}
