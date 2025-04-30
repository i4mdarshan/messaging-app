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

export default function MessagesPane({ chat, setSelectedChat }) {
    const page = usePage();
    const dispatch = useDispatch();
    // const messagesEndRef = useRef(null);
    const chatMessages = useSelector((state) => state.messages.chatMessages);
    // const [loading, setLoading] = useState(true);
    const [textAreaValue, setTextAreaValue] = useState("");
    const user = page.props.auth.user;

    // handle submit click for sending messages
    const onSendClick = async () => {
        if (textAreaValue.trim() === "") {
            return;
        }

        const formData = new FormData();
        formData.append("message", textAreaValue);

        if (chat.is_user) {
            formData.append("receiver_id", chat.id);
        } else if (chat.is_group) {
            formData.append("groups_id", chat.id);
        }

        const response = await apiRequest({
            method: "POST",
            url: "/send-message",
            data: formData,
            useMiddleware: ["auth"],
        });

        if (response.success) {
            setTextAreaValue("");
            dispatch(addMessage(response.data));

            // if (messagesEndRef.current) {
            //     messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
            // }

        }
    };

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
            <MessagesPaneHeader
                sender={chat}
                setSelectedChat={setSelectedChat}
                sx={{ flexShrink: 0 }}
            />
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
                textAreaValue={textAreaValue}
                setTextAreaValue={setTextAreaValue}
                sx={{ flexShrink: 0 }}
                onSubmit={onSendClick}
            />
        </Sheet>
    );
}
