import { Button, Checkbox, Input, MantineProvider, Textarea } from "@mantine/core";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import styles from "../css/login.module.scss";
import { useState } from "react";
import { IconArrowNarrowRight } from "@tabler/icons";

export default function Adoption() {
  const { register, watch } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      remark: "",
    },
  });

  return (
    <MantineProvider
      inherit
      theme={{
        components: {
          InputWrapper: {
            styles: () => ({
              label: {
                fontSize: 14,
              },
            }),
          },
          Checkbox: {
            styles: () => ({
              label: { marginTop: -2 },
            }),
          },

          Input: {
            styles: () => ({
              input: { height: 54 },
            }),
          },
        },
      }}
    >
      <div>
        <IoIosArrowBack className={styles.navigateBackButton} />
        <div className={styles.adoptionDetailHeaderContainer}>
          <h1>領養申請</h1>
        </div>
        <hr className={styles.adoptionDetailHr} />
        <form action="">
          <Input.Wrapper id="full-name" className={styles.input} label="中文全名" withAsterisk>
            <Input id="full-name" radius="md" size="md" type="text" {...register("fullName", { required: true })} />
          </Input.Wrapper>
          <Input.Wrapper id="email" className={styles.input} label="電子郵件" error="" withAsterisk>
            <Input id="email" radius="md" size="md" type="text" {...register("email", { required: true })} />
          </Input.Wrapper>
          <Input.Wrapper id="mobile" className={styles.input} label="聯繫電話" withAsterisk>
            <Input id="mobile" radius="md" size="md" type="text" {...register("mobile", { required: true })} />
          </Input.Wrapper>

          <Textarea label="留言內容" withAsterisk autosize minRows={3} maxRows={7} {...register("remark", { required: false })} />
          <Button className={`${styles.button} ${styles.adoptionConfirmBtn}`} color="violet" radius="xl" type="submit">
            <span>確認遞交申請</span>
            <IconArrowNarrowRight className={styles.registerIcon} />
          </Button>
        </form>
      </div>
    </MantineProvider>
  );
}
