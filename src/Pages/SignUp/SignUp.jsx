
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hook/useAxiosPublic';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    const axiosPublic = useAxiosPublic()
    const { createUser, userProfile } = useContext(AuthContext)
    const [errorMassage, setErrorMassage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const handleRegister = async (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const imageFile = e.target.image.files[0];
        const formData = new FormData();
        formData.append('image', imageFile);






        if (password.length < 6) {
            setErrorMassage("Password must be at least 6 characters");
            return;
        }
        else if (!/^(?=.*[a-z]).*$/.test(password)) {
            setErrorMassage("Password must have at least one Lowercase Character.");
            return;
        }
        else if (! /^(?=.*[A-Z]).*$/.test(password)) {
            setErrorMassage("Password must have at least one Uppercase Character.")
            return;
        }
        else if(! /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/.test(password)){
            setErrorMassage("Password must contain at least one Special Symbol.")
            return;
        }
        else {
            setErrorMassage('');
        }


        try {
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {
                const image = res.data.data.url;

                createUser(email, password)
                    .then(res => {
                        console.log(res.user);
                        userProfile(name, image)
                            .then(() => {
                                const userInfo = { name: name, email: email }
                                axiosPublic.post('/users', userInfo)
                                    .then(res => {
                                        if (res.data.insertedId) {
                                            Swal.fire({
                                                position: 'top-end',
                                                icon: 'success',
                                                title: 'User created successfully.',
                                                showConfirmButton: false,
                                                timer: 1500
                                            });
                                            navigate('/createStore');
                                            window.location.reload()
                                        }
                                    })
                            })
                            .catch(error => {
                                setErrorMassage(error.code)
                            });
                    });
            }
        } catch (error) {
            console.error('Image upload failed:', error);
            setErrorMassage('Image upload failed. Please try again.');
        }
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    console.log(errorMassage);
    return (
        <div className="bg-base-200">
             <Helmet>
                <title>ProVision | Sign Up </title>
            </Helmet>
            <div className="md:w-2/4 mx-auto py-20 px-4">
                <div>
                    <h1 className="text-5xl font-bold text-center mb-8">Please Sign Up</h1>
                </div>
                <div className="card shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-xl mt-2">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Your name" className="input input-bordered" required />
                            </div> <br />

                            <div className="flex-1 space-y-2">
                                <label className="text-xl">Profile Image:</label> <br />
                                <input type="file" name="image" id="" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="text-xl mt-2">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control ">
                                <label className="label">
                                    <span className="text-xl mt-2">Password</span>
                                </label>
                                <div className="relative">
                                    <input type={`${showPassword ? 'text' : 'password'}`} name="password" placeholder="password" className="input input-bordered w-full" required />

                                    <p className="absolute right-5 top-4 text-xl" onClick={handleShowPassword}>
                                        {
                                            showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>
                                        }
                                    </p>
                                </div>


                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="BTN">Sign Up</button>
                            </div>
                        </form>
                        {
                            errorMassage && <p className="text-red-500">{errorMassage}</p>
                        }
                        <p>You have an account? <Link to="/login"> <span className="text-blue-600 font-bold cursor-pointer text-[18px]">Login</span></Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;