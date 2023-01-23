import { Button, Checkbox, Input, MantineProvider } from "@mantine/core";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import styles from "../css/donation.module.scss";
import { useState } from "react";
import { IconArrowNarrowRight } from "@tabler/icons";
import { useNavigate } from "react-router-dom";

export default function Donation() {
  const { register, watch } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      donation: 1000,
    },
  });

  const watchDonation = watch("donation");
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const navigate = useNavigate();
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
        <IoIosArrowBack className={styles.navigateBackButton} onClick={() => navigate(-1)} />
        <div className={styles.donationHeaderContainer}>
          <h1>捐款樂</h1>
        </div>
        <hr className={styles.donationHr} />
        <form>
          <Input.Wrapper id="full-name" className={styles.input} label="捐款人全名" withAsterisk>
            <Input id="full-name" radius="md" size="md" type="text" {...register("fullName", { required: true })} />
          </Input.Wrapper>
          <Input.Wrapper id="email" className={styles.input} label="電子郵件" error="" withAsterisk>
            <Input id="email" radius="md" size="md" type="text" {...register("email", { required: true })} />
          </Input.Wrapper>
          <Input.Wrapper id="mobile" className={styles.input} label="聯繫電話" withAsterisk>
            <Input id="mobile" radius="md" size="md" type="text" {...register("mobile", { required: true })} />
          </Input.Wrapper>

          <div className={styles.seperatorContainer}>
            <span>捐款</span>
            <hr className={styles.seperatorHr} />
          </div>
          <div className={styles.donationAmountBtnContainer}>
            <Button variant="outline" className={styles.donationAmountBtn} color="violet">
              <div className={styles.donationAmount}>100</div>
              <div>HKD</div>
            </Button>
            <Button variant="outline" className={styles.donationAmountBtn} color="violet">
              <div className={styles.donationAmount}>200</div>
              <div>HKD</div>
            </Button>
            <Button variant="outline" className={styles.donationAmountBtn} color="violet">
              <div className={styles.donationAmount}>300</div>
              <div>HKD</div>
            </Button>
          </div>
          {isCustomAmount ? (
            watchDonation >= 20 ? (
              <div className={styles.otherDonationAmountContainer}>
                <span className={styles.otherDonationAmountLabel}>HKD</span>
                <Input.Wrapper id="donation" className={`${styles.input} ${styles.otherAmountInput}`}>
                  <Input id="donation" radius="md" size="md" type="number" {...register("donation", { required: true })} />
                </Input.Wrapper>
              </div>
            ) : (
              <div className={styles.otherDonationAmountContainer}>
                <span className={styles.otherDonationAmountLabel}>HKD</span>
                <Input.Wrapper id="donation" className={`${styles.input} ${styles.otherAmountInput}`} error="最少捐款港幣20元">
                  <Input id="donation" radius="md" size="md" type="number" {...register("donation", { required: true })} invalid />
                </Input.Wrapper>
              </div>
            )
          ) : (
            <div className={styles.donationAmountBtnContainer}>
              <Button
                variant="outline"
                className={`${styles.donationAmountBtn} ${styles.donationOtherAmountBtn} `}
                color="violet"
                onClick={() => {
                  setIsCustomAmount(true);
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
