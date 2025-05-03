import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import {
    Dropdown,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    Sheet,
    Stack,
    Textarea,
} from "@mui/joy";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import StrikethroughSRoundedIcon from "@mui/icons-material/StrikethroughSRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { apiRequest } from "@/api/api";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/store/messages/messagesSlice";
import { updateLastMessage } from "@/store/chats/chatsSlice";
import { addEvent } from "@/store/events/eventsSlice";

export default function MessageInput() {
    const textAreaRef = useRef(null);
    const dispatch = useDispatch();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState("");
    const chat = useSelector((state) => state.chats.selectedChat);
    const onSubmit = async () => {
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
            // console.log("response: ", response.data);
            // console.log("comparison: ", false === !!response.data.group_id);
            dispatch(
                updateLastMessage({
                    receiverId: response.data.receiver_id,
                    groupId: response.data.group_id,
                    lastMessage: response.data.message,
                    lastMessageDate: response.data.created_at,
                })
            );

            // if (messagesEndRef.current) {
            //     messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
            // }
        }
    };

    const handleClick = () => {
        if (textAreaValue.trim() !== "") {
            onSubmit();
            setTextAreaValue("");
        }
    };

    const onInputKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleClick();
        }
    };

    // const messageCreated = (message) => {
    //     if (chat && chat.is_group && chat.id === message.groups_id) {
    //         dispatch(addMessage(message));
    //     }

    //     if (
    //         chat &&
    //         chat.is_user &&
    //         (chat.id == message.sender_id || chat.id == message.receiver_id)
    //     ) {
    //         dispatch(addMessage(message));
    //     }
    // };

    // useEffect(() => {
    //     let addEventData = {
    //         name: "message.created",
    //         cb: messageCreated,
    //     };

    //     dispatch(addEvent(addEventData));

    //     return () => {
    //         // offCreated();
    //     };
    // }, [chat]);

    return (
        <Sheet
            variant="soft"
            color="neutral"
            sx={{
                p: 1,
                display: "flex",
                alignItems: "end",
                backgroundColor: "background.level1",
                borderRadius: "2xl",
                gap: 1,
            }}
        >
            {/* Plus Button */}

            <Dropdown>
                <MenuButton
                    className="hover:background.level1 active:background.level1"
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{
                        marginBottom: "5px",
                        transition: "background-color 0.2s ease",
                        paddingInline: "5px",
                        "&:hover": {
                            backgroundColor: "transparent",
                        },
                        "&:active": {
                            backgroundColor: "transparent",
                        },
                    }}
                >
                    <AddRoundedIcon
                        sx={{
                            fontSize: "25px",
                        }}
                    />
                </MenuButton>

                <Menu
                    disablePortal
                    placement="top-start"
                    sx={{
                        minWidth: 140,
                        borderRadius: "12px",
                        boxShadow: "var(--joy-shadow-md)",
                        padding: "0.5rem",
                        zIndex: 1200,
                    }}
                >
                    <MenuItem className="text-xs font-medium">
                        Option 1
                    </MenuItem>

                    <MenuItem className="text-xs font-medium">
                        Option 2
                    </MenuItem>

                    <MenuItem className="text-xs font-medium">
                        Option 2
                    </MenuItem>
                </Menu>
            </Dropdown>

            <Stack
                direction="row"
                alignItems="end"
                spacing={1}
                sx={{
                    flex: 1,
                    borderRadius: "25px",
                    backgroundColor: "background.body",
                    px: 1,
                    py: 0.5,
                    boxShadow: "none",
                    minHeight: "35px",
                }}
            >
                {/* Textarea */}
                <Textarea
                    placeholder=""
                    aria-label="Message"
                    ref={textAreaRef}
                    onChange={(event) => setTextAreaValue(event.target.value)}
                    value={textAreaValue}
                    minRows={1}
                    maxRows={6}
                    onKeyDown={onInputKeyDown}
                    sx={{
                        flex: 1,
                        paddingY: "6px",
                        border: "none",
                        "& textarea": {
                            boxShadow: "none !important",
                            outline: "none !important",
                            resize: "none",
                            maxHeight: 120,
                            overflowY: "auto",
                            fontSize: "1rem",
                        },
                        "--Textarea-focusedHighlight": "transparent",
                        "--Textarea-focusedThickness": "0px",
                        backgroundColor: "transparent",
                        borderRadius: "25px",
                        boxShadow: "none",
                        outline: "none",
                    }}
                />

                {/* Emoji Button inside the same box */}
                <IconButton
                    variant="plain"
                    color="neutral"
                    size="sm"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    sx={{
                        borderRadius: "50%",
                        p: 1,
                        minWidth: "32px",
                        minHeight: "32px",
                        flexShrink: 0,
                        transition: "background-color 0.2s ease",
                        "&:hover": {
                            backgroundColor: "background.body",
                        },
                    }}
                >
                    <EmojiEmotionsRoundedIcon fontSize="small" />
                </IconButton>
            </Stack>

            {/* Send Button */}
            <IconButton
                disabled={textAreaValue.trim().length > 0 ? false : true}
                variant="solid"
                color="primary"
                size="md"
                onClick={handleClick}
                sx={{
                    borderRadius: "25px",
                    flexShrink: 0,
                    marginBottom: "5px",
                }}
            >
                <SendRoundedIcon
                    sx={{
                        alignSelf: "center",
                        marginLeft: "3px",
                    }}
                />
            </IconButton>

            {/* Emoji Picker (conditionally rendered) */}
            {showEmojiPicker && (
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "60px",
                        right: "10px",
                        zIndex: 10,
                    }}
                >
                    {/* Example if you are using react-emoji-picker */}
                    {/* Replace with your actual emoji picker component */}
                    <div className="bg-white p-2 rounded shadow">
                        😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇
                    </div>
                </Box>
            )}
        </Sheet>
    );
}
