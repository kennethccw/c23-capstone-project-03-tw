import { Button, Input, MantineProvider, Textarea } from "@mantine/core";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import styles from "../css/adoption.module.scss";
import { IconArrowNarrowRight } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { getPetAdoption } from "../api/adoptionAPI";

export default function Adoption() {
  const { register, watch } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      remark: "",
    },
  });

  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery({ // react query - customised hook 
    queryKey: ["home/activities"],
    queryFn: getPetAdoption, // API
    refetchInterval: 5_000,
    staleTime: 10_000,
    retry: 1,
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
        <IoIosArrowBack className={styles.navigateBackButton} onClick={() => navigate(-1)} />
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
          <Button className={`${styles.button} ${styles.adoptionConfirmBtn}`} color="violet" radius="xl" type="submit" onClick={() => navigate("/application")}>
            <div>確認遞交申請</div>
            <IconArrowNarrowRight className={styles.rightArrowIcon} />
          </Button>
        </form>
      </div>
    </MantineProvider>
  );
}
function useQuery(arg0: { // react query - customised hook 
  queryKey: string[]; queryFn: any; // API
  refetchInterval: number; staleTime: number; retry: number;
}): { isLoading: any; isError: any; data: any; error: any; } {
  throw new Error("Function not implemented.");
}

