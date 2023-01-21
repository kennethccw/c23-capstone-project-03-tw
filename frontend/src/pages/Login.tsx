import { Input, PasswordInput, Button, MantineProvider } from "@mantine/core";
import { IconUser, IconMail, IconLock, IconArrowNarrowRight } from "@tabler/icons";
import { useForm } from "react-hook-form";
import { FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "../css/login.module.scss";
import { loginThunk } from "../redux/auth/thunk";
import { useRootDispatch } from "../redux/store";

export default function Login() {
  const { register, watch, getValues } = useForm({ defaultValues: { userIdentity: "", password: "" } });
  const navigate = useNavigate();
  const watchUserIdentity = watch("userIdentity");
  const dispatch = useRootDispatch();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginThunk({ userIdentity: watchUserIdentity, password: getValues().password }))
      .unwrap()
      .then(() => navigate("/home"))
      .catch((err) => {
        alert(err.message);
      });
  };

  const onFacebookLogin = (event: React.MouseEvent) => {
    event.preventDefault();
    const authURL = "https://www.facebook.com/dialog/oauth";
    const search = new URLSearchParams();
    search.set("client_id", process.env.REACT_APP_FACEBOOK_APP_ID + "");
    search.set("redirect_uri", `${window.location.origin}/facebook-callback`);
    search.set("response_type", "code");
    search.set("state", "");
    search.set("scope", "email,public_profile");
    window.location.href = `${authURL}?${search.toString()}`;
  };
  const onGoogleLogin = (event: React.MouseEvent) => {
    event.preventDefault();
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/connect/google`;
  };

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
      <div className={styles.loginPageContainer}>
        <h1 className={styles.header}>Petscue歡迎你！</h1>
        <form className={styles.formContainer} onSubmit={submitHandler}>
          {watchUserIdentity.includes("@") ? (
            <Input.Wrapper id="user-identity" className={styles.input} label="帳戶名稱 / 電子郵件">
              <Input id="user-identity" radius="md" size="md" placeholder="輸入帳戶名稱或電子郵件" type="text" icon={<IconMail size={16} />} {...register("userIdentity", { required: true })} />
            </Input.Wrapper>
          ) : (
            <Input.Wrapper id="user-identity" className={styles.input} label="帳戶名稱 / 電子郵件">
              <Input id="user-identity" radius="md" size="md" placeholder="輸入帳戶名稱或電子郵件" type="text" icon={<IconUser size={16} />} {...register("userIdentity", { required: true })} />
            </Input.Wrapper>
          )}
          <PasswordInput
            className={`${styles.input} ${styles.passwordInput}`}
            radius="md"
            size="md"
            placeholder="輸入帳號密碼"
            label="密碼"
            icon={<IconLock size={16} />}
            {...register("password", { required: true })}
          />
          <div className={styles.forFlexColumn}>
            <Button
              className={`${styles.loginText} ${styles.forgetPasswordBtn}`}
              variant="subtle"
              color="violet"
              onClick={() => {
                navigate("/password/email");
              }}
            >
              忘記密碼?
            </Button>
            <Button className={styles.button} color="violet" radius="xl" type="submit">
              <div>登入</div>
              <IconArrowNarrowRight className={styles.rightArrowIcon} />
            </Button>
          </div>
        </form>
        <div className={styles.separator}>
          <span className={styles.separatorText}>或</span>
        </div>
        <div className={styles.oauthContainer}>
          <div className={styles.oauthIcon} onClick={onGoogleLogin}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48" className={styles.googleIcon}>
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
            </div>
          </div>
          <div className={styles.oauthIcon} onClick={onFacebookLogin}>
            <FaFacebookF className={styles.facebookLogo} />
          </div>
          {/* <ReactFacebookLogin appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""} autoLoad={false} fields="name, email, picture" onlick={fbOnClick}/> */}
        </div>
        <div className={styles.loginContainer}>
          <span className={styles.loginText}>新用戶</span>
          <Button
            className={styles.loginText}
            variant="subtle"
            color="violet"
            onClick={() => {
              navigate("/register");
            }}
          >
            註冊
          </Button>
        </div>
      </div>
    </MantineProvider>
  );
}
