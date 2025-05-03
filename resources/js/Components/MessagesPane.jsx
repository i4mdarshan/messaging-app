import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import AvatarWithStatus from "./AvatarWithStatus";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import MessagesPaneHeader from "./MessagesPaneHeader";
import { usePage } from "@inertiajs/react";
import { apiRequest } from "@/api/api";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/store/messages/messagesSlice";
import { updateLastMessage } from "@/store/chats/chatsSlice";

export default function MessagesPane() {
    const page = usePage();
    const dispatch = useDispatch();
    // const messagesEndRef = useRef(null);
    const chatMessages = useSelector((state) => state.messages.chatMessages);
    // const [loading, setLoading] = useState(true);
    const user = page.props.auth.user;

    // to handle the scroll behaviour when new messages are sent
    // useEffect(() => {
    //     if (messagesEndRef.current) {
    //         messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    //     }
    // }, [chatMessages]);
    // console.log("chatMessages from redux: ", chatMessages);

    return (
        <Sheet
            sx={{
                height: {
                    sm: "86dvh",
                    md: "86dvh",
                    xs: "calc(100dvh - var(--Header-height, 64px))",
                },
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.level2",
            }}
        >
            <MessagesPaneHeader sx={{ flexShrink: 0 }} />
            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    minHeight: 0,
                    px: 2,
                    py: 3,
                    overflowY: "auto",
                    flexDirection: "column-reverse",
                }}
            >
                <Stack spacing={2} sx={{ justifyContent: "flex-end" }}>
                    {chatMessages?.map((message, index) => {
                        const isYou = message.sender.id === user.id;
                        return (
                            <Stack
                                key={index}
                                direction="row"
                                spacing={2}
                                sx={{
                                    flexDirection: isYou
                                        ? "row-reverse"
                                        : "row",
                                    marginTop: "6px !important",
                                }}
                            >
                                {message?.sender.id !== user.id && (
                                    <AvatarWithStatus
                                        online={message.sender.online}
                                        src={message.sender.avatar}
                                    />
                                )}
                                <ChatBubble
                                    variant={isYou ? "sent" : "received"}
                                    isYou={isYou}
                                    {...message}
                                />
                            </Stack>
                        );
                    })}
                </Stack>
                {/* <div ref={messagesEndRef} /> */}
            </Box>
            <MessageInput
                sx={{ flexShrink: 0 }}
            />
        </Sheet>
    );
}
