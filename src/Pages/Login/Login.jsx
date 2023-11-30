
import { useContext, useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useAxiosPublic from '../../Hook/useAxiosPublic';
import useManager from '../../Hook/useManager';
import useAdmin from '../../Hook/useAdmin';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const axiosPublic = useAxiosPublic();
    const [errorMassage, setErrorMassage] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [isManager, , managerRefetch] = useManager()
    const [isAdmin,, adminRefetch] = useAdmin();

    const { googleSignIn, signIn } = useContext(AuthContext)
    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        signIn(email, password)
            .then(res => {
                console.log(res.data);
                swal("Log in", "successful", "success")
                adminRefetch()
                managerRefetch()
            })
            .catch(() => {
                setErrorMassage('login failed please check your email and password and try again');
            })


    }
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(res => {
                const userInfo = { name: res.user?.displayName, email: res.user?.email }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/createStore')
                        swal("Log in", "successful", "success")
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    useEffect(()=>{
        console.log('admin' , isAdmin);
        console.log('manager' , isManager);
        if (isAdmin) {
            console.log(isManager, isAdmin);
            navigate('/dashboard/manageShop')
        }
        if (isManager) {
            console.log(isManager, isAdmin);
            navigate('/dashboard/productManagement')
        }

    },[isManager , isAdmin , navigate ])
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div className="bg-base-200">
             <Helmet>
                <title>ProVision | Login </title>
            </Helmet>
            <div className="lg:w-2/4 md:w-3/4 mx-auto py-32 px-4">
                <div>
                    <h1 className="text-5xl font-bold text-center mb-8">Login now!</h1>
                </div>
                <div className="card shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" required placeholder="email" className="input input-bordered" />
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
                                <button className="BTN">Login</button>
                            </div>
                        </form>
                        {
                            errorMassage && <p className="text-red-500">{errorMassage}</p>
                        }
                        <button onClick={handleGoogleLogin} className="border-2 font-bold border-black w-[170px] flex items-center gap-3 p-1 rounded-lg ">
                            <img className="w-8" src="https://tinyurl.com/4d5vrs96" alt="" />
                            sign in google
                        </button>

                        <p>Do not have an account? <Link to="/signUp"> <span className="text-blue-600 font-bold cursor-pointer text-[18px]">Sign Up</span></Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;