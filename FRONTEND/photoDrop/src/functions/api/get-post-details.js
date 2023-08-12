import { getToken } from "../utils/get-token";

export async function getPostDetails(postId) {
    const requestInit = {
        method: "get",
        headers: {},
    };

    const token = getToken();
    if (token) {
        requestInit.headers["authorization"] = token;
    }

    const response = await fetch(`http://localhost:5000/posts/${postId}` , requestInit);

    const result = await response.json();

    if (!result.success) {
        throw result.error;
    }

    return result.data;
}