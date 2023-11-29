import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useRef, useState } from "react";
import emailjs from 'emailjs-com';
import Swal from "sweetalert2";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#01cbd5', '#ffe05c', '#816ed9'];

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
    const { data: sales = [] } = useQuery({
        queryKey: ['sales'],
        queryFn: async () => {
            const res = await axiosSecure.get('/sales')
            return res.data;
        }
    });
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products')
            return res.data;
        }
    });
    const { data: admin } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
        select: (data) => {
            return data?.find(user => user?.role === 'admin');
        },
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
    const data = [
        {
            name: 'Total Income',
            uv: `${admin?.income}`
        },
        {
            name: 'Total Product',
            uv: `${products?.length}`
        },
        {
            name: 'Total Sales',
            uv: `${sales?.length}`
        }
    ];



    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };


    return (
        <div>
            <h2 className="md:text-4xl text-2xl font-bold relative text-center mb-8"><span className="text-color">Sales </span> View
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-b-4 border-[#ff792e] md:w-48 w-28"></span>
            </h2>
            <div className="grid lg:grid-cols-3  grid-cols-1 md:gap-10 gap-5">
                <div className="border bg-[#01cbd5] p-8 rounded-md flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Total Income  <br />
                        ${admin?.income}</h2>
                    <img className="w-[60px]" src="https://static-00.iconduck.com/assets.00/sale-badge-icon-256x256-slz0mqy5.png" alt="" />
                </div>
                <div className="border bg-[#ffe05c] p-8 rounded-md flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Total Product <br /> {products?.length}</h2>
                    <img className="w-[60px]" src="https://cdn-icons-png.flaticon.com/512/2394/2394119.png" alt="" />
                </div>
                <div className="border bg-[#816ed9] p-8 rounded-md flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Total Sales <br />
                        {sales?.length}</h2>
                    <img className="w-[70px]" src="https://cdn-icons-png.flaticon.com/512/4318/4318266.png" alt="" />
                </div>
            </div>
            {/* bar chart */}
            <div className="md:flex justify-center my-10">
                <BarChart
                    width={600}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))}
                    </Bar>
                </BarChart>
            </div>
            <h2 className="md:text-4xl text-2xl font-bold relative text-center mb-8"><span className="text-color">All </span> Users {users?.length}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-b-4 border-[#ff792e] md:w-48 w-28"></span>
            </h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="text-xl">
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th className="w-1/4">Shop Name</th>
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
