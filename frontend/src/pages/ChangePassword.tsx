import { Button, MantineProvider, PasswordInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "../css/changePassword.module.scss";
import { IconLock, IconCircleX, IconArrowNarrowRight } from "@tabler/icons";

export default function ChangePassword() {
  const { register, watch } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const navigate = useNavigate();

  const watchPassword = watch("password");
  const regexBothCases = new RegExp("^(?=.*[a-z])(?=.*[A-Z])");
  const regexNumberAndSymbol = new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])");
  const isCorrectFormatPassword = (!(watchPassword.length < 8) && regexBothCases.test(watchPassword) && regexNumberAndSymbol.test(watchPassword)) || watchPassword === "";

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
        },
      }}
    >
      <div className={styles.containerForAll}>
        <h1 className={styles.header}>輸入新密碼</h1>
        <form className={styles.formContainer}>
          <div>
            {isCorrectFormatPassword ? (
              <PasswordInput
                height={48}
                className={`${styles.input} ${styles.passwordInput}`}
                radius="md"
                size="md"
                placeholder="輸入帳號密碼"
                label="密碼"
                icon={<IconLock size={16} />}
                {...register("password", { required: true })}
              />
            ) : (
              <PasswordInput
                className={`${styles.input} ${styles.passwordInput}`}
                radius="md"
                size="md"
                placeholder="輸入帳號密碼"
                label="密碼"
                icon={<IconLock size={16} />}
                {...register("password", { required: true })}
                error
              />
            )}

            <div className={styles.validationAllContainer}>
              {watchPassword.length < 8 && watchPassword !== "" && (
                <div className={styles.validationContainer}>
                  <IconCircleX className={styles.validationIcon} /> <span>至少8個字符</span>
                </div>
              )}

              {!regexBothCases.test(watchPassword) && watchPassword !== "" && (
                <div className={styles.validationContainer}>
                  <IconCircleX className={styles.validationIcon} /> <span>包括大寫及小寫字母</span>
                </div>
              )}

              {!regexNumberAndSymbol.test(watchPassword) && watchPassword !== "" && (
                <div className={styles.validationContainer}>
                  <IconCircleX className={styles.validationIcon} /> <span>至少一個數字和符號 (!, @, #, $, %, ^, &, *)</span>
                </div>
              )}
            </div>
          </div>
          <Button
            className={styles.button}
            color="violet"
            radius="xl"
            type="submit"
            onClick={() => {
              navigate("/");
            }}
          >
            <div>確認新密碼</div>
            <IconArrowNarrowRight className={styles.rightArrowIcon} />
          </Button>
        </form>
      </div>
    </MantineProvider>
  );
}
