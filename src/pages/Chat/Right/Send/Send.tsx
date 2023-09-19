import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Send, Photo } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import Emoji from "./Emoji";
import File from "./FileSend";
import Requests from "../../../../services/requests";
import { InsertEmoticon } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Message } from "../ChatFormats";

const ChatSend = (props: {
  chatID: number;
  sended: (data: Message) => void;
  onFileUpload: (file: File | null) => void;
}) => {
  const [message, setMessage] = useState("");
  const theme = useTheme();
  const [open, setOpen] = useState(false as Boolean);

  const handleChange = () => {
    setOpen(!open);
  };

  const send = async (
    e?: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if ((e && e.key === "Enter") || e == undefined) {
      let messageSend = await Requests.send(message, props.chatID);
      props.sended(messageSend);
      setMessage("");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {open ? (
        <Emoji setEmoji={(emoji) => setMessage((recent) => recent + emoji)} />
      ) : (
        <></>
      )}

      <Paper
        style={{
          padding: "10px 10px 10px 10px",
          display: "flex",
          borderRadius: "0px",
          borderBottomRightRadius: "30px",
          borderTop: "1px solid " + theme.palette.divider,
          boxShadow: "none",
        }}
        elevation={3}
      >
        <IconButton
          sx={{ p: "10px" }}
          onClick={handleChange}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          aria-label="menu"
        >
          {open ? <CloseIcon /> : <InsertEmoticon />}
        </IconButton>

        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: "large" }}
          placeholder="Your chat message"
          inputProps={{ "aria-label": "chat message" }}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => send(e)}
        />

        {message === "" ? (
          <File variant={0} onFileUpload={props.onFileUpload} />
        ) : (
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="image"
            onClick={() => send()}
          >
            <Send />
          </IconButton>
        )}
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <File variant={1} onFileUpload={props.onFileUpload} />
      </Paper>
    </Box>
  );
};

export default ChatSend;
