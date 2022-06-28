import configFile from "../config.json";

export async function postData(data) {
    try {
        const headers = {
            "Content-Type": "application/json"
        };
        const response = await fetch(configFile.apiEndPoint, {
            method: "POST",
            body: JSON.stringify(data),
            headers
        });
        if (!response.ok) {
            throw new Error(`error ${response.status}`);
        }
        const result = await response.json();
        return {
            ...result,
            status: "success",
            message: "Successful submission"
        };
    } catch (error) {
        return {
            status: "error",
            message: `${error.message}: something was wrong`
        };
    }
}
