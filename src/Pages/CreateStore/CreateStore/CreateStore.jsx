import { useContext } from "react";
import { useForm } from "react-hook-form";
import { BsDot } from "react-icons/bs"
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useNavigate } from "react-router-dom";


const CreateStore = () => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        console.log(user._id);
        const createShopInfo = {
            shop_name : data.shop_name ,
            shop_logo : data.shop_logo,
            shop_owner_name : data.shop_owner_name,
            shop_owner_email : data.shop_owner_email,
            shop_info : data.shop_info,
            shop_location : data.shop_location,
            product_limit: 3
        }
        axios.post('http://localhost:5000/shops', createShopInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Create store successful.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset()
                }
            })
            .catch(error => {
                console.log(error.massage);
            })

        axiosSecure.patch(`/users/manager/${user?.email}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    window.location.reload()
                    navigate('/dashboard' || "/")
                }
            })

    };
    return (
        <div className="p-8 md:mx-0 mx-2 my-16 shadow-lg border">
            <h2 className="md:text-4xl text-2xl my-8 font-bold text-center underline">Create Store</h2>


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="md:flex gap-16 justify-between">
                    <div className="flex-1 space-y-2">
                        <label className="text-xl font-bold">Shop Name :</label>
                        <input
                            {...register("shop_name", { required: true })}
                            className="w-full px-5 rounded-md py-1 border" placeholder="Shop Name" />
                        <br />
                        {errors.shop_name && <span className="text-red-600 flex items-center"><BsDot></BsDot> This field is required</span>}
                    </div>
                    <div className="flex-1 space-y-2">
                        <label className="text-xl font-bold">Shop Logo :</label>
                        <input {...register("shop_logo", { required: true })} className="w-full px-5 rounded-md py-1 border" placeholder="Logo URL" />
                        <br />
                        {errors.shop_logo && <span className="text-red-600 flex items-center"><BsDot></BsDot> This field is required</span>}
                    </div>
                </div>
                <div className="md:flex mt-4 gap-16 justify-between">
                    <div className="flex-1 space-y-2">
                        <label className="text-xl font-bold">Shop Owner Name :</label>
                        <input value={user?.displayName} {...register("shop_owner_name", { required: true })} className="w-full px-5 rounded-md py-1 border" placeholder="shop owner name" />
                        <br />
                        {errors.shop_owner_name && <span className="text-red-600 flex items-center"><BsDot></BsDot> This field is required</span>}
                    </div>
                    <div className="flex-1 space-y-2">
                        <label className="text-xl font-bold">Shop Owner Email :</label>
                        <input value={user?.email} {...register("shop_owner_email", { required: true })}
                            className="w-full px-5 rounded-md py-1 border" placeholder="shop owner email" />
                        <br />
                        {errors.shop_owner_email && <span className="text-red-600 flex items-center"><BsDot></BsDot> This field is required</span>}
                    </div>

                </div>
                <div className="md:flex gap-16 justify-between">
                    <div className="flex-1 space-y-2">
                        <label className="text-xl font-bold">Shop Info :</label>
                        <input
                            {...register("shop_info", { required: true })}
                            className="w-full px-5 rounded-md py-1 border" placeholder="Shop Info" />
                        <br />
                        {errors.shop_info && <span className="text-red-600 flex items-center"><BsDot></BsDot> This field is required</span>}
                    </div>
                    <div className="flex-1 space-y-2">
                        <label className="text-xl font-bold">Shop Location :</label>
                        <input {...register("shop_location", { required: true })} className="w-full px-5 rounded-md py-1 border" placeholder="location" />
                        <br />
                        {errors.shop_location && <span className="text-red-600 flex items-center"><BsDot></BsDot> This field is required</span>}
                    </div>
                </div>


                <input className="BTN w-full" type="submit" value="Create Store" />
            </form>
        </div>
    );
};

export default CreateStore;