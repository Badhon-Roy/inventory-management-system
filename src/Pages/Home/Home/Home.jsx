import { AiOutlineMail } from "react-icons/ai";
import About from "../About/About";
import Contact from "../Contact/Contact";
import { LuClock, LuPhoneCall } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";


const Home = () => {
    return (
        <div>
            <img className="md:h-[80vh] w-full object-cover" src="https://thetechportal.com/wp-content/uploads/2021/10/ecommerce-10.jpg" alt="" />
            <About />
            <section>
                <h2 className="md:text-4xl text-2xl font-bold relative text-center my-16">
                    Why <span className="text-color">Choose </span> Us
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-b-4 border-[#ff792e] md:w-48 w-28"></span>
                </h2>

                <div className="my-16 grid md:grid-cols-4 gap-5">
                    <div className="border p-8 text-center shadow-lg rounded-lg">
                        <span className="flex justify-center text-5xl text-color"><IoLocationOutline /></span>
                        <h2 className="text-xl font-bold my-2">Address</h2>
                        <p>6890 Blvd, The Bronx, NY 1058, USA</p>
                    </div>
                    <div className="border p-8 text-center shadow-lg rounded-lg">
                        <span className="flex justify-center text-5xl text-color"><LuPhoneCall /></span>
                        <h2 className="text-xl font-bold my-2">Phone</h2>
                        <p>Hotline: 16798 <br />Tech support: (+123) 456-7898</p>
                    </div>
                    <div className="border p-8 text-center shadow-lg rounded-lg">
                        <span className="flex justify-center text-5xl text-color"><AiOutlineMail /></span>
                        <h2 className="text-xl font-bold my-2">Email</h2>
                        <p>hello@dream.com <br /> Skype: hello.dream</p>
                    </div>
                    <div className="border p-8 text-center shadow-lg rounded-lg">
                        <span className="flex justify-center text-5xl text-color"><LuClock /></span>
                        <h2 className="text-xl font-bold my-2">Working Hours</h2>
                        <p>Sunday - Friday <br />8:00AM - 9:00PM</p>
                    </div>
                </div>
            </section>
            <Contact></Contact>
        </div>
    );
};

export default Home;