import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import AvatarWithStatus from "./AvatarWithStatus";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import MessagesPaneHeader from "./MessagesPaneHeader";
import { apiRequest } from "@/api/api";

export default function MessagesPane({ chat, setSelectedChat }) {
    const [chatMessages, setChatMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [textAreaValue, setTextAreaValue] = useState("");

    // useEffect(() => {
    //     setChatMessages(chat.messages);
    // }, [chat.messages]);

    useEffect(() => {
        // if (chat.id) {
        //     fetchMessages(chat.id);
        // }
        const userId = 3;
        fetchMessages(userId);
    }, []);

    const fetchMessages = async (userId) => {
        setLoading(true);
        const response = await apiRequest({
            method: "POST",
            url: "/messages",
            data: { user_id: userId },
            useMiddleware: ["auth"],
        });

        if (response.success) {
            setChatMessages(response.data.messages);
            setSelectedChat(response.data.selectedChat);
        }
        setLoading(false);
    };

    return (
        <Sheet
            sx={{
                height: {
                    sm: "calc(100dvh - var(--Header-height))",
                    md: "86dvh",
                },
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.level1",
            }}
        >
            <MessagesPaneHeader
                sender={chat?.sender}
                setSelectedChat={setSelectedChat}
            />
            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    minHeight: 0,
                    px: 2,
                    py: 3,
                    overflowY: "scroll",
                    flexDirection: "column-reverse",
                }}
            >
                <Stack spacing={2} sx={{ justifyContent: "flex-end" }}>
                    {chatMessages?.map((message, index) => {
                        const isYou = message.sender === "You";
                        return (
                            <Stack
                                key={index}
                                direction="row"
                                spacing={2}
                                sx={{
                                    flexDirection: isYou
                                        ? "row-reverse"
                                        : "row",
                                }}
                            >
                                {message?.sender !== "You" && (
                                    <AvatarWithStatus
                                        online={message.sender.online}
                                        src={message.sender.avatar}
                                    />
                                )}
                                <ChatBubble
                                    variant={isYou ? "sent" : "received"}
                                    {...message}
                                />
                            </Stack>
                        );
                    })}
                </Stack>
            </Box>
            <MessageInput
                textAreaValue={textAreaValue}
                setTextAreaValue={setTextAreaValue}
                onSubmit={() => {
                    const newId = chatMessages.length + 1;
                    const newIdString = newId.toString();
                    setChatMessages([
                        ...chatMessages,
                        {
                            id: newIdString,
                            sender: "You",
                            content: textAreaValue,
                            timestamp: "Just now",
                        },
                    ]);
                }}
            />
        </Sheet>
    );
}
