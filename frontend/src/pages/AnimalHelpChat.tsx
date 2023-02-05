import styles from "../css/animalHelpChat.module.scss";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import { MantineProvider, Button, TextInput, FileButton, LoadingOverlay } from "@mantine/core";
import { IconCamera, IconChevronsDownLeft, IconSend } from "@tabler/icons";
import { useQuery } from "react-query";
import io from "socket.io-client";
import { useEffect, useMemo, useRef, useState } from "react";
import { getOrganisationChatroom, postImageChatroomClient, postTextChatroomClient } from "../api/helpAPI";
import { AnimalHelpPurple, AnimalHelpWhite } from "../components/AnimalHelpComponent";
import { useForm } from "react-hook-form";

export default function AnimalHelpChatroom() {
  const navigate = useNavigate();
  const uid = localStorage.getItem("userId");
  const params = new URLSearchParams(document.location.search);
  const organisationId = params.get("id")!;

  const socket = io("http://localhost:8080", {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  });
  enum Role {
    support,
    client,
  }
  interface Message {
    text?: string;
    image?: string;
    role: Role;
  }

  const [socketData, setSocketData] = useState<{ conversation: string; image: string }>();

  const [messagesArr, setMessagesArr] = useState<Message[]>([]);
  useEffect(() => {
    // console.log("hi");
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on(`supportId${organisationId}-to-clientId${uid}`, (data) => {
      setSocketData(data);
    });
    // window.scrollTo(0, document.body.scrollHeight);
    return () => {
      socket.off("connect");
      socket.off(`supportId${organisationId}-to-clientId${uid}`);
    };
  }, []);

  useEffect(() => {
    if (socketData) {
      setMessagesArr([...messagesArr, { text: socketData.conversation, image: socketData.image, role: Role.support }]);
    }
  }, [socketData]);

  const [isTodayAppeared, setIsTodayAppeared] = useState(false);

  const getOrganisationChatroomNoParam = async () => {
    const result = await getOrganisationChatroom(organisationId);
    const dateStringArr = result.message.map((message) => `${new Date(message.created_at!).getFullYear()}-${new Date(message.created_at!).getMonth() + 1}-${new Date(message.created_at!).getDate()}`);
    const dateSet = new Set<string>();
    for (const dateString of dateStringArr) {
      dateSet.add(dateString);
    }
    const dateArr = Array.from(dateSet);
    const idxOfMessageArr: number[] = [];
    for (const date of dateArr) {
      const idxOfMessage = result.message.findIndex(
        (message) => `${new Date(message.created_at!).getFullYear()}-${new Date(message.created_at!).getMonth() + 1}-${new Date(message.created_at!).getDate()}` === date
      );
      // if (idxOfMessage === 0) {
      //   idxOfMessageArr.push(-1);
      // } else {
      idxOfMessageArr.push(idxOfMessage);
      // }
    }
    for (let i = 0; i < idxOfMessageArr.length; i++) {
      result.message.splice(idxOfMessageArr[i] + i, 0, dateArr[i] as any);
      if (dateArr[i] === `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`) {
        setIsTodayAppeared(true);
      }
    }
    console.log(dateArr);
    console.log(idxOfMessageArr);
    return { result, dateArr, idxOfMessageArr };
  };

  // socket.on(`to-supportId${organisationId}`, (data) => {
  //   console.log("hihihi");
  //   console.log(data);
  // });
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["chatroom/client"],
    queryFn: getOrganisationChatroomNoParam,
    // refetchInterval: 5_000,
    // staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    setIsScrolling(true);
    window.scrollTo(0, 99999999999999);
    setIsScrolling(false);
  }, [messagesArr, data]);

  const imageSubmitHandler = async (file: File | null) => {
    const formData = new FormData();
    formData.append("id", organisationId);
    formData.append("chatroomImage", file as File);
    console.log("try image");
    const resp = await postImageChatroomClient(formData);
    const result = await resp.json();
    if (resp.status === 200) {
      setMessagesArr([...messagesArr, { image: result.message.image, role: Role.client }]);
      file = null;
      resetRef.current?.();
      console.log(file);
      // setMessagesArr((messagesArr) => {
      //   messagesArr.push({ image: result.image, isClient: true });
      //   return messagesArr;
      // });
    } else {
      alert("message cannot send");
    }
  };

  const textSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!getValues().message) {
      return;
    }
    setMessagesArr([...messagesArr, { text: getValues().message, role: Role.client }]);
    // setMessagesArr((messagesArr) => {
    //   messagesArr.push({ text: getValues().message, isClient: true });
    //   return messagesArr;
    // });
    // console.log(getValues().message);
    console.log(getValues().message);
    socket.emit("send-message", getValues().message);
    const resp = await postTextChatroomClient(organisationId, getValues().message);
    const result = await resp.json();
    if (resp.status === 200) {
      setValue("message", "");
    } else {
      alert("message cannot send");
    }
  };

  // console.log(file);

  const { register, watch, getValues, setValue } = useForm({
    defaultValues: {
      message: "",
    },
  });

  // const intervalIdRef = useRef<NodeJS.Timer>();

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setMessagesArr([...messagesArr, { text: newMessageRef.current, isClient: false }]);
  //   }, 1_000);
  //   if (intervalIdRef.current) {
  //     clearInterval(intervalIdRef.current);
  //   }
  //   intervalIdRef.current = intervalId;
  // }, [newMessageRef.current]);

  console.log(messagesArr);
  const resetRef = useRef<() => void>(null);
  return (
    <MantineProvider
      theme={{
        colors: {
          ocean: ["#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93"],
        },
      }}
    >
      <div className={styles.containerForAll}>
        <LoadingOverlay visible={isLoading || isScrolling} overlayBlur={2} />

        <div>
          <div className={styles.chevronAndAdjustmntIcon}>
            <HiChevronLeft className={styles.chevronIcon} onClick={() => navigate(-1)} />
            <div className={styles.organisationContainer}>
              <div className={styles.organisationLogoContainer}>
                <img className={styles.organisationLogo} src={`/photos/organisation/${data?.result.organisation.logo}`}></img>
              </div>
              <div className={styles.organisationName}>{data?.result.organisation.name}</div>
            </div>
          </div>

          <div className={styles.conversationContainer}>
            {/* <div className={styles.dateTab}>{new Date() && "今天"}</div> */}
            {/* <div className={styles.supportSideContainer}>
              <div className={styles.supportSide}>有咩可以幫到你？</div>
            </div> */}
            {/* <AnimalHelpPurple text="SOS" />
            <AnimalHelpWhite text="有咩可以幫到你？" />
            <AnimalHelpPurple image="needHelp.png" />
            <AnimalHelpPurple text="我係城門水塘見到有隻狗媽媽生左好多小狗狗，狗媽媽受傷，呼吸困難。" />
            <AnimalHelpWhite text="請問對上一次見到佢地係幾時？" />
            <AnimalHelpPurple text="10:00am" />
            <AnimalHelpWhite text="ok" /> */}

            {data?.result.message.map((message, idx) =>
              new Date(message as any).toString() !== "Invalid Date" ? (
                `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}` === (message as any) ? (
                  <div className={styles.dateContainer}>
                    <div className={styles.dateTab} key={`message-${idx}`}>
                      <div>今天</div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.dateContainer}>
                    <div className={styles.dateTab} key={`message-${idx}`}>
                      <div>{message as any}</div>
                    </div>
                  </div>
                )
              ) : message.role === "user" ? (
                <AnimalHelpPurple key={`message-${message.id}`} text={message.conversation} image={message.image} time={message.created_at} />
              ) : (
                <AnimalHelpWhite key={`message-${message.id}`} text={message.conversation} image={message.image} time={message.created_at} />
              )
            )}

            {!!messagesArr.length && !isTodayAppeared && (
              <div className={styles.dateContainer}>
                <div className={styles.dateTab}>
                  <div>今天</div>
                </div>
              </div>
            )}

            {messagesArr.map((message, idx) =>
              message.role ? (
                <AnimalHelpPurple key={`message-${idx}`} text={message.text} image={message.image} />
              ) : (
                <AnimalHelpWhite key={`message-${idx}`} text={message.text} image={message.image} />
              )
            )}

            {/* <div className={styles.supportSideContainer}>
              <div className={styles.supportSide}>請問對上一次見到佢地係幾時？gjgjgjgjgjgjgjgjgjgjgjgjgjgjgjgjgjgjgjgjgjgjgjgjj</div>
            </div>{" "}
            <div className={styles.supportSideContainer}>
              <div className={styles.supportSide}>請問對上一次見到佢地係幾時？</div>
            </div>{" "}
            <div className={styles.supportSideContainer}>
              <div className={styles.supportSide}>請問對上一次見到佢地係幾時？</div>
            </div>{" "}
            <div className={styles.supportSideContainer}>
              <div className={styles.supportSide}>請問對上一次見到佢地係幾時？</div>
            </div>{" "}
            <div className={styles.supportSideContainer}>
              <div className={styles.supportSide}>請問對上一次見到佢地係幾時？</div>
            </div>{" "}
            <div className={styles.supportSideContainer}>
              <div className={styles.supportSide}>請問對上一次見到佢地係幾時？</div>
            </div>{" "}
            <div className={styles.supportSideContainer}>
              <div className={styles.supportSide}>請問對上一次見到佢地係幾時？</div>
            </div> */}
            {/* <Button style={{ width: 230, height: 34, color: "black", fontSize: 14, marginLeft: 100, marginTop: 20, borderRadius: 10 }} color="ocean">
              動物已經得到幫助，結束對話。
            </Button> */}
          </div>

          <div className={styles.textBigContainer}>
            <form className={styles.textContainer} onSubmit={textSubmitHandler}>
              <FileButton resetRef={resetRef} onChange={imageSubmitHandler} accept="image/png,image/jpeg">
                {(props) => <IconCamera {...props} className={styles.textInputIconLeftBtn} size={27} />}
              </FileButton>
              {/* <button className={styles.textInputIconLeftBtn}>
                <IconCamera className={styles.textInputIconLeft} size={27} />
              </button> */}

              <TextInput className={styles.textInputClass} placeholder="輸入文字" style={{ width: 290 }} {...register("message", { required: true })} />

              <button className={styles.textInputIconRightBtn} type="submit">
                <IconSend className={styles.textInputIconRight} size={25} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}
