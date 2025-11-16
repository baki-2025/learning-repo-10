import axios from "axios"

const axiosInstance = axios.create({
    bashURL: `https://learning-server-10.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
}

export default useAxios;




//● client-side code GitHub repository: https://github.com/baki-2025/learning-repo-10
//● client-side live website link: https://deluxe-sherbet-ef9dd2.netlify.app/
//● server-side code GitHub repository: https://github.com/baki-2025/learning-server-10
//● server-side live website link:  https://learning-server-10.vercel.app/