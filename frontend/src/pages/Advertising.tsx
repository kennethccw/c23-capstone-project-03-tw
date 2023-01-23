import styles from "../css/adv.module.scss";
import { useNavigate } from "react-router-dom";
import { FiXCircle } from "react-icons/fi";
import { Button } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

export default function Advertising() {
  const navigate = useNavigate();
  const [count, setCount] = useState(15);
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
  // useEffect(() => {
  //   (intervalId.current = setInterval(() => {
  //     count !== 0 ? setCount(count - 1) : clearInterval(intervalId.current);
  //   })),
  //     1_000;
  // }, [count]);

  return (
    <div className={styles.advContainer}>
      <Button
        // disabled={count > 0 ? true : undefined}
        onClick={count > 0 ? undefined : () => navigate("/home")}
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

      <img className={styles.imgContainer} src="photos/adv-15s.png" alt="嘉頓" onClick={() => window.location.replace("http://www.garden.com.hk/cht/home")} />
    </div>
  );
}
