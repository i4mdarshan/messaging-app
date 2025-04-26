import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import AvatarWithStatus from "./AvatarWithStatus";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import MessagesPaneHeader from "./MessagesPaneHeader";
import { usePage } from "@inertiajs/react";

export default function MessagesPane({
    chat,
    setSelectedChat,
    chatMessages,
    setChatMessages,
}) {
    const page = usePage();
    // const [loading, setLoading] = useState(true);
    const [textAreaValue, setTextAreaValue] = useState("");
    const user = page.props.auth.user;
    // useEffect(() => {
    //     setChatMessages(chat.messages);
    // }, [chat.messages]);
    // console.log("chatMessages", chatMessages);
    // console.log("chat in messagesPane",chat);

    return (
        <Sheet
            sx={{
                height: {
                    sm: "86dvh",
                    md: "86dvh",
                },
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.level2",
            }}
        >
            <MessagesPaneHeader
                sender={chat}
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
