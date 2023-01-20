import { Input } from "@mantine/core";
import { useForm } from "react-hook-form";
import { HiXMark } from "react-icons/hi2";
import styles from "../css/editProfile.module.scss";
export default function EditProfile() {
  const { register } = useForm({
    defaultValues: {
      username: "",
      email: "",
      mobile: "",
      birthday: "",
      gender: "",
    },
  });
  return (
    <div className={styles.containerForAll}>
      <div className={styles.header}>
        <HiXMark className={styles.closingIcon} />
        <span>編輯帳戶</span>
      </div>
      <hr className={styles.headerHr} />
      <div>帳戶資料</div>
      <form className={styles.formContainer}>
        <Input.Wrapper id="username" className={styles.input} label="帳戶名稱" withAsterisk>
          <Input id="username" radius="md" size="md" placeholder="輸入帳戶名稱" type="text" {...register("username", { required: true })} />
        </Input.Wrapper>

        <Input.Wrapper id="email" className={styles.input} label="帳戶名稱" withAsterisk>
          <Input id="email" radius="md" size="md" placeholder="輸入帳戶名稱" type="email" {...register("email", { required: true })} />
        </Input.Wrapper>

        <Input.Wrapper id="mobile" className={styles.input} label="帳戶名稱" withAsterisk>
          <Input id="mobile" radius="md" size="md" placeholder="輸入帳戶名稱" type="text" {...register("mobile", { required: true })} />
        </Input.Wrapper>

        <Input.Wrapper id="birthday" className={styles.input} label="帳戶名稱" withAsterisk>
          <Input id="birthday" radius="md" size="md" placeholder="輸入帳戶名稱" type="text" {...register("birthday", { required: true })} />
        </Input.Wrapper>

        <Input.Wrapper id="gender" className={styles.input} label="帳戶名稱" withAsterisk>
          <Input id="gender" radius="md" size="md" placeholder="輸入帳戶名稱" type="text" {...register("gender", { required: true })} />
        </Input.Wrapper>
      </form>
    </div>
  );
}
