import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useState } from "react";

const AdminSaleSummary = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedUser, setSelectedUser] = useState(null);
    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    });
    const { data: shops = [] } = useQuery({
        queryKey: ['shops'],
        queryFn: async () => {
            const res = await axiosSecure.get('/shops')
            return res.data;
        }
    });

    const matchedUsersAndShops = users?.map(user => {
        const matchedShop = shops?.find(shop => shop?.shop_owner_email === user?.email);
        return { user, shop: matchedShop };
    });

    const handleSendNotice = (user) => {
        setSelectedUser(user);
        document.getElementById('my_modal_1').showModal();
    };

    return (
        <div>
            <h2 className="text-4xl text-blue-600 font-bold">Admin see sale summary</h2>
            <h2 className="text-4xl font-bold text-center underline my-8">All Users : {users?.length}</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Shop Name</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {matchedUsersAndShops?.map(({ user, shop }, index) => (
                            <tr key={user?._id}>
                                <th>
                                    <label>
                                        {index + 1}
                                    </label>
                                </th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{shop?.shop_name || "No Shop"}</td>
                                <td>{user?.role || "User"}</td>
                                {
                                    !shop?.shop_name && !user?.role &&
                                    <th>
                                        <button
                                            className="BTN"
                                            onClick={() => handleSendNotice(user)}
                                        >
                                            Send Notice
                                        </button>
                                        <dialog id="my_modal_1" className="modal">
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg text-center mb-3">
                                                    {selectedUser?.name}
                                                </h3>
                                                <input className="p-4 text-[16px] w-full" type="text" name="notice" id="" />
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        <button className="BTN">Send</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    </th>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminSaleSummary;
