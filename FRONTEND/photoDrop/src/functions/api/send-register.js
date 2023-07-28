export async function sendRegister(payload) {
    const requestInit = {
        method: "post",
        headers: { "Content-Type": "application/json" },
    };
    requestInit.body = JSON.stringify(payload);

    const response = await fetch(
        "http://localhost:5000/users/register",
        requestInit
    );
    const result = await response.json();
    if (!result.success) {
        throw result.error;
    }

    return result.data;
}
