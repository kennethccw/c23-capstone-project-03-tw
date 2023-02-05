import styles from "../../css/animalHelpChat.module.scss";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft, HiOutlineUserCircle } from "react-icons/hi";
import { MantineProvider, Button, TextInput, FileButton, LoadingOverlay } from "@mantine/core";
import { IconCamera, IconSend } from "@tabler/icons";
import { useQuery } from "react-query";
import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { getOrganisationChatroom, postTextChatroomSupport, postImageChatroomSupport, getUserChatroom } from "../../api/helpAPI";
import { AnimalHelpPurple, AnimalHelpWhite } from "../../components/AnimalHelpComponent";
import { useForm } from "react-hook-form";

export default function AnimalSupportChat() {
  const navigate = useNavigate();
  const organisationId = localStorage.getItem("userId");
  const params = new URLSearchParams(document.location.search);
  const uid = params.get("id")!;

  const socket = io("http://localhost:8080", {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  });
  enum Role {
    client,
    support,
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
    socket.on(`clientId${uid}-to-supportId${organisationId}`, (data) => {
      setSocketData(data);
    });
    // window.scrollTo(0, document.body.scrollHeight);
    return () => {
      socket.off("connect");
      socket.off(`clientId${uid}-to-supportId${organisationId}`);
    };
  }, []);

  useEffect(() => {
    if (socketData) {
      setMessagesArr([...messagesArr, { text: socketData.conversation, image: socketData.image, role: Role.client }]);
    }
  }, [socketData]);

  const [isTodayAppeared, setIsTodayAppeared] = useState(false);

  const getUserChatroomNoParam = async () => {
    const result = await getUserChatroom(uid);
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

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["chatroom/support"],
    queryFn: getUserChatroomNoParam,
    // refetchInterval: 5_000,
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
    formData.append("id", uid);
    formData.append("chatroomImage", file as File);
    console.log("try image");
    const resp = await postImageChatroomSupport(formData);
    const result = await resp.json();
    if (resp.status === 200) {
      setMessagesArr([...messagesArr, { image: result.image, role: Role.support }]);
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
    setMessagesArr([...messagesArr, { text: getValues().message, role: Role.support }]);
    // setMessagesArr((messagesArr) => {
    //   messagesArr.push({ text: getValues().message, isClient: true });
    //   return messagesArr;
    // });
    // console.log(getValues().message);
    console.log(getValues().message);
    socket.emit("send-message", getValues().message);
    const resp = await postTextChatroomSupport(uid, getValues().message);
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
      <div>
        <LoadingOverlay visible={isLoading || isScrolling} overlayBlur={2} />

        <div>
          <div className={styles.chevronAndAdjustmntIcon}>
            <HiChevronLeft className={styles.chevronIcon} onClick={() => navigate(-1)} />
            <div className={styles.organisationContainer}>
              <div className={styles.organisationLogoContainer}>
                <HiOutlineUserCircle size={48} className={styles.organisationLogo} />
              </div>
              <div className={styles.organisationName}>{data?.result.user}</div>
            </div>
          </div>

          <div className={styles.conversationContainer}>
            {/* <div className={styles.dateTab}>{new Date() && "今天"}</div> */}
            {/* <div className={styles.supportSideContainer}>
              <div className={styles.supportSide}>有咩可以幫到你？</div>
            </div> */}
            {/* <AnimalHelpWhite text="SOS" />
            <AnimalHelpPurple text="有咩可以幫到你？" />
            <AnimalHelpWhite image="needHelp.png" />
            <AnimalHelpWhite text="我係城門水塘見到有隻狗媽媽生左好多小狗狗，狗媽媽受傷，呼吸困難。" />
            <AnimalHelpPurple text="請問對上一次見到佢地係幾時？" />
            <AnimalHelpWhite text="10:00am" />
            <AnimalHelpPurple text="ok" /> */}

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
              ) : message.role === "organisation" ? (
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
