import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
// import { chats } from "@/data/data";
import { Sheet, useTheme } from "@mui/joy";
import ChatsPane from "@/Components/ChatsPane";
import MessagesPane from "@/Components/MessagesPane";
import { useMediaQuery } from "@mui/material";
import MessagePaneHelp from "@/Components/MessagePaneHelp";

function Chat({ selectedChats, messages }) {
    const page = usePage();
    const theme = useTheme();
    const chats = page.props.chats;
    const [selectedChat, setSelectedChat] = useState([]);
    const [localChats, setLocalChats] = useState([]);
    const [sortedChats, setSortedChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState({});
    const isUserOnline = (userId) => onlineUsers[userId];
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    // console.log("onlineUsers", onlineUsers);
    // console.log("selected chat", selectedChat);
    // console.log("messages", messages);

    const onSearch = (ev) => {
        const search = ev.target.value.toLowerCase();
        setLocalChats(
            chats.filter((chat) => {
                return chat.name.toLowerCase().includes(search);
            })
        );
    };

    useEffect(() => {
        setSortedChats(
            localChats.sort((a, b) => {
                if (a.last_message_date && b.last_message_date) {
                    return b.last_message_date.localeCompare(
                        a.last_message_date
                    );
                } else if (a.last_message_date) {
                    return -1;
                } else if (b.last_message_date) {
                    return 1;
                } else {
                    return 0;
                }
            })
        );

        return () => {};
    }, [localChats]);

    useEffect(() => {
        setLocalChats(chats);

        return () => {};
    }, [chats]);

    // WebSocket enabler
    useEffect(() => {
        Echo.join("online")
            .here((users) => {
                const onlineUsersObj = Object.fromEntries(
                    users.map((user) => [user.id, user])
                );
                setOnlineUsers((prevOnlineUsers) => {
                    return {
                        ...prevOnlineUsers,
                        ...onlineUsersObj,
                    };
                });
            })
            .joining((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = { ...prevOnlineUsers };
                    updatedUsers[user.id] = user;
                    return updatedUsers;
                });
            })
            .leaving((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = { ...prevOnlineUsers };
                    updatedUsers[user.id] = user;
                    return updatedUsers;
                });
            })
            .error((error) => {
                console.error("error", error);
            });

        return () => {
            Echo.leave("online");
        };
    }, []);

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
                                pt: { xs: "var(--Header-height)", md: 0 },
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "minmax(min-content, min(30%, 400px)) 1fr",
                                },
                                height: {
                                    sm: "calc(100dvh - var(--Header-height))",
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
                                    top: 52,
                                    height: {
                                        xs: "calc(100dvh - 52px)",
                                    },
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                                style={{
                                    // Apply CSS variable conditionally
                                    "--MessagesPane-slideIn":
                                        selectedChat.length > 0 ? 0 : 1,
                                }}
                            >
                                <ChatsPane
                                    chats={sortedChats}
                                    selectedChatId={selectedChat.id}
                                    setSelectedChat={setSelectedChat}
                                    isUserOnline={isUserOnline}
                                    onSearch={onSearch}
                                />
                            </Sheet>

                            {isMobile ? (
                                selectedChat.length > 0 && (
                                    <MessagesPane
                                        chat={[]}
                                        setSelectedChat={setSelectedChat}
                                    />
                                )
                            ) : selectedChat.length > 0 ? (
                                <MessagesPane
                                    chat={selectedChat}
                                    setSelectedChat={setSelectedChat}
                                />
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
