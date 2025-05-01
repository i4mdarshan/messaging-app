const TWELVE_HOUR_DATE_OPTIONS = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
};

export function formatMessageTimestamp(dateString) {
    const inputDate = new Date(dateString);
    const now = new Date();

    // Reset times for accurate date comparison
    const inputMidnight = new Date(inputDate);
    inputMidnight.setHours(0, 0, 0, 0);

    const todayMidnight = new Date(now);
    todayMidnight.setHours(0, 0, 0, 0);

    const msInDay = 24 * 60 * 60 * 1000;
    const dayDiff = Math.floor((todayMidnight - inputMidnight) / msInDay);

    if (dayDiff === 0) {
        // Today → show time
        return inputDate.toLocaleTimeString([], TWELVE_HOUR_DATE_OPTIONS);
    } else if (dayDiff === 1) {
        return "Yesterday";
    } else if (dayDiff <= 6) {
        // Last 7 days → show weekday
        return inputDate.toLocaleDateString("en-US", { weekday: "long" }); // e.g. "Saturday"
    } else {
        // Older → dd/mm/yy
        return inputDate.toLocaleDateString("en-GB"); // e.g. "21/04/25"
    }
}

export function isObjectEmpty(objectName) {
    return (
        objectName &&
        Object.keys(objectName).length === 0 &&
        objectName.constructor === Object
    );
}

export function formatIsoTime12Hour(isoString) {
    if (!isoString) return null;

    const date = new Date(isoString);

    return date.toLocaleTimeString([], TWELVE_HOUR_DATE_OPTIONS);
}
