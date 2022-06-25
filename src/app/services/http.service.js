import configFile from "../config.json";

export function sendForm(data) {
    const headers = {
        "Content-Type": "application/json"
    };
    return fetch(configFile.apiEndPoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: headers
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    });
}
