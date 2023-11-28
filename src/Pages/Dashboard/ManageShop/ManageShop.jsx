import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useRef, useState } from "react";
import "./ManageShop.css"
import emailjs from 'emailjs-com';
import Swal from "sweetalert2";


const ManageShop = () => {
    const axiosSecure = useAxiosSecure()
    const form = useRef();
    const [messageText, setMessage] = useState('');
    const [selectedShop, setSelectedShop] = useState(null);
    const { data } = useQuery({
        queryKey: ['shops'],
        queryFn: async () => {
            const res = await axiosSecure.get('/shops')
            return res.data;
        }
    })
    const handleSendNotice = (shop) => {
        setSelectedShop(shop);
        document.getElementById('my_modal_1').showModal();
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };
    const sendEmail = (e) => {
        e.preventDefault();
        const templateParams = {
            to_email: `${selectedShop?.shop_owner_email}`,
            message: `${messageText}`,
        };

        emailjs.send('service_573wf7b', 'template_gjzh5lj', templateParams, 'eTQYSiXzdRPUO0Bzh')
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Notice send to ${selectedShop?.shop_owner_name}`,
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
            <h2 className="text-4xl underline text-center font-bold mb-8">All Shop {data?.length} </h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="text-center text-[14px]">
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>Shop Logo</th>
                            <th>Shop Name</th>
                            <th>Product Limit</th>
                            <th className="w-2/5">Shop Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            data?.map((shop, index) =>
                                <tr key={shop?._id}>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="avatar">
                                            <div className="rounded w-12 h-12">
                                                <img src={shop?.shop_logo} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{shop?.shop_name}</td>
                                    <td>{shop?.product_limit}</td>
                                    <td className="text-left">{shop?.shop_info}</td>
                                    <th>
                                        <button className="BTN " onClick={() => handleSendNotice(shop)}>Send Notice</button>
                                        <dialog id="my_modal_1" className="modal">

                                            <div className="modal-box relative">
                                                <span className="cursor-pointer absolute right-3 top-2 text-xl" onClick={handleClose}>X</span>
                                                <h3 className="font-bold mt-4 text-lg text-center mb-3">shop name : <span className="text-color">{selectedShop?.shop_name}</span></h3>

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
                                </tr>


                            )
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageShop;