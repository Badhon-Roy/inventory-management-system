
import { useEffect } from "react";
import About from "../About/About";
import Contact from "../Contact/Contact";
import CountDown from "../CountDown/CountDown";
import Testimonial from "../Testimonial/Testimonial";
import 'aos/dist/aos.css';
import AOS from 'aos';

const Home = () => {

    useEffect(() => {
        AOS.init({
            duration: 500,
            offset: 200,
        });
    }, []);
    return (
        <div >
            <img className="md:h-[700px] w-full object-cover " src="https://www.corporatevision-news.com/wp-content/uploads/2021/12/Inventory.jpg" alt="" />
            <About />
            <section className="md:mx-0 mx-4">
                <h2 data-aos="fade-right" className="md:text-4xl text-2xl font-bold relative text-center my-16">
                    Why <span className="text-color">Choose </span> Us
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-b-4 border-[#ff792e] md:w-48 w-28"></span>
                </h2>

                <div className="my-16 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                    <div data-aos="zoom-in-up" className="border p-8 text-center shadow-lg rounded-lg">
                        <span className="flex justify-center">
                            <img className="w-[100px] mb-5" src="https://cdn-icons-png.flaticon.com/512/4160/4160989.png" alt="" />
                        </span>
                        <h2 className="text-xl font-bold my-2">User-Friendly Interface</h2>
                        <p>Discuss how your inventory management system offers an intuitive and user-friendly interface.</p>
                    </div>
                    <div  data-aos="zoom-in-up" className="border p-8 text-center shadow-lg rounded-lg">
                        <span className="flex justify-center">
                            <img className="w-[100px] mb-5" src="https://cdn-icons-png.flaticon.com/512/3542/3542975.png" alt="" />
                        </span>
                        <h2 className="text-xl font-bold my-2">Customization Options</h2>
                        <p>Tailor our inventory management system to your needs with flexible customization options, ensuring a seamless fit for your unique business requirements.</p>
                    </div>
                    <div  data-aos="zoom-in-up" className="border p-8 text-center shadow-lg rounded-lg">
                        <span className="flex justify-center">
                            <img className="w-[100px] mb-5" src="https://cdn-icons-png.flaticon.com/512/5145/5145897.png" alt="" />
                        </span>
                        <h2 className="text-xl font-bold my-2">Security Measures</h2>
                        <p>Ensure data safety with robust security: encryption, secure logins, and regular audits for comprehensive protection.</p>
                    </div>
                    <div  data-aos="zoom-in-up" className="border p-8 text-center shadow-lg rounded-lg">
                        <span className="flex justify-center">
                            <img className="w-[100px] mb-5" src="https://cdn-icons-png.flaticon.com/512/7364/7364295.png" alt="" />
                        </span>
                        <h2 className="text-xl font-bold my-2">Automation Features</h2>
                        <p>Detail the automation features of your system, such as automatic reordering, alerts for low stock levels, and automated reporting</p>
                    </div>
                </div>
            </section>
           <CountDown></CountDown>
           <Testimonial></Testimonial>
            <Contact></Contact>
        </div>
    );
};

export default Home;