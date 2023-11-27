import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://inventory-management-server-gamma.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;