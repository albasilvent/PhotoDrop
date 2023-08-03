import { getToken } from "../utils/get-token";

export async function sendDeleteComment(postId, commentId) {
    const requestInit = {
        method: "delete",
        headers: {},
    };

    const token = getToken();
    if (token) {
        requestInit.headers["authorization"] = token;
    }
    requestInit.headers["Content-Type"] = "application/json";

    const response = await fetch(`http://localhost:5000/posts/${postId}/comments/${commentId}` , requestInit);

    const result = await response.json();

    if (!result.success) {
        throw result.error;
    }

    return;
}
