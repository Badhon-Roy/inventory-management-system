import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useManager = () => {
    const { user, loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: isManager,isLoading: isManagerLoading , refetch : managerRefetch } = useQuery({
        queryKey: [user?.email, "isManager"],
        enabled: !loading && !!user?.email && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/users/manager/${user.email}`);
                console.log(res.data);
                return res.data?.manager;
            }
        }
    });
    return [isManager , isManagerLoading , managerRefetch]
};

export default useManager;