import { useNavigate } from "react-router-dom";
import styles from "../../css/animalHelpChat.module.scss";
import { HiChevronLeft } from "react-icons/hi";
import { MantineProvider } from "@mantine/core";
import { io } from "socket.io-client";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getSupportPanel, SupportPanel } from "../../api/helpAPI";
import SupportPanelComponent, {
  Status,
} from "../../components/SupportPanelComponent";

export default function AnimalHelpToDoListfrom() {
  const navigate = useNavigate();
  const organisationId = localStorage.getItem("userId");

  const socket = io(
    process.env.REACT_APP_NODE_ENV === "production"
      ? process.env.REACT_APP_BACKEND_URL!
      : "http://localhost:8080",
    {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    }
  );

  const [stateChange, setStateChange] = useState<boolean>(true);

  const [socketData, setSocketData] = useState<{
    converation?: string;
    image?: string;
    user: { id: number; username: string };
  }>();
  // const [userArr, setUserArr] = useState<string[]>();
  const [containerArr, setContainerArr] = useState<
    { id: number; username?: string; count?: number }[]
  >([]);
  const messageCountArr: number[] = [];

  useEffect(() => {
    // console.log("hi");
    socket.on("connect", () => {
      console.log(socket.id);
    });
    console.log(organisationId);
    socket.on(`to-supportId${organisationId}`, (data) => {
      setSocketData(data);
    });
    // window.scrollTo(0, document.body.scrollHeight);
    return () => {
      socket.off("connect");
      socket.off(`to-supportId${organisationId}`);
    };
  }, []);

  useEffect(() => {
    console.log(socketData?.user.username);
    console.log(data);
    if (socketData?.user.username) {
      const index = containerArr.findIndex(
        (container) => container.username === socketData?.user.username
      );
      console.log(index);
      setContainerArr((containerArr) => {
        if (index > 0) {
          containerArr[index].count = containerArr[index].count! + 1;
          console.log("changed state", containerArr);
        } else {
          containerArr.push({
            id: socketData.user.id,
            username: socketData.user.username,
            count: 1,
          });
          console.log("changed state", containerArr);
        }
        return containerArr;
      });
    }
    setStateChange(!stateChange);
    console.log(stateChange);
  }, [socketData, containerArr]);

  const getSupportPanelModified = async () => {
    const resultArr = await getSupportPanel();
    const finalResult = new Set<number>();
    for (const result of resultArr) finalResult.add(result.user_id);
    // const userArr: number[] = [];
    // result.reduce((acc, cur) => {
    //   if (acc.user_id === cur.user_id) {
    //     userArr.push(cur.user_id);
    //     return acc;
    //   } else {
    //     return cur;
    //   }
    // });
    // return userArr;
    const finalResultArr = Array.from(finalResult);
    return finalResultArr;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["support/panel"],
    queryFn: getSupportPanel,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  useEffect(() => {
    if (!isLoading) {
      const userNameSet = new Set<string>();
      const userIdSet = new Set<number>();
      for (const result of data!) {
        userNameSet.add(result.username);
        userIdSet.add(result.user_id);
        console.log(result.username);
      }
      const userNameArr = Array.from(userNameSet);
      const userIdArr = Array.from(userIdSet);

      for (let i = 0; i < userNameArr.length; i++) {
        containerArr?.push({ username: userNameArr[i], id: userIdArr[i] });
      }

      // setUserArr(userNameArr);
      for (const user of userNameArr) {
        let count = 0;
        for (const result of data!) {
          if (user === result.username) {
            count++;
          }
        }
        messageCountArr.push(count);
      }
      for (let i = 0; i < messageCountArr.length; i++) {
        setContainerArr((containerArr) => {
          containerArr[i].count = messageCountArr[i];
          return containerArr;
        });
      }
      setStateChange(!stateChange);
      console.log(stateChange);
    }
  }, [isLoading, data, containerArr]);

  console.log(data);
  // console.log(userArr);
  console.log(messageCountArr);
  console.log(containerArr);

  return (
    <MantineProvider
      theme={{
        colors: {
          ocean: [
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
            "#F7BB93",
          ],
        },
      }}
    >
      <div>
        <div>
          <div className={styles.chevronAndAdjustmntIcon} />
          <HiChevronLeft
            className={styles.chevronIcon}
            onClick={() => navigate(-1)}
          />
        </div>

        <div className={styles.chatroomContainer}>
          <div className={styles.chatTab}>
            {containerArr?.map((user) => (
              <SupportPanelComponent
                key={`userMessage-${user.id}`}
                username={user.username!}
                numberOfMessages={user.count!}
                status={"pending" as Status}
                clickHandler={() => navigate(`/support/chatroom?id=${user.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}
