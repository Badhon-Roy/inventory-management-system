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


    const itemsPerPage = 10;
    const maxPagesToShow = 4
    const [currentPage, setCurrentPage] = useState(1);
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItems = matchedUsersAndShops?.slice(firstItem, lastItem)
    const totalPages = Math.ceil(matchedUsersAndShops?.length / itemsPerPage);
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log('change page', page);
    };




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
                        {currentItems?.map(({ user, shop }, index) => (
                            <tr key={user?._id}>
                                <th>
                                    <label>
                                    {index + 1 + firstItem}
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
            <div className="pagination flex items-center justify-center my-5">
                <button
                    className="BTN"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span className="mx-2 text-blue-500 font-bold rounded-full px-2 border-blue-500 border-2">1</span>
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                    
                    <label key={page} className="mx-5">
                        
                        <input
                            type="radio"
                            name="pagination"
                            value={page}
                            checked={currentPage === page}
                            className="mx-2 cursor-pointer"
                            onChange={() => handlePageChange(page)}
                        />
                        {page}
                    </label>
                ))}
                <span className="mx-2 text-blue-500 font-bold rounded-full px-1 border-blue-500 border-2">...{totalPages}</span>
                <button
                    className="BTN"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminSaleSummary;
