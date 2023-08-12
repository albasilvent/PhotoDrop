import { getToken } from "../utils/get-token";

export async function getAllPosts() {
    const requestInit = {
        method: "get",
        headers: {},
    };

    const token = getToken();
    if (token) {
        requestInit.headers["authorization"] = token;
    }

    const response = await fetch(`http://localhost:5000/posts` , requestInit);

    const result = await response.json();

    if (!result.success) {
        throw result.error;
    }

    return result.data;
}