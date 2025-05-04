import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Sheet, useTheme } from "@mui/joy";
import ChatsPane from "@/Components/ChatsPane";
import MessagesPane from "@/Components/MessagesPane";
import { useMediaQuery } from "@mui/material";
import MessagePaneHelp from "@/Components/MessagePaneHelp";
import { isObjectEmpty } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { setChats, updateLastMessage } from "@/store/chats/chatsSlice";
import { addMessage } from "@/store/messages/messagesSlice";
import {
    leavePresenceChannel,
    setupPresenceChannel,
} from "@/socket/SocketManager";

function Chat() {
    const page = usePage();
    const theme = useTheme();
    const chats = page.props.chats;
    const user = page.props.auth.user;
    const dispatch = useDispatch();
    const selectedChat = useSelector((state) => state.chats.selectedChat);
    const onlineUsers = useSelector((state) => state.usersPresence.onlineUsers);
    const isUserOnline = (userId) => onlineUsers[userId];
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // dispatch will change since the data will be
    useEffect(() => {
        dispatch(setChats(chats));
        return () => {};
    }, [chats]);

    // used to manage the socket connections of presence channel
    useEffect(() => {
        setupPresenceChannel();
        return () => {
            leavePresenceChannel();
        };
    }, []);

    // create channels for messaging and emit messages
    // useEffect(() => {
    //     chats.forEach((chat) => {
    //         let channel = `messages.group.${chat.id}`;

    //         if (chat.is_user) {
    //             channel = `messages.user.${[
    //                 parseInt(user.id),
    //                 parseInt(chat.id),
    //             ]
    //                 .sort((a, b) => a - b)
    //                 .join("-")}`;
    //         }
    //         // console.log("channel: ", channel);

    //         Echo.private(channel)
    //             .error((error) => {
    //                 console.log(error);
    //             })
    //             .listen("SocketMessages", (event) => {
    //                 // console.log("SocketMessages: ", event);
    //                 const message = event.message;

    //                 // if (message.sender_id === user.id) {
    //                 //     return;
    //                 // }

    //                 // dispatch(addMessage(message));
    //             });
    //     });

    //     // cleanup of channels
    //     return () => {
    //         chats.forEach((chat) => {
    //             let channel = `messages.group.${chat.id}`;

    //             if (chat.is_user) {
    //                 channel = `messages.user.${[
    //                     parseInt(user.id),
    //                     parseInt(chat.id),
    //                 ]
    //                     .sort((a, b) => a - b)
    //                     .join("-")}`;
    //             }

    //             Echo.leave(channel);
    //         });
    //     };
    // }, [chats]);

    return (
        <>
            <Head title="Chat" />

            <div className="md:py-6 lg:py-6 xs:py-2 sm:py-2">
                <div className="mx-auto max-w-8xl sm:px-6 lg:px-6">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <Sheet
                            sx={{
                                flex: 1,
                                width: "100%",
                                mx: "auto",
                                // pt: { xs: "var(--Header-height)", md: 0 },
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "minmax(min-content, min(30%, 400px)) 1fr",
                                },
                                height: {
                                    sm: "86dvh",
                                    md: "86dvh",
                                },
                            }}
                        >
                            <Sheet
                                sx={{
                                    position: { xs: "fixed", sm: "sticky" },
                                    transform: {
                                        xs: "translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))",
                                        sm: "none",
                                    },
                                    transition: "transform 0.4s, width 0.4s",
                                    zIndex: 100,
                                    width: "100%",
                                    top: 64,
                                    height: {
                                        xs: "calc(100dvh - 64px)",
                                    },
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                                style={{
                                    // Apply CSS variable conditionally
                                    "--MessagesPane-slideIn": !isObjectEmpty(
                                        selectedChat
                                    )
                                        ? 0
                                        : 1,
                                }}
                            >
                                <ChatsPane
                                    // below prop is used only for UI purpose
                                    selectedChatId={`${
                                        !isObjectEmpty(selectedChat) &&
                                        selectedChat.is_group
                                            ? "group_"
                                            : "user_"
                                    }${selectedChat.id}`}
                                    isUserOnline={isUserOnline}
                                />
                            </Sheet>

                            {isMobile ? (
                                !isObjectEmpty(selectedChat) && <MessagesPane />
                            ) : !isObjectEmpty(selectedChat) ? (
                                <MessagesPane />
                            ) : (
                                <MessagePaneHelp />
                            )}
                        </Sheet>
                    </div>
                </div>
            </div>
        </>
    );
}

Chat.layout = (page) => {
    return <AuthenticatedLayout>{page}</AuthenticatedLayout>;
};

export default Chat;
