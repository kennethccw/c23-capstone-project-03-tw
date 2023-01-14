import { useForm } from "react-hook-form";
import { Input, PasswordInput, Checkbox, MantineProvider, Button } from "@mantine/core";
import { IconLock, IconCircleX, IconMail, IconUser, IconArrowNarrowRight } from "@tabler/icons";
import styles from "../css/login.module.scss";
export default function Login() {
  const { register, watch } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const watchUsername = watch("username");
  const regexUsername = /^[A-Za-z0-9]+$/.test(watchUsername);
  const isCorrectFormatUsername = /^[A-Za-z0-9]+$/.test(watchUsername) && watchUsername.length <= 16 && watchUsername.length >= 6;

  const watchEmail = watch("email");
  const isCorrectFormatEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(watchEmail);

  const watchPassword = watch("password");
  const regexBothCases = new RegExp("^(?=.*[a-z])(?=.*[A-Z])");
  const regexNumberAndSymbol = new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])");
  const isCorrectFormatPassword = !(watchPassword.length < 8) && regexBothCases.test(watchPassword) && regexNumberAndSymbol.test(watchPassword);

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
            styles: (theme) => ({
              input: { borderColor: theme.colors.violet[theme.fn.primaryShade()] },
            }),
          },

          Checkbox: {
            styles: (theme) => ({
              label: { marginTop: -8 },
            }),
          },
        },
      }}
    >
      <div>
        <h1 className="text-3xl font-bold">創建帳戶</h1>
        <form className={styles.formContainer}>
          {isCorrectFormatUsername ? (
            <Input.Wrapper className={styles.input} label="帳戶名稱" withAsterisk>
              <Input radius="md" size="md" placeholder="輸入帳戶名稱" type="text" icon={<IconUser size={16} />} {...register("username", { required: true })} />
            </Input.Wrapper>
          ) : (
            <Input.Wrapper className={styles.input} label="帳戶名稱" withAsterisk>
              <Input radius="md" size="md" placeholder="輸入帳戶名稱" type="text" icon={<IconUser size={16} />} {...register("username", { required: true })} invalid />
            </Input.Wrapper>
          )}

          <div className={styles.validationAllContainer}>
            {!(watchUsername.length <= 16 && watchUsername.length >= 6) && (
              <div className={styles.validationContainer}>
                <IconCircleX className={styles.validationIcon} /> <span>長度為6個字符至16個字符之間</span>
              </div>
            )}
            {!regexUsername && (
              <div className={styles.validationContainer}>
                <IconCircleX className={styles.validationIcon} /> <span>只可由大、小寫字母以及數字組成</span>
              </div>
            )}
          </div>

          {isCorrectFormatEmail ? (
            <Input.Wrapper className={styles.input} label="電子郵件" withAsterisk>
              <Input radius="md" size="md" placeholder="輸入電子郵件" type="email" icon={<IconMail size={16} />} {...register("email", { required: true })} />
            </Input.Wrapper>
          ) : (
            <Input.Wrapper className={styles.input} label="電子郵件" withAsterisk>
              <Input radius="md" size="md" placeholder="輸入電子郵件" type="email" icon={<IconMail size={16} />} {...register("email", { required: true })} invalid />
            </Input.Wrapper>
          )}
          <div className={styles.validationAllContainer}>
            {!isCorrectFormatEmail && (
              <div className={styles.validationContainer}>
                <IconCircleX className={styles.validationIcon} /> <span>請輸入正確的電子郵件帳戶</span>
              </div>
            )}
          </div>

          {isCorrectFormatPassword ? (
            <PasswordInput
              className={styles.input}
              radius="md"
              size="md"
              placeholder="輸入帳號密碼"
              label="密碼"
              icon={<IconLock size={16} />}
              {...register("password", { required: true })}
              withAsterisk
            />
          ) : (
            <PasswordInput
              className={styles.input}
              radius="md"
              size="md"
              placeholder="輸入帳號密碼"
              label="密碼"
              icon={<IconLock size={16} />}
              {...register("password", { required: true })}
              error
              withAsterisk
            />
          )}

          <div className={styles.validationAllContainer}>
            {!(watchPassword.length < 8) ? null : (
              <div className={styles.validationContainer}>
                <IconCircleX className={styles.validationIcon} /> <span>至少8個字符</span>
              </div>
            )}

            {regexBothCases.test(watchPassword) ? null : (
              <div className={styles.validationContainer}>
                <IconCircleX className={styles.validationIcon} /> <span>包括大寫及小寫字母</span>
              </div>
            )}

            {regexNumberAndSymbol.test(watchPassword) ? null : (
              <div className={styles.validationContainer}>
                <IconCircleX className={styles.validationIcon} /> <span>至少一個數字和符號 (!, @, #, $, %, ^, &, *)</span>
              </div>
            )}
          </div>
          <Checkbox className={`${styles.input} ${styles.checkbox}`} label="當你繼續登記帳號，即代表你同意Petscue的服務條款，私穩政策及個人資料收集聲明。" color="violet" />
          <Button className={styles.button} color="violet" radius="xl" type="submit">
            <span>註冊</span>
            <IconArrowNarrowRight className={styles.registerIcon} />
          </Button>
        </form>
      </div>
    </MantineProvider>
  );
}
