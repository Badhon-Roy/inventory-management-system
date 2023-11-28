
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useAdmin = () => {
    const { user, loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: isAdmin, isLoading: isAdminLoading , refetch : adminRefetch } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        enabled: !loading && !!user?.email && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/users/admin/${user?.email}`);
                console.log(res.data);
                return res.data?.admin;
            }
        }
    });
    return [isAdmin, isAdminLoading , adminRefetch]

};

export default useAdmin;