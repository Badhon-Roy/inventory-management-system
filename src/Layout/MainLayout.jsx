import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";


const MainLayout = () => {
    return (
        <div >
            <Navbar></Navbar>
            <div className="max-w-[1600px] mx-auto lg:px-16 md:px-8">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;