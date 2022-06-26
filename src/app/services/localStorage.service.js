const KEY = "userData";

export function setUserDataToStorage(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
}
export function getUserDataToStorage() {
    return JSON.parse(localStorage.getItem(KEY));
}
export function removeUserDataToStorage() {
    localStorage.removeItem(KEY);
}
const localStorageService = {
    setUserDataToStorage,
    getUserDataToStorage,
    removeUserDataToStorage
};

export default localStorageService;
