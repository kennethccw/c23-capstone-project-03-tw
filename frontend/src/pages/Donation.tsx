import { Button, Input, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IoIosArrowBack } from "react-icons/io";
import styles from "../css/login.module.scss";
import { useEffect } from "react";
import { IconArrowNarrowRight } from "@tabler/icons";

export default function Donation() {
  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      mobile: "",
      donation: 1000,
    },

    validate: {
      email: (value) => (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(value) ? null : "請輸入正確的電子郵件帳戶"),
      mobile: (value) => (/^(\d{8,8})+$/.test(value) ? null : "請輸入正確的電話號碼"),
      donation: (value) => (value > 20 ? null : "最少捐款港幣20元"),
    },
  });

  if (!form.isValid("donation")) {
    form.setFieldError("donation", "請輸入正確的電話號碼");
  }

  return (
    <div>
      <IoIosArrowBack className={styles.navigateBackButton} />
      <div className={styles.adoptionDetailHeaderContainer}>
        <h1>捐款樂</h1>
      </div>
      <hr className={styles.adoptionDetailHr} />
      <form action="">
        <Input.Wrapper id="full-name" className={styles.input} label="捐款人全名">
          <Input id="full-name" radius="md" size="md" type="text" />
        </Input.Wrapper>
        <Input.Wrapper id="email" className={styles.input} label="電子郵件">
          <Input id="email" radius="md" size="md" type="text" />
        </Input.Wrapper>
        <Input.Wrapper id="mobile" className={styles.input} label="聯繫電話">
          <Input id="mobile" radius="md" size="md" type="text" />
        </Input.Wrapper>
        <NumberInput className={styles.input} min={20} defaultValue={1000} step={10} label="HKD" id="donation" radius="md" size="md" />
        <Button className={styles.button} color="violet" radius="xl" type="submit">
          <span>下一步信用卡填寫</span>
          <IconArrowNarrowRight className={styles.registerIcon} />
        </Button>
      </form>
    </div>
  );
}
