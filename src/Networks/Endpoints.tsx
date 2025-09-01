export const baseUrl = "https://vaidhika-dharma-backend.onrender.com/";
export const auth_url = baseUrl + "api/auth/";

const URL = {
    REGISTER: () => auth_url + "register",
    LOGIN: () => auth_url + "login",
};
export default URL;