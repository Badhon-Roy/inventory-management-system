import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useRef, useState } from "react";
import emailjs from 'emailjs-com';
import Swal from "sweetalert2";

const AdminSaleSummary = () => {
    const axiosSecure = useAxiosSecure();
    const form = useRef();
    const [selectedUser, setSelectedUser] = useState(null);
    const [messageText, setMessage] = useState('');
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
    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };
    const handleSendNotice = (shop) => {
        setSelectedUser(shop);
        document.getElementById('my_modal_1').showModal();
    };
    const sendEmail = (e) => {
        e.preventDefault();
        const templateParams = {
            to_email: `${selectedUser?.email}`,
            message: `${messageText}`,
        };

        emailjs.send('service_573wf7b', 'template_gjzh5lj', templateParams, 'eTQYSiXzdRPUO0Bzh')
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Notice send to ${selectedUser?.name}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setMessage('')

                    const modal = document.getElementById('my_modal_1');
                    modal.close();
                }
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };

    const handleClose = () => {
        const modal = document.getElementById('my_modal_1');
        modal.close();
    }


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

                                            <div className="modal-box relative">
                                                <span className="cursor-pointer absolute right-3 top-2 text-xl" onClick={handleClose}>X</span>
                                                <h3 className="font-bold mt-4 text-lg text-center mb-3">shop name : <span className="text-color">{selectedUser?.name}</span></h3>

                                                <div className="modal-action">
                                                    <form ref={form} onSubmit={sendEmail} method="dialog">
                                                        <input
                                                            className="px-4 py-2 focus:outline-[#ff792e] text-[16px] font-normal w-full border"
                                                            type="text"
                                                            name="massage"
                                                            onChange={handleInputChange}
                                                            required
                                                            placeholder="Enter notice text"
                                                        /> <br /> <br />
                                                        <div className="flex justify-center">
                                                            <input type="submit" className="BTN" value="Send" />
                                                        </div>

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
