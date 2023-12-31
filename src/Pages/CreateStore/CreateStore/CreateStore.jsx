import { useContext } from "react";
import { useForm } from "react-hook-form";
import { BsDot } from "react-icons/bs"
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateStore = () => {
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { data: shops } = useQuery({
        queryKey: ['shops'],
        queryFn: async () => {
            const res = await axiosSecure.get('/shops');
            return res.data;
        }
    });
    const isCreateShop = shops?.find(shop => shop?.shop_owner_email === user?.email)




    const onSubmit = async (data) => {
        if (isCreateShop?.shop_owner_email === user?.email) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "You are already Create A Shop.",
                showConfirmButton: false,
                timer: 1500
              });
        }
        else {
            const imageFile = { image: data.shop_logo[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('ImgBB API response:', res.data);

            if (res.data.success) {
                console.log(res.data.data.display_url);
                const createShopInfo = {
                    shop_name: data.shop_name,
                    shop_logo: res.data.data.display_url,
                    shop_owner_name: data.shop_owner_name,
                    shop_owner_email: data.shop_owner_email,
                    shop_info: data.shop_info,
                    shop_location: data.shop_location,
                    product_limit: 3
                }
                axiosPublic.post('/shops', createShopInfo)
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
                            navigate('/dashboard/productManagement')
                            window.location.reload()
                        }
                    })

            }
        }
    };
    return (
        <div className="md:px-16 px-4 md:mx-0 mx-2 md:py-32 py-8 shadow-lg border">
            <Helmet>
                <title>ProVision | Create Store </title>
            </Helmet>
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
                        <label className="text-xl font-bold">Shop Logo :</label> <br />
                        <input type="file" {...register("shop_logo", { required: true })} />
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