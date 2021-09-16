import axios from "axios";

const register = (email, password) => {
    return axios.post(process.env.REACT_APP_API_URL + "/api/register", {
        email,
        password,
    });
};

const login = (email, password) => {
    return axios
        .post(process.env.REACT_APP_API_URL + "/api/login", {
            "email": email,
            "password": password
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem("token", response.data.token);
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const getToken = () => {
    return localStorage.getItem("token");
}

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
    getToken,
};
export default authService;