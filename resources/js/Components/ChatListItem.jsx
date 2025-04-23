import * as React from "react";
import Box from "@mui/joy/Box";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import AvatarWithStatus from "./AvatarWithStatus";
import { toggleMessagesPane } from "../utils/ToggleMessagesPane";
import { formatMessageTimestamp } from "../utils/utils";

export default function ChatListItem({
    chat,
    online,
    selectedChatId,
    setSelectedChat,
}) {
    const {
        id,
        name,
        is_user,
        username,
        avatar_url,
        last_message,
        last_message_date,
    } = chat;
    const selected = selectedChatId === id;

    return (
        <React.Fragment>
            <ListItem>
                <ListItemButton
                    selected={selected}
                    color="neutral"
                    sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1.5,
                        py: 1.5,
                    }}
                    //Old logic: setSelectedChat({ id, sender, messages });
                    // current set logic is for demo
                    onClick={() => {
                        toggleMessagesPane();
                        setSelectedChat([1]);
                    }}
                >
                    {/* Avatar */}
                    <AvatarWithStatus
                        is_user={is_user}
                        online={online}
                        avatar_url={avatar_url}
                    />

                    {/* Name + Message */}
                    <Box sx={{ flex: 1, overflow: "hidden" }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                level="title-sm"
                                sx={{
                                    fontWeight: 600,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {name}
                            </Typography>
                            <Typography
                                level="body-xs"
                                sx={{
                                    color: "text.secondary",
                                    whiteSpace: "nowrap",
                                    ml: 1,
                                    display: { xs: "block", md: "block" },
                                }}
                            >
                                {formatMessageTimestamp(last_message_date)}
                            </Typography>
                        </Box>

                        <Typography
                            level="body-sm"
                            sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: "1",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {last_message}
                        </Typography>
                    </Box>
                </ListItemButton>
            </ListItem>
            <ListDivider sx={{ margin: 0 }} />
        </React.Fragment>
    );
}
