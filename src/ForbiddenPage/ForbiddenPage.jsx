import { Link } from "react-router-dom";

const ForbiddenPage = () => {
    return (
        <div>
            <div className="flex justify-center">
                <img className="w-[400px]" src="https://cdn3d.iconscout.com/3d/premium/thumb/403-forbidden-error-6194335-5073043.png?f=webp" alt="" />
            </div>
            <h2 className="text-4xl font-bold text-center">We are Sorry...</h2>
            <p className="text-center text-xl my-4">The page you are typing to access has restricted access. <br /> Please refer to your system administrator.</p>
            <Link to='/' className="flex justify-center md:mb-8 mb-4">
                <button className="BTN">Go Home</button>
            </Link>
        </div>
    );
};

export default ForbiddenPage;