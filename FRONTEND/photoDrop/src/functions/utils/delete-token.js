export function deleteToken() {
    localStorage.removeItem("USER_TOKEN");
    localStorage.removeItem("USER");
}
