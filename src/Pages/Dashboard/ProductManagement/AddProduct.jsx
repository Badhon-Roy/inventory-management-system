import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async(data) => {
        data.productQuantity = parseFloat(data.productQuantity);
        data.productionCost = parseFloat(data.productionCost);
        data.profitMargin = parseFloat(data.profitMargin);
        data.discount = parseFloat(data.discount);
        const imageFile = { image: data.image[0] }
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
                description : data.productDescription
            }
            axiosSecure.post('/products', productInfo)
            .then(res =>
                {
                    console.log(res.data);
                    if(res.data.insertedId){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'User created successfully.',
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
            <h2 className="md:text-4xl mb-8 text-2xl text-center underline font-bold">Add Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="md:flex gap-16 justify-between">
                    <div className="flex-1 space-y-2" >
                        <label className="text-xl font-bold">Product Name:</label>
                        <input {...register("productName", { required: true })} className="w-full px-5 rounded-md py-1 border" placeholder="Enter product name" />
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
                        <input type="number" {...register("productQuantity", { required: true })} className="w-full px-5 rounded-md py-1 border" placeholder="Enter quantity" />
                        {errors.productQuantity && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className="flex-1 space-y-2">
                        <label className="text-xl font-bold">Product Location:</label>
                        <input {...register("productLocation", { required: true })} className="w-full px-5 rounded-md py-1 border" placeholder="Enter location" />
                        {errors.productLocation && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>

                <div className="md:flex gap-16 justify-between">
                    <div className="flex-1 space-y-2">
                        <label className="text-xl font-bold">Production Cost:</label>
                        <input type="number" {...register("productionCost", { required: true })} className="w-full px-5 rounded-md py-1 border" placeholder="Enter production cost" />
                        {errors.productionCost && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className="flex-1 space-y-2">
                        <label className="text-xl font-bold">Profit Margin (%):</label>
                        <input type="number" {...register("profitMargin", { required: true })} className="w-full px-5 rounded-md py-1 border" placeholder="Enter profit margin" />
                        {errors.profitMargin && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div>
                        <label className="text-xl font-bold">Discount (%):</label>
                        <input type="number" {...register("discount")} className="w-full px-5 rounded-md py-1 border" placeholder="Enter discount" />
                    </div>
                </div>



                <label className="text-xl font-bold">Product Description:</label>
                <textarea rows={5} {...register("productDescription", { required: true })} className="w-full px-5 rounded-md py-1 border" placeholder="Enter product description" />
                {errors.productDescription && <span className="text-red-500">This field is required</span>}

                <br />

                <button type="submit" className="btn btn-block text-xl">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;