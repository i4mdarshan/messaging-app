import React, { useState } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { formatIsoTime12Hour } from "@/utils/utils";

export default function ChatBubble({
    message,
    variant,
    created_at,
    group_id,
    attachment = undefined,
    sender,
    isYou,
}) {
    const isSent = variant === "sent";
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isCelebrated, setIsCelebrated] = useState(false);
    return (
        <Box
            sx={{
                maxWidth: {
                    xs: "75%",
                    md: "60%",
                },
                minWidth: "auto",
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "flex-start", mb: 0.25 }}
            >
                {group_id > 0 ? (
                    <Typography level="body-xs">
                        {!isYou ? sender.name : ""}
                    </Typography>
                ) : (
                    ""
                )}
            </Stack>
            {attachment ? (
                <Sheet
                    variant="outlined"
                    sx={[
                        {
                            px: 1.75,
                            py: 1.25,
                            borderRadius: "lg",
                        },
                        isSent
                            ? { borderTopRightRadius: 0 }
                            : { borderTopRightRadius: "lg" },
                        isSent
                            ? { borderTopLeftRadius: "lg" }
                            : { borderTopLeftRadius: 0 },
                    ]}
                >
                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ alignItems: "center" }}
                    >
                        <Avatar color="primary" size="lg">
                            <InsertDriveFileRoundedIcon />
                        </Avatar>
                        <div>
                            <Typography sx={{ fontSize: "sm" }}>
                                {attachment.fileName}
                            </Typography>
                            <Typography level="body-sm">
                                {attachment.size}
                            </Typography>
                        </div>
                    </Stack>
                </Sheet>
            ) : (
                <Box
                    sx={{ position: "relative" }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Sheet
                        color={isSent ? "primary" : "neutral"}
                        variant={isSent ? "solid" : "soft"}
                        sx={[
                            {
                                p: 1.25,
                                borderRadius: "lg",
                                display: "inline-flex",
                                alignItems: "flex-end",
                                gap: "6px",
                                minWidth: "fit-content",
                                maxWidth: "100%",
                            },
                            isSent
                                ? {
                                      borderTopRightRadius: 0,
                                  }
                                : {
                                      borderTopRightRadius: "lg",
                                  },
                            isSent
                                ? {
                                      borderTopLeftRadius: "lg",
                                  }
                                : {
                                      borderTopLeftRadius: 0,
                                  },
                            isSent
                                ? {
                                      backgroundColor:
                                          "var(--joy-palette-primary-solidBg)",
                                  }
                                : {
                                      backgroundColor: "background.body",
                                  },
                        ]}
                    >
                        <Typography
                            level="body-sm"
                            sx={{
                                color: isSent
                                    ? "var(--joy-palette-common-white)"
                                    : "var(--joy-palette-text-primary)",
                                wordBreak: "break-word",
                                overflowWrap: "anywhere",
                            }}
                        >
                            {message}
                        </Typography>

                        <Box
                            sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                alignSelf: "flex-end",
                                gap: "4px",
                                marginTop: "2px",
                                flexShrink: 0
                            }}
                        >
                            {/* Time */}
                            <Typography
                                level="body-xs"
                                sx={{
                                    fontSize: "0.65rem",
                                    color: isSent
                                        ? "var(--joy-palette-common-white)"
                                        : "var(--joy-palette-text-secondary)",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {formatIsoTime12Hour(created_at)}
                            </Typography>
                        </Box>
                        {/* <Typography
                            level="body-xs"
                            sx={{
                                position: "absolute",
                                fontSize: "0.65rem",
                                color: isSent
                                    ? "var(--joy-palette-common-white)"
                                    : "var(--joy-palette-text-secondary)",
                                alignSelf: "flex-end", // always stick to bottom-right
                                mt: 0.5,
                                bottom: 6,
                                right: 8,
                            }}
                        >
                            {formatIsoTime12Hour(created_at)}{" "}
                        </Typography> */}
                    </Sheet>
                    {/* {(isHovered || isLiked || isCelebrated) && (
                        <Stack
                            direction="row"
                            spacing={0.5}
                            sx={{
                                justifyContent: isSent
                                    ? "flex-end"
                                    : "flex-start",
                                position: "absolute",
                                top: "50%",
                                p: 1.5,
                            }}
                        >
                            <IconButton
                                variant={isLiked ? "soft" : "plain"}
                                color={isLiked ? "danger" : "neutral"}
                                size="sm"
                                onClick={() =>
                                    setIsLiked((prevState) => !prevState)
                                }
                            >
                                {isLiked ? "❤️" : <FavoriteBorderIcon />}
                            </IconButton>
                            <IconButton
                                variant={isCelebrated ? "soft" : "plain"}
                                color={isCelebrated ? "warning" : "neutral"}
                                size="sm"
                                onClick={() =>
                                    setIsCelebrated((prevState) => !prevState)
                                }
                            >
                                {isCelebrated ? (
                                    "🎉"
                                ) : (
                                    <CelebrationOutlinedIcon />
                                )}
                            </IconButton>
                        </Stack>
                    )} */}
                </Box>
            )}
        </Box>
    );
}
