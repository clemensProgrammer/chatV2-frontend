import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { headers, urls } from "../../../env";
import { Message } from "./ChatContent";
import ChatSend from "./ChatSend";
import ChatBox from "./Message";

const ChatMessages = (props: { chatID: number }) => {
  const [messages, setMessages] = useState([] as Message[]);
  const [user, setUser] = useState("" as string);
  const [change, setChange] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        urls.getMessages + `?chatID=${props.chatID}&page=${page}`,
        {
          headers,
          params: { chatID: props.chatID },
        }
      );
      const newMessages = response.data.reverse();
      setMessages((prevMessages) => [...newMessages, ...prevMessages]);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMessages([]);
    setPage(1);
    setIsLoading(true);
  }, [props.chatID]);
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(urls.user_profile, { headers });
        setUser(response.data.username);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsername();
  }, [change, props.chatID]);
  const messagesEndRef = useRef(null as any);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (containerRef.current?.scrollTop === 0 && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [page]);

  useEffect(() => {
    containerRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 200);
  }, [props.chatID]);

  return (
    <>
      <div
        ref={containerRef}
        className="chat-content"
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "15px",
          flex: 1,
          overflowY: "auto",
        }}
      >
        {isLoading && <p>Loading...</p>}
        {messages.map((message) => (
          <ChatBox message={message} user={user} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatSend chatID={props.chatID} sended={() => setChange(change + 1)} />
    </>
  );
};

export default ChatMessages;
