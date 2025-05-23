import React, { useEffect, useState } from "react";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { Box, Chip, IconButton, Input } from "@mui/joy";
import List from "@mui/joy/List";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ChatListItem from "../Components/ChatListItem";
import { useSelector } from "react-redux";
import { usePage } from "@inertiajs/react";

export default function ChatsPane({ isUserOnline }) {
    // console.log("ChatsPane sortedChats: ", sortedChats);
    const page = usePage();
    const chats = useSelector((state) => state.chats.chats);
    const user = page.props.auth.user;
    const [localChats, setLocalChats] = useState([]);
    const [sortedChats, setSortedChats] = useState([]);
    // console.log("chats from pane: ", localChats);

    // handle search for chats pane
    const onSearch = (ev) => {
        const search = ev.target.value.toLowerCase();
        setLocalChats(
            chats.filter((chat) => {
                return chat.name.toLowerCase().includes(search);
            })
        );
    };

    // sort the local chats to show in the UI
    useEffect(() => {
        if (!Array.isArray(localChats) || localChats.length === 0) {
            setSortedChats([]);
            return;
        }

        const sorted = [...localChats].sort((a, b) => {
            if (a.last_message_date && b.last_message_date) {
                return b.last_message_date.localeCompare(a.last_message_date);
            } else if (a.last_message_date) {
                return -1;
            } else if (b.last_message_date) {
                return 1;
            } else {
                return 0;
            }
        });

        setSortedChats(sorted);
    }, [localChats]);

    // set localChats
    useEffect(() => {
        setLocalChats(chats);
        return () => {};
    }, [chats]);

    return (
        <Sheet
            sx={{
                borderRight: "1px solid",
                borderColor: "divider",
                height: {
                    sm: "calc(100dvh - var(--Header-height))",
                    md: "86dvh",
                },
                overflow: "hidden", // Important for controlling internal scroll
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    pb: 1.5,
                }}
            >
                <Typography
                    component="h1"
                    // endDecorator={
                    //     <Chip
                    //         variant="soft"
                    //         color="primary"
                    //         size="md"
                    //         slotProps={{
                    //             root: { component: "span" },
                    //         }}
                    //     >
                    //         4
                    //     </Chip>
                    // }
                    sx={{
                        fontSize: { xs: "md", md: "lg" },
                        fontWeight: "lg",
                        mr: "auto",
                    }}
                >
                    Messages
                </Typography>
                <IconButton
                    variant="plain"
                    aria-label="edit"
                    color="neutral"
                    size="sm"
                    sx={{
                        display: { xs: "block", sm: "unset" },
                    }}
                >
                    <EditNoteRoundedIcon />
                </IconButton>
            </Stack>
            <Box sx={{ px: 2, pb: 1.5 }}>
                <Input
                    onKeyUp={onSearch}
                    size="sm"
                    startDecorator={<SearchRoundedIcon />}
                    placeholder="Search"
                    aria-label="Search"
                    sx={{
                        // Override the native input style
                        "& input": {
                            boxShadow: "none !important",
                            outline: "none !important",
                            border: "none !important",
                        },

                        // Remove ring when focused
                        "& input:focus": {
                            boxShadow: "none !important",
                            outline: "none !important",
                        },
                        "--Input-focusedHighlight": "transparent",
                        "--Input-focusedThickness": "0px",
                        boxShadow: "none !important",
                        outline: "none",
                    }}
                />
            </Box>
            {sortedChats.length > 0 ? (
                <Box
                    sx={{
                        flex: 1,
                        minHeight: 0, // Fill parent container
                        overflowY: "auto", // Enable scroll
                        // display: "flex",
                        // flexDirection: "column",
                    }}
                >
                    <List
                        sx={{
                            py: 0,
                            "--ListItem-paddingY": "0.75rem",
                            "--ListItem-paddingX": "1rem",
                        }}
                    >
                        {sortedChats.map((chat) => (
                            <ChatListItem
                                key={chat.public_uid}
                                chat={chat}
                                online={!!isUserOnline(chat.id)}
                            />
                        ))}
                    </List>
                </Box>
            ) : (
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        px: 2,
                    }}
                >
                    <Typography variant="body-sm" color="text.secondary">
                        No chats available
                    </Typography>
                </Box>
            )}
        </Sheet>
    );
}
