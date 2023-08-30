import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { urls, headers, Chat } from "../../env";
import ChatContent from "./Right/ChatContent";
import Left from "./Left/Index";

const Main = () => {
  const [chats, setChats] = useState([] as Chat[]);
  const [chatSelected, setChatSelected] = useState(
    undefined as undefined | number
  );
  const [changed, setChange] = useState(0);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(urls.getChats, { headers });
        setChats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, [changed]);

  return (
    <div
      style={{
        maxWidth: 1400,
        display: "flex",
        flex: 1,
        height: "85vh",
        padding: "20px",
        margin: "auto",
        paddingBottom: "0px",
        marginTop: "10px",
        marginBottom: "-15px",
      }}
    >
      <Left
        width="30%"
        openChat={(id) => setChatSelected(id)}
        chats={chats}
        newChat={(id) => {
          setChatSelected(id);
          setChange(changed+1)
        }}
      />
      <Paper style={{ flex: 1 }} elevation={3}>
        {chatSelected == undefined ? (
          <Typography
            variant="h2"
            style={{
              textAlign: "center",
            }}
          >
            Welcome !
          </Typography>
        ) : (
          <ChatContent chatID={chatSelected} />
        )}
      </Paper>
    </div>
  );
};

export default Main;
