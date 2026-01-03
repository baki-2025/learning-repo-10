import axios from 'axios';


const axiosInstance = axios.create({
  
  baseURL: 'https://learning-server-10.vercel.app'
})

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;



