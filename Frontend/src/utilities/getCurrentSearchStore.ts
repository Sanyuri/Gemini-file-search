export function getCurrentSearchStore() {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith("currentFileSearchStore="))
        ?.split("=")[1] || "";
}