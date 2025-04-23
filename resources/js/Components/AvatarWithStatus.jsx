import { Avatar, Badge } from "@mui/joy";
import GroupIcon from "@mui/icons-material/GroupsRounded";

export default function AvatarWithStatus({
    is_user = true,
    online = false,
    avatar_url = "",
    ...other
}) {
    // Render group avatar
    if (!is_user) {
        return (
            <Avatar
                size="md"
                sx={{
                    bgcolor: "neutral.100",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                {...other}
            >
                <GroupIcon sx={{ fontSize: 24, color: "neutral.600" }} />
            </Avatar>
        );
    }

    // Render user avatar with online badge
    if (online) {
        return (
            <Badge
                color="success"
                variant="solid"
                size="sm"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeInset="4px 4px"
            >
                <Avatar src={avatar_url} size="md" {...other} />
            </Badge>
        );
    }

    // Render offline user avatar
    return <Avatar src={avatar_url} size="md" {...other} />;
}
