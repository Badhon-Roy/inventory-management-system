import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className=" text-center my-32">
            <div className="flex justify-center">
                <img className="md:w-[500px]" src="https://static.vecteezy.com/system/resources/thumbnails/024/217/744/small/design-template-for-web-page-with-404-error-isometric-page-not-working-error-png.png" alt="" />
            </div>
            <div className="font-bold">
                <h1 className="text-4xl my-2">Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p className="text-xl mt-4">
                    <i>{error.statusText || error.message}</i>
                </p>
                <Link to="/" >
                    <button className="btn btn-error mt-4">Back Home</button>
                </Link>
            </div>

        </div>
    );
};

export default ErrorPage;