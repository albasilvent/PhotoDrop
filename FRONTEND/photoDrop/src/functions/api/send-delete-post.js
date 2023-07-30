import { getToken } from "../utils/get-token";

export async function sendDeletePost(postId) {
    const requestInit = {
        method: "delete",
        headers: {},
    };

    const token = getToken();
    if (token) {
        requestInit.headers["authorization"] = token;
    }
    requestInit.headers["Content-Type"] = "application/json";

    const response = await fetch(`http://localhost:5000/posts/${postId}` , requestInit);

    const result = await response.json();

    if (!result.success) {
        throw result.error;
    }

    return;
}