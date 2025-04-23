import { Box, Typography } from "@mui/joy";

export default function MessagePaneHelp() {
    return (
        <Box
            sx={{
                flex: 1,
                height: "calc(100dvh - var(--Header-height))",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "white",
            }}
        >
            {/* <img src="/logo.svg" alt="Brand" width={120} /> */}
            {/* <Typography level="title-md" mt={2}>
                Welcome to YourApp
            </Typography> */}
            <Typography level="body-sm" color="text.secondary">
                Select a chat to get started.
            </Typography>
        </Box>
    );
}
