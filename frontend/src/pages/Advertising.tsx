import styles from "../css/adv.module.scss";
import { useNavigate } from "react-router-dom";
import { FiXCircle } from "react-icons/fi";
import { Button, LoadingOverlay } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { getHomeAdvertisers, postHomeAdvertiser } from "../api/homeAPI";
import { useQuery } from "react-query";

export default function Advertising() {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  const intervalIdRef = useRef<NodeJS.Timer>();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((count) => count - 1);
    }, 1_000);
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    intervalIdRef.current = intervalId;
    return () => {
      const intervalId = intervalIdRef.current;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const getChosenHomeAdvertiser = async () => {
    const advertiserArr = await getHomeAdvertisers();
    const idx = Math.floor(Math.random()) * advertiserArr.length;
    console.log(advertiserArr[idx]);
    return advertiserArr[idx];
  };

  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["home/advertiser"],
    queryFn: getChosenHomeAdvertiser,
  });
  // useEffect(() => {
  //   (intervalId.current = setInterval(() => {
  //     count !== 0 ? setCount(count - 1) : clearInterval(intervalId.current);
  //   })),
  //     1_000;
  // }, [count]);

  const clickHandler = () => {
    postHomeAdvertiser(data?.id!);
    navigate("/home");
  };

  console.log(data);

  return (
    <div className={styles.advContainer}>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

      <Button
        // disabled={count > 0 ? true : undefined}
        onClick={count > 0 ? undefined : clickHandler}
        className={styles.advBtn}
        color="gray"
        // radius="xl"
        // onClick={() => {
        // navigate("/register");
      >
        {count > 0 ? (
          <div>廣告時間餘下{count}秒</div>
        ) : (
          <>
            <div>感謝為流浪動物出一分力</div>
            <FiXCircle className={styles.closeBtn} />
          </>
        )}
      </Button>

      <img className={styles.imgContainer} src={`/photos/${data?.media}`} alt="嘉頓" onClick={() => window.location.replace(data?.link!)} />
    </div>
  );
}
