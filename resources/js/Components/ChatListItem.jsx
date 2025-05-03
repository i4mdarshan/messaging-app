import { useEffect } from "react";
import Box from "@mui/joy/Box";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import AvatarWithStatus from "./AvatarWithStatus";
import { toggleMessagesPane } from "../utils/ToggleMessagesPane";
import { formatMessageTimestamp } from "../utils/utils";
import { apiRequest } from "@/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@/store/messages/messagesSlice";
import { selectChat } from "@/store/chats/chatsSlice";
import { addEvent } from "@/store/events/eventsSlice";

export default function ChatListItem({ chat, online, selectedChatId }) {
    const dispatch = useDispatch();
    const {
        id,
        name,
        is_user,
        username,
        avatar_url,
        is_group,
        is_admin,
        created_at,
        updated_at,
        blocked_at,
        last_message,
        last_message_date,
    } = chat;
    const selectedChat = useSelector((state) => state.chats.selectedChat);
    const typePrefix = chat.is_group ? "group_" : "user_";
    const selected = selectedChatId === `${typePrefix}${chat.id}`;
    const fetchMessages = async () => {
        const response = await apiRequest({
            method: "POST",
            url: "/messages",
            data: { chat_id: id, is_group: is_group, is_user: is_user },
            useMiddleware: ["auth"],
        });

        if (response.success) {
            dispatch(setMessages(response.data.messages.reverse()));
            dispatch(selectChat(response.data.selectedChat));
        }
    };

    const selectHandler = () => {
        toggleMessagesPane();
        dispatch(selectChat(chat));
        fetchMessages();
    };

    return (
        <>
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
                    onClick={selectHandler}
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
        </>
    );
}
