import { Button, Checkbox, Input, MantineProvider } from "@mantine/core";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import styles from "../css/donation.module.scss";
import { useRef, useState } from "react";
import { IconArrowNarrowRight } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { postDonationRender } from "../api/donationAPI";

export default function Donation() {
  const { register, watch, getValues, setValue } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      donation: 0,
      checkbox: false,
    },
  });

  const watchDonation = watch("donation");
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const navigate = useNavigate();

  console.log(watchDonation);

  const watchEmail = watch("email");
  const isCorrectFormatEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(watchEmail) || watchEmail === "";

  const watchMobile = watch("mobile");
  const isMobileInvalid = (watchMobile.length !== 8 || !/^[0-9]+$/.test(watchMobile)) && watchMobile !== "";

  interface DonationForm {
    receipt_name: string;
    receipt_email: string;
    receipt_mobile: string;
    donation_amount: number;
  }

  const donationObj = useRef<DonationForm>();
  const stripeClientSecret = useRef<string>();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const receipt_name = getValues().fullName;
    const receipt_email = getValues().email;
    const receipt_mobile = getValues().mobile;
    let donation_amount = getValues().donation;
    if (typeof donation_amount === "string") {
      donation_amount = parseInt(donation_amount);
    }

    if (!isCorrectFormatEmail || isMobileInvalid || receipt_name === "" || receipt_email === "" || receipt_mobile === "" || donation_amount < 20) {
      return alert("請正確輸入再遞交");
    }

    if (!getValues().checkbox) {
      return alert("請先同意Petscue的服務條款，私穩政策及個人資料收集聲明，再遞交");
    }
    sessionStorage.setItem("receipt_name", receipt_name);
    sessionStorage.setItem("receipt_email", receipt_email);
    sessionStorage.setItem("receipt_mobile", receipt_mobile);
    donationObj.current = { receipt_name, receipt_email, receipt_mobile, donation_amount };

    const resp = await postDonationRender(donation_amount);
    const result = await resp.json();
    if (resp.status === 200) {
      // stripeClientSecret.current = result.clientSecret;
      navigate(`/donation/payment?stripe=${result.clientSecret}`);
    } else {
      if (result.message) {
        alert(result.message);
      }
    }
  };

  const [amountButton, setAmountButton] = useState<number>();

  const clickAmountBtnHandler = (amount: number) => {
    console.log(typeof amount);
    setAmountButton(amount);
    setValue("donation", amount);
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

          // Checkbox: {
          //   styles: () => ({
          //     label: { marginTop: -8 },
          //   }),
          // },
        },
      }}
    >
      <div>
        <IoIosArrowBack className={styles.navigateBackButton} onClick={() => navigate(-1)} />
        <div className={styles.donationHeaderContainer}>
          <h1>捐款樂</h1>
        </div>
        <hr className={styles.donationHr} />
        <form className={styles.containerForAll} onSubmit={submitHandler}>
          <Input.Wrapper id="full-name" className={styles.input} label="捐款人全名">
            <Input id="full-name" radius="md" size="md" type="text" placeholder="輸入中文或英文全名" {...register("fullName", { required: true })} />
          </Input.Wrapper>
          <Input.Wrapper id="email" className={styles.input} label="捐款人電子郵件" error={isCorrectFormatEmail ? undefined : "請輸入正確的電子郵件帳戶"}>
            <Input id="email" radius="md" size="md" placeholder="輸入電子郵件" type="email" {...register("email", { required: true })} invalid={isCorrectFormatEmail ? undefined : true} />
          </Input.Wrapper>
          <Input.Wrapper id="mobile" className={styles.input} label="捐款人聯絡電話" error={isMobileInvalid ? "請輸入正確的聯絡電話" : undefined}>
            <Input id="mobile" radius="md" size="md" placeholder="輸入聯絡電話" type="text" {...register("mobile", { required: true })} invalid={isMobileInvalid ? true : undefined} />
          </Input.Wrapper>

          <div className={styles.seperatorContainer}>
            <span>捐款</span>
            <hr className={styles.seperatorHr} />
          </div>
          <div className={styles.donationAmountBtnContainer}>
            <Button
              style={amountButton === 100 ? { backgroundColor: "#585ce5" } : undefined}
              variant={amountButton === 100 ? undefined : "outline"}
              className={styles.donationAmountBtn}
              color="violet"
              value={100}
              {...register("donation", { required: true })}
              onClick={() => {
                setIsCustomAmount(false);
                amountButton === 100 ? setAmountButton(undefined) : clickAmountBtnHandler(100);
              }}
            >
              <div style={amountButton === 100 ? { color: "#ffffff" } : undefined} className={styles.donationAmount}>
                100
              </div>
              <div style={amountButton === 100 ? { color: "#ffffff" } : undefined}>HKD</div>
            </Button>
            <Button
              style={amountButton === 200 ? { backgroundColor: "#585ce5" } : undefined}
              variant={amountButton === 200 ? undefined : "outline"}
              className={styles.donationAmountBtn}
              color="violet"
              value={200}
              {...register("donation", { required: true })}
              onClick={() => {
                setIsCustomAmount(false);
                amountButton === 200 ? setAmountButton(undefined) : clickAmountBtnHandler(200);
              }}
            >
              <div style={amountButton === 200 ? { color: "#ffffff" } : undefined} className={styles.donationAmount}>
                200
              </div>
              <div style={amountButton === 200 ? { color: "#ffffff" } : undefined}>HKD</div>
            </Button>
            <Button
              style={amountButton === 300 ? { backgroundColor: "#585ce5" } : undefined}
              variant={amountButton === 300 ? undefined : "outline"}
              className={styles.donationAmountBtn}
              color="violet"
              value={300}
              {...register("donation", { required: true })}
              onClick={() => {
                setIsCustomAmount(false);
                amountButton === 300 ? setAmountButton(undefined) : clickAmountBtnHandler(300);
              }}
            >
              <div style={amountButton === 300 ? { color: "#ffffff" } : undefined} className={styles.donationAmount}>
                300
              </div>
              <div style={amountButton === 300 ? { color: "#ffffff" } : undefined}>HKD</div>
            </Button>
          </div>
          {isCustomAmount ? (
            <div className={styles.otherDonationAmountContainer}>
              <span className={styles.otherDonationAmountLabel}>HKD</span>
              <Input.Wrapper id="donation" className={`${styles.input} ${styles.otherAmountInput}`} error={watchDonation >= 20 ? undefined : "最少捐款港幣20元"}>
                <Input id="donation" radius="md" size="md" type="number" {...register("donation", { required: true })} invalid={watchDonation >= 20 ? undefined : true} />
              </Input.Wrapper>
            </div>
          ) : (
            <div className={styles.donationAmountBtnContainer}>
              <Button
                variant="outline"
                className={`${styles.donationAmountBtn} ${styles.donationOtherAmountBtn} `}
                color="violet"
                onClick={() => {
                  setAmountButton(undefined);
                  setIsCustomAmount(true);
                  setValue("donation", 1000);
                }}
              >
                <div>其他金額</div>
              </Button>
            </div>
          )}
          <Checkbox
            className={`${styles.input} ${styles.checkbox} ${styles.donationCheckBox}`}
            label="我願意收到Petscue發送的通訊，讓我能掌握義工的最新資訊！Petscue尊重並保障您的個人資料，您隨時可取消訂閱，請參考私隱政策。"
            color="violet"
            {...register("checkbox", { required: true })}
          />
          <Button className={styles.button} color="violet" radius="xl" type="submit">
            <div>下一步信用卡填寫</div>
            <IconArrowNarrowRight className={styles.rightArrowIcon} />
          </Button>
        </form>
      </div>
    </MantineProvider>
  );
}
