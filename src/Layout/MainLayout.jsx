import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import LoadingPage from "../LoadingPage/LoadingPage";


const MainLayout = () => {
    const navigation = useNavigation();
    return (
        <div >
            <Navbar></Navbar>
            {
                navigation.state === "loading" ? <LoadingPage /> :
                    <div className="max-w-[1600px] mx-auto lg:px-16 md:px-8">
                        <Outlet></Outlet>
                    </div>
            }
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;