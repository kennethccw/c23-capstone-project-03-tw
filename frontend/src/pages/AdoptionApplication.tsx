import { Button, Checkbox, Input, MantineProvider, Textarea } from "@mantine/core";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import styles from "../css/adoptionApplication.module.scss";
import { IconArrowNarrowRight } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { postPetAdoptionApplication } from "../api/adoptionAPI";
import { useRootDispatch, useRootSelector } from "../redux/store";
import { authReducer } from "../redux/auth";
import { adoptionApplicationReducer } from "../redux/adoption";

export default function AdoptionApplication() {
  const dispatch = useRootDispatch();
  const reduxFullName = useRootSelector((state) => state.adoption.fullName);
  const reduxEmail = useRootSelector((state) => state.adoption.email);
  const reduxMobile = useRootSelector((state) => state.adoption.mobile);
  const reduxRemark = useRootSelector((state) => state.adoption.remark);
  const { register, watch, getValues } = useForm({
    defaultValues: {
      fullName: reduxFullName,
      email: reduxEmail,
      mobile: reduxMobile,
      remark: reduxRemark,
      checkbox: false,
    },
  });

  const navigate = useNavigate();

  const params = new URLSearchParams(document.location.search);
  const watchFullname = watch("fullName");
  const watchRemark = watch("remark");
  const watchEmail = watch("email");
  const isCorrectFormatEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(watchEmail) || watchEmail === "";

  const watchMobile = watch("mobile");
  const isMobileInvalid = (watchMobile.length !== 8 || !/^[0-9]+$/.test(watchMobile)) && watchMobile !== "";
  useEffect(() => {
    dispatch(adoptionApplicationReducer({ fullName: getValues().fullName, email: getValues().email, mobile: getValues().mobile, remark: getValues().remark }));
  }, [watchFullname, watchEmail, watchMobile, watchRemark]);

  useEffect(() => {
    window.scrollTo(0, 0);
    return;
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isCorrectFormatEmail || isMobileInvalid || watchEmail === "" || watchMobile === "" || getValues().fullName === "") {
      alert("請正確輸入再遞交");
      return;
    }
    if (!getValues().checkbox) {
      alert("請先閱讀並了解申請領養動物程序，再遞交");
      return;
    }

    const adoptionApplication = { name: getValues().fullName, email: getValues().email, mobile: getValues().mobile, remark: getValues().remark, pet_id: parseInt(params.get("id")!) };

    const resp = await postPetAdoptionApplication(adoptionApplication);
    const result = await resp.json();
    if (result.message) {
      alert(result.message);
      return;
    } else if (resp.status === 200) {
      dispatch(adoptionApplicationReducer({ fullName: "", email: "", mobile: "", remark: "" }));
      navigate("/application/success");
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
        <div className={styles.adoptionDetailHeaderContainer}>
          <h1>領養申請</h1>
        </div>
        <hr className={styles.adoptionDetailHr} />
        <form className={styles.formContainer} onSubmit={submitHandler}>
          <Input.Wrapper withAsterisk id="fullname" className={styles.input} label="中文或英文全寫">
            <Input id="fullname" radius="md" size="md" placeholder="輸入中文或英文全寫" type="text" {...register("fullName", { required: true })} />
          </Input.Wrapper>
          <Input.Wrapper withAsterisk id="email" className={styles.input} label="電子郵件" error={isCorrectFormatEmail ? undefined : "請輸入正確的電子郵件帳戶"}>
            <Input id="email" radius="md" size="md" placeholder="輸入電子郵件" type="email" {...register("email", { required: true })} invalid={isCorrectFormatEmail ? undefined : true} />
          </Input.Wrapper>
          <Input.Wrapper withAsterisk id="mobile" className={styles.input} label="聯絡電話" error={isMobileInvalid ? "請輸入正確的聯絡電話" : undefined}>
            <Input id="mobile" radius="md" size="md" placeholder="輸入聯絡電話" type="text" {...register("mobile", { required: true })} invalid={isMobileInvalid ? true : undefined} />
          </Input.Wrapper>

          <Textarea label="留言內容" placeholder="輸入留言內容" className={styles.input} autosize minRows={3} maxRows={7} {...register("remark", { required: false })} />
          <Checkbox className={`${styles.input} ${styles.checkbox}`} label="我已閱讀並了解申請領養動物程序。" color="petscue-purple" {...register("checkbox", { required: true })} />
          <div className={styles.btnContainer}>
            <Button
              className={styles.button}
              color="violet"
              variant="outline"
              radius="xl"
              onClick={() => {
                navigate("/adoption/application/detail");
              }}
            >
              <div>閱讀領養程序</div>
            </Button>
            <Button className={`${styles.button} ${styles.adoptionConfirmBtn}`} color="violet" radius="xl" type="submit">
              <div>確認遞交申請</div>
            </Button>
          </div>
        </form>
      </div>
    </MantineProvider>
  );
}
