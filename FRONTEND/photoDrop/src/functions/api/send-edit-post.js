import { getToken } from "../utils/get-token";

export async function sendEditPost(data, postId) {
    for (var key of data.entries()) {
        console.log(key[0] + ", " + key[1]);
    }

    const requestInit = {
        method: "put",
        headers: {},
    };

    const token = getToken();
    if (token) {
        requestInit.headers["authorization"] = token;
    }
    requestInit.body = data;

    const response = await fetch(
        `http://localhost:5000/posts/${postId}`,
        requestInit
    );

    const result = await response.json();

    if (!result.success) {
        console.log(result.error);
    }
}
