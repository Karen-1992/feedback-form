import configFile from "../config.json";

export async function postData(data) {
    const headers = {
        "Content-Type": "application/json"
    };
    const response = await fetch(configFile.apiEndPoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers
    });
    return response;
}
