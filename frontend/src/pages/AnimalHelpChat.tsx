import styles from "../css/animalHelpChat.module.scss";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import { MantineProvider, Button, TextInput, FileButton } from "@mantine/core";
import { IconCamera, IconSend } from "@tabler/icons";
import { useQuery } from "react-query";
import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { getOrganisationChatroom, postImageChatroom, postTextChatroom } from "../api/helpAPI";
import { AnimalHelpClient, AnimalHelpSupport } from "../components/AnimalHelpComponent";
import { useForm } from "react-hook-form";

export default function AnimalHelpChatroom() {
  const navigate = useNavigate();

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
    isClient: boolean;
  }

  const params = new URLSearchParams(document.location.search);

  const [messagesArr, setMessagesArr] = useState<Message[]>([]);
  useEffect(() => {
    // console.log("hi");
    socket.on("connect", () => {
      console.log(socket.id);
    });
    return;
  }, []);
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messagesArr]);

  const getOrganisationChatroomNoParam = async () => await getOrganisationChatroom(params.get("id")!);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["organisation/chatroom"],
    queryFn: getOrganisationChatroomNoParam,
    // refetchInterval: 5_000,
    // staleTime: 10_000,
    retry: 1,
  });

  const imageSubmitHandler = async (file: File | null) => {
    const formData = new FormData();
    formData.append("id", params.get("id")!);
    formData.append("chatroomImage", file as File);
    console.log("try image");
    const resp = await postImageChatroom(formData);
    const result = await resp.json();
    if (resp.status === 200) {
      setMessagesArr([...messagesArr, { image: result.image, isClient: true }]);
      // setMessagesArr((messagesArr) => {
      //   messagesArr.push({ image: result.image, isClient: true });
      //   return messagesArr;
      // });
    } else {
      alert("message cannot send");
    }
  };

  const textSubmitHandler = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!getValues().message) {
      return;
    }
    setMessagesArr([...messagesArr, { text: getValues().message, isClient: true }]);
    // setMessagesArr((messagesArr) => {
    //   messagesArr.push({ text: getValues().message, isClient: true });
    //   return messagesArr;
    // });
    // console.log(getValues().message);
    console.log(getValues().message);
    socket.emit("send-message", getValues().message);
    const resp = await postTextChatroom(params.get("id")!, getValues().message);
    const result = await resp.json();
    if (resp.status === 200) {
      setValue("message", "");
    } else {
      alert("message cannot send");
    }
  };

  const [file, setFile] = useState<File | null>(null);
  // console.log(file);

  const { register, watch, getValues, setValue } = useForm({
    defaultValues: {
      message: "",
    },
  });

  socket.on("new-message", (data) => {
    console.log(data);
  });
  const newMessageRef = useRef<string>();
  socket.on("message", (data) => {
    setMessagesArr([...messagesArr, { text: data.conversation, image: data.image, isClient: false }]);
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

  return (
    <MantineProvider
      theme={{
        colors: {
          ocean: ["#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93", "#F7BB93"],
        },
      }}
    >
      <div>
        <div>
          <div className={styles.chevronAndAdjustmntIcon}>
            <HiChevronLeft className={styles.chevronIcon} onClick={() => navigate(-1)} />
            <div className={styles.organisationContainer}>
              <div className={styles.organisationLogoContainer}>
                <img className={styles.organisationLogo} src={`/photos/organisation/${data?.organisation.logo}`}></img>
              </div>
              <div className={styles.organisationName}>{data?.organisation.name}</div>
            </div>
          </div>

          <div className={styles.conversationContainer}>
            <div className={styles.dateTab}>{new Date() && "今天"}</div>
            {/* <div className={styles.supportSideContainer}>
              <div className={styles.supportSide}>有咩可以幫到你？</div>
            </div> */}
            <AnimalHelpClient text="SOS" />
            <AnimalHelpSupport text="有咩可以幫到你？" />
            <AnimalHelpClient image="needHelp.png" />
            <AnimalHelpClient text="我係城門水塘見到有隻狗媽媽生左好多小狗狗，狗媽媽受傷，呼吸困難。" />
            <AnimalHelpSupport text="請問對上一次見到佢地係幾時？" />
            <AnimalHelpClient text="10:00am" />
            <AnimalHelpSupport text="ok" />

            {data?.message.map((message) =>
              message.role === "user" ? (
                <AnimalHelpClient key={`message-${message.id}`} text={message.conversation} image={message.image} time={message.created_at} />
              ) : (
                <AnimalHelpSupport key={`message-${message.id}`} text={message.conversation} image={message.image} time={message.created_at} />
              )
            )}

            {messagesArr.map((message, idx) =>
              message.isClient ? (
                <AnimalHelpClient key={`message-${idx}`} text={message.text} image={message.image} />
              ) : (
                <AnimalHelpSupport key={`message-${idx}`} text={message.text} image={message.image} />
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
            <Button style={{ width: 230, height: 34, color: "black", fontSize: 14, marginLeft: 100, marginTop: 20, borderRadius: 10 }} color="ocean">
              動物已經得到幫助，結束對話。
            </Button>
          </div>

          <div className={styles.textBigContainer} onSubmit={textSubmitHandler}>
            <form className={styles.textContainer}>
              <FileButton onChange={imageSubmitHandler} accept="image/png,image/jpeg">
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
