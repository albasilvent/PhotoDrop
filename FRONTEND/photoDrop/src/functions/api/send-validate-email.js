export async function sendValidateEmail(payload) {
    const requestInit = {
        method: "post",
        headers: {},
    };

    requestInit.headers["Content-Type"] = "application/json";
    requestInit.body = JSON.stringify(payload);

    const response = await fetch(
        `http://localhost:5000/users/validate-email`,
        requestInit
    );

    const result = await response.json();

    if (!result.success) {
        throw result.error;
    }

    return;
}
