import { Button, MantineProvider, Input } from "@mantine/core";
import { IconMail, IconCircleX, IconArrowNarrowRight } from "@tabler/icons";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom'
import styles from "../css/login.module.scss";

export default function ForgetPassword() {
  const { register, watch } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const navigate = useNavigate()
  const watchEmail = watch("email");
  const isCorrectFormatEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(watchEmail) || watchEmail === "";
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
      <div className={styles.inputEmailContainer}>
        <h1 className={styles.header}>輸入電子郵件</h1>
        <div className={styles.inputEmailText}>你將會收到一個鏈接，用於確認所提供的電子郵件的密碼更改。</div>
        <form className={styles.formContainer}>
          {isCorrectFormatEmail ? (
            <Input.Wrapper id="email" className={styles.input} label="電子郵件">
              <Input id="email" radius="md" size="md" placeholder="輸入電子郵件" type="email" icon={<IconMail size={16} />} {...register("email", { required: true })} />
            </Input.Wrapper>
          ) : (
            <Input.Wrapper id="email" className={styles.input} label="電子郵件">
              <Input id="email" radius="md" size="md" placeholder="輸入電子郵件" type="email" icon={<IconMail size={16} />} {...register("email", { required: true })} invalid />
            </Input.Wrapper>
          )}
          <div className={`${styles.validationAllContainer} ${styles.resetInputEmailValidation}`}>
            {!isCorrectFormatEmail && (
              <div className={styles.validationContainer}>
                <IconCircleX className={styles.validationIcon} /> <span>請輸入正確的電子郵件帳戶</span>
              </div>
            )}
          </div>
          <Button className={styles.button} color="violet" radius="xl" type="submit" onClick={() => {navigate('/password/reset')}}>
            <span>確認電子郵件</span>
            <IconArrowNarrowRight className={styles.registerIcon} />
          </Button>
        </form>
      </div>
    </MantineProvider>
  );
}
