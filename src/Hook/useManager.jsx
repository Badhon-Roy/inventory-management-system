import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useManager = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data : isManager} = useQuery({
        queryKey : [user?.email , "isManager"],
        queryFn : async() => {
            const res = await axiosSecure.get(`/users/manager/${user.email}`);
            console.log(res.data);
            return res.data?.manager;
        }
    });
    return [isManager]
};

export default useManager;