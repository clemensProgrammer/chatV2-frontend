import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { InsertEmoticon, Send, AttachFile, Photo } from "@mui/icons-material";
import axios from "axios";
import { headers, urls } from "../../../env";

const ChatSend = (props: { chatID: number; sended: () => void }) => {
  const [message, setMessage] = useState("");

  const send = (value: string, chatID: number) => {
    try {
      axios.post(
        urls.sendMessage,
        {
          message: value,
          type: "text",
          chatID: chatID,
        },
        { headers }
      );
      props.sended();
      setMessage("");
    } catch (error) {
      //
    }
  };

  return (
    <Paper style={{ padding: "10px", display: "flex" }}>
      <IconButton sx={{ p: "10px" }} aria-label="emoji" onClick={(event) => {}}>
        <InsertEmoticon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Your chat message"
        inputProps={{ "aria-label": "chat message" }}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") send(message, props.chatID);
        }}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="image"
        onClick={(e) => send(message, props.chatID)}
      >
        {message == "" ? <AttachFile /> : <Send />}
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
        <Photo />
      </IconButton>
    </Paper>
  );
};

export default ChatSend;
