import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useState } from "react";


const ManageShop = () => {
    const axiosSecure = useAxiosSecure()
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
    return (
        <div>
            <h2 className="text-4xl underline text-center font-bold mb-8">All Shop {data?.length} </h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>Shop</th>
                            <th>Product Limit</th>
                            <th>Shop Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((shop, index) =>
                                <tr key={shop?._id}>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="rounded w-12 h-12">
                                                    <img src={shop?.shop_logo} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{shop?.shop_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{shop?.product_limit}</td>
                                    <td>{shop?.shop_info}</td>
                                    <th>
                                        <button
                                            className="BTN"
                                            onClick={() => handleSendNotice(shop)}
                                        >Send Notice</button>
                                        <dialog id="my_modal_1" className="modal">
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg text-center mb-3">{selectedShop?.shop_name}</h3>
                                                <input className="p-4 text-[16px] w-full" type="text" name="notice" id="" />
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        <button className="BTN">Send</button>
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