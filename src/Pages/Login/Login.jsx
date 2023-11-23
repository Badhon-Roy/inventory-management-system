
import { useContext, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Login = () => {
    const [errorMassage, setErrorMassage] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const { googleSignIn, signIn } = useContext(AuthContext)
    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        signIn(email, password)
            .then(res => {
                console.log(res.user);
                navigate(location?.state ? location.state : '/')
                swal("Log in", "successful", "success")
                e.target.reset();
            })
            .catch(() => {
                setErrorMassage('login failed please check your email and password and try again');
            })
            

    }
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(res => {
                console.log(res.user);
                navigate(location?.state ? location.state : '/')
                swal("Log in", "successful", "success")
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div className="bg-base-200">
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
                                <button className="btn btn-primary text-xl text-white">Login</button>
                            </div>
                        </form>
                        {
                            errorMassage && <p className="text-red-500">{errorMassage}</p>
                        }
                        <button onClick={handleGoogleLogin} className="border-2 font-bold border-black w-[170px] flex items-center gap-3 p-1 rounded-lg transform translate-x-0 transition-transform ease-in-out duration-300 hover:translate-x-5 bg-gradient-to-r hover:from-green-500 hover:to-blue-500">
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