import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
    const currentDate = new Date()
    const formateDate = currentDate.toLocaleDateString()
    const {user} = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure();
    const {data} = useQuery({
        queryKey : ['shop_name' , user?.email],
        queryFn : async ()=>{
            const res = await axiosSecure.get(`/shops?shop_owner_email=${user.email}`)
            return res.data;
        }
    })
    const shop_id = data?._id
    const shop_name = data?.shop_name
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async(data) => {
        data.productQuantity = parseFloat(data.productQuantity);
        data.productionCost = parseFloat(data.productionCost);
        data.profitMargin = parseFloat(data.profitMargin);
        data.discount = parseFloat(data.discount);
        const textPercentage = 7.5;
        const SellingPrice =(data.productionCost + (data.productionCost * textPercentage / 100)  + (data.productionCost * data.profitMargin /100)).toFixed(2);
        const imageFile = { image: data.image[0] }
        console.log(imageFile);
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if(res.data.success){
            console.log(res.data.data.display_url);
            const productInfo = {
                product_name : data.productName ,
                product_image : res.data.data.display_url ,
                quantity : data.productQuantity ,
                product_location : data.productLocation ,
                cost : data.productionCost,
                profit_margin : data.profitMargin,
                discount : data.discount,
                description : data.productDescription,
                date : formateDate,
                shop_id , shop_name ,
                sale_count : 0,
                selling_price : parseFloat(SellingPrice),
                name : user?.displayName ,
                email : user?.email
                
            }
            axiosSecure.post('/products', productInfo)
            .then(res =>
                {
                    console.log(res.data);
                    if(res.data.insertedId){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Add Product Successful.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/dashboard/productManagement')
                    }
                })

        }
    };

    return (
        <div>
            <h2 className="md:text-4xl text-2xl font-bold relative text-center mb-16">
                <span className="text-color">Add </span> Product
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-b-4 border-[#ff792e] md:w-36 w-24"></span>
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="md:flex gap-16 justify-between">
                    <div className="flex-1 space-y-2" >
                        <label className="text-xl font-bold">Product Name:</label>
                        <input {...register("productName", { required: true })} className="w-full focus:outline-[#ff792e] px-5 rounded-md py-1 border" placeholder="Enter product name" />
                        {errors.productName && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className="flex-1 space-y-2">
                        <label className="text-xl font-bold">Image Uploading System:</label>
                        <input type="file" {...register("image")} />
                    </div>
                </div>

                <div className="md:flex gap-16 justify-between">
                    <div className="flex-1 space-y-2">
                        <label className="text-xl font-bold">Product Quantity:</label>
                        <input type="number" {...register("productQuantity", { required: true })} className="w-full focus:outline-[#ff792e] px-5 rounded-md py-1 border" placeholder="Enter quantity" />
                        {errors.productQuantity && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className="flex-1 space-y-2">
                        <label className="text-xl font-bold">Product Location:</label>
                        <input {...register("productLocation", { required: true })} className="w-full focus:outline-[#ff792e] px-5 rounded-md py-1 border" placeholder="Enter location" />
                        {errors.productLocation && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>

                <div className="md:flex gap-16 justify-between">
                    <div className="flex-1 space-y-2">
                        <label className="text-xl font-bold">Production Cost:</label>
                        <input type="number" {...register("productionCost", { required: true })} className="w-full focus:outline-[#ff792e] px-5 rounded-md py-1 border" placeholder="Enter production cost" />
                        {errors.productionCost && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className="flex-1 space-y-2">
                        <label className="text-xl font-bold">Profit Margin (%):</label>
                        <input type="number" {...register("profitMargin", { required: true })} className="w-full focus:outline-[#ff792e] px-5 rounded-md py-1 border" placeholder="Enter profit margin" />
                        {errors.profitMargin && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div>
                        <label className="text-xl font-bold">Discount (%):</label>
                        <input type="number" {...register("discount")} className="w-full focus:outline-[#ff792e] px-5 rounded-md py-1 border" placeholder="Enter discount" />
                    </div>
                </div>



                <label className="text-xl font-bold">Product Description:</label>
                <textarea rows={5} {...register("productDescription", { required: true })} className="w-full focus:outline-[#ff792e] px-5 rounded-md py-1 border" placeholder="Enter product description" />
                {errors.productDescription && <span className="text-red-500">This field is required</span>}

                <br />

                <button type="submit" className="BTN w-full">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;