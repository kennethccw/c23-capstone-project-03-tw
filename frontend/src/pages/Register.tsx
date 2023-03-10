import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, PasswordInput, Checkbox, MantineProvider, Button } from "@mantine/core";
import { IconLock, IconCircleX, IconMail, IconUser, IconArrowNarrowRight } from "@tabler/icons";
import styles from "../css/login.module.scss";
export default function Register() {
  const { register, watch } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const watchUsername = watch("username");
  const regexUsername = /^[A-Za-z0-9]+$/.test(watchUsername);
  const isCorrectFormatUsername = (/^[A-Za-z0-9]+$/.test(watchUsername) && watchUsername.length <= 16 && watchUsername.length >= 6) || watchUsername === "";

  const watchEmail = watch("email");
  const isCorrectFormatEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(watchEmail) || watchEmail === "";

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
            styles: (theme) => ({
              input: { borderColor: theme.colors.violet[theme.fn.primaryShade()] },
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
        <h1 className={styles.header}>創建帳戶</h1>
        <form className={styles.formContainer}>
          {isCorrectFormatUsername ? (
            <Input.Wrapper id="username" className={styles.input} label="帳戶名稱" withAsterisk>
              <Input id="username" radius="md" size="md" placeholder="輸入帳戶名稱" type="text" icon={<IconUser size={16} />} {...register("username", { required: true })} />
            </Input.Wrapper>
          ) : (
            <Input.Wrapper id="username" className={styles.input} label="帳戶名稱" withAsterisk>
              <Input id="username" radius="md" size="md" placeholder="輸入帳戶名稱" type="text" icon={<IconUser size={16} />} {...register("username", { required: true })} invalid />
            </Input.Wrapper>
          )}

          <div className={styles.validationAllContainer}>
            {!(watchUsername.length <= 16 && watchUsername.length >= 6) && watchUsername !== "" && (
              <div className={styles.validationContainer}>
                <IconCircleX className={styles.validationIcon} /> <span>長度為6個字符至16個字符之間</span>
              </div>
            )}
            {!regexUsername && watchUsername !== "" && (
              <div className={styles.validationContainer}>
                <IconCircleX className={styles.validationIcon} /> <span>只可由大、小寫字母以及數字組成</span>
              </div>
            )}
          </div>

          {isCorrectFormatEmail ? (
            <Input.Wrapper id="email" className={styles.input} label="電子郵件" withAsterisk>
              <Input id="email" radius="md" size="md" placeholder="輸入電子郵件" type="email" icon={<IconMail size={16} />} {...register("email", { required: true })} />
            </Input.Wrapper>
          ) : (
            <Input.Wrapper id="email" className={styles.input} label="電子郵件" withAsterisk>
              <Input id="email" radius="md" size="md" placeholder="輸入電子郵件" type="email" icon={<IconMail size={16} />} {...register("email", { required: true })} invalid />
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
          <Checkbox className={`${styles.input} ${styles.checkbox}`} label="當你繼續登記帳號，即代表你同意Petscue的服務條款，私穩政策及個人資料收集聲明。" color="violet" />
          <Button className={styles.button} color="violet" radius="xl" type="submit">
            <span>註冊</span>
            <IconArrowNarrowRight className={styles.registerIcon} />
          </Button>
        </form>
        <div className={styles.separator}>
          <span className={styles.separatorText}>或</span>
        </div>
        <div className={styles.oauthContainer}>
          <div className={styles.oauthIcon}>
            <a href="/connect/google">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </a>
          </div>
          <div className={styles.oauthIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
              <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#2aa4f4"></stop>
                <stop offset="1" stop-color="#007ad9"></stop>
              </linearGradient>
              <path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path>
              <path
                fill="#fff"
                d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
              ></path>
            </svg>
          </div>
        </div>
        <div className={styles.loginContainer}>
          <span className={styles.loginText}>現有帳號?</span>
          <Button
            className={styles.loginText}
            variant="subtle"
            color="violet"
            onClick={() => {
              navigate("/login");
            }}
          >
            登入
          </Button>
        </div>
      </div>
    </MantineProvider>
  );
}
