import axios from "axios";

//import {useStateContext} from "./context/ContextProvider.jsx";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// axiosClient.interceptors.request.use((config) =>
// {

// const token = localStorage.getItem('ACCESS_TOKEN_ADMIN')
// config.headers.Authorization = `Bearer ${token}`
// return config
// })

// axiosClient.interceptors.response.use((response) => {

// return response

// }, (error) => {
// const {response} = error
// if (response.status == 401){
// localStorage.removeItem('ACCESS_TOKEN_ADMIN')
// }

// throw error;
// })

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN_ADMIN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response.status == 401) {
            localStorage.removeItem("ACCESS_TOKEN_ADMIN");
        }

        throw error;
    }
);

// axiosClient.interceptors.request.use(async (config) => {
//     const user = firebase.auth().currentUser;
//     if (user) {
//       const idToken = await user.getIdToken();
//       config.headers.Authorization = `Bearer ${idToken}`;
//     }
//     return config;
//   });

//   axiosClient.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       const { response } = error;
//       if (response.status === 401) {
//         localStorage.removeItem("ACCESS_TOKEN_ADMIN");
//       }
//       throw error;
//     }
//   );

export default axiosClient;
