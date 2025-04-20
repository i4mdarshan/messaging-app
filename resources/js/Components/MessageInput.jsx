import React, { useRef } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import { IconButton, Stack, Textarea } from "@mui/joy";

import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import StrikethroughSRoundedIcon from "@mui/icons-material/StrikethroughSRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

export default function MessageInput({
    textAreaValue,
    setTextAreaValue,
    onSubmit,
}) {
    const textAreaRef = useRef(null);
    const handleClick = () => {
        if (textAreaValue.trim() !== "") {
            onSubmit();
            setTextAreaValue("");
        }
    };
    return (
        <Box sx={{ px: 2, pb: 1 }}>
            <FormControl>
                <Textarea
                    placeholder="Type something here…"
                    aria-label="Message"
                    ref={textAreaRef}
                    onChange={(event) => {
                        setTextAreaValue(event.target.value);
                    }}
                    value={textAreaValue}
                    minRows={1}
                    maxRows={10}
                    endDecorator={
                        <Stack
                            direction="row"
                            sx={{
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexGrow: 1,
                                py: 1,
                                pr: 1,
                                borderTop: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <div>
                                <IconButton
                                    size="sm"
                                    variant="plain"
                                    color="neutral"
                                >
                                    <FormatBoldRoundedIcon />
                                </IconButton>
                                <IconButton
                                    size="sm"
                                    variant="plain"
                                    color="neutral"
                                >
                                    <FormatItalicRoundedIcon />
                                </IconButton>
                                <IconButton
                                    size="sm"
                                    variant="plain"
                                    color="neutral"
                                >
                                    <StrikethroughSRoundedIcon />
                                </IconButton>
                                <IconButton
                                    size="sm"
                                    variant="plain"
                                    color="neutral"
                                >
                                    <FormatListBulletedRoundedIcon />
                                </IconButton>
                            </div>
                            <Button
                                size="sm"
                                color="primary"
                                sx={{ alignSelf: "center", borderRadius: "sm" }}
                                endDecorator={<SendRoundedIcon />}
                                onClick={handleClick}
                            >
                                Send
                            </Button>
                        </Stack>
                    }
                    onKeyDown={(event) => {
                        if (
                            event.key === "Enter" &&
                            (event.metaKey || event.ctrlKey)
                        ) {
                            handleClick();
                        }
                    }}
                    sx={{
                        "& textarea:first-of-type": {
                            minHeight: 32,
                        },
                        // Override the native textarea style
                        "& textarea": {
                            boxShadow: "none !important",
                            outline: "none !important",
                            border: "none !important",
                        },

                        // Remove ring when focused
                        "& textarea:focus": {
                            boxShadow: "none !important",
                            outline: "none !important",
                        },
                        "--Textarea-focusedHighlight": "transparent",
                        "--Textarea-focusedThickness": "0px",
                        boxShadow: "none !important",
                        outline: "none",
                    }}
                />
            </FormControl>
        </Box>
    );
}
