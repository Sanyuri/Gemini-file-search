export function getCurrentSessionChat() {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith("currentSessionChat="))
        ?.split("=")[1] || "";
}