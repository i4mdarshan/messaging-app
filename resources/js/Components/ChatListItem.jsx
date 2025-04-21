import * as React from "react";
import Box from "@mui/joy/Box";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import AvatarWithStatus from "./AvatarWithStatus";
import { toggleMessagesPane } from "../utils/ToggleMessagesPane";

export default function ChatListItem({
    id,
    name,
    username,
    avatar_url,
    last_message,
    last_message_date,
    selectedChatId,
    setSelectedChat,
}) {
    const selected = selectedChatId === id;
    return (
        <React.Fragment>
            <ListItem>
                <ListItemButton
                    // onClick={() => {
                    //     toggleMessagesPane();
                    //     setSelectedChat({ id, sender, messages });
                    // }}
                    selected={selected}
                    color="neutral"
                    sx={{
                        flexDirection: "column",
                        alignItems: "initial",
                        gap: 1,
                    }}
                >
                    <Stack direction="row" spacing={1.5}>
                        <AvatarWithStatus
                            // online={sender.online}
                            src={avatar_url ? avatar_url : ""}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Typography level="title-sm">
                                {name}
                            </Typography>
                            <Typography level="body-sm">
                                {username}
                            </Typography>
                        </Box>
                        <Box sx={{ lineHeight: 1.5, textAlign: "right" }}>
                            {/* {messages[0].unread && (
                                <CircleIcon
                                    sx={{ fontSize: 12 }}
                                    color="primary"
                                />
                            )} */}
                            <Typography
                                level="body-xs"
                                noWrap
                                sx={{ display: { xs: "none", md: "block" } }}
                            >
                                {last_message_date}
                            </Typography>
                        </Box>
                    </Stack>
                    <Typography
                        level="body-sm"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {last_message}
                    </Typography>
                </ListItemButton>
            </ListItem>
            <ListDivider sx={{ margin: 0 }} />
        </React.Fragment>
    );
}
