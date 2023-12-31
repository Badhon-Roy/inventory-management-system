import 'aos/dist/aos.css';
import AOS from 'aos';

import { VscSend } from "react-icons/vsc";
import { useEffect } from 'react';


const Contact = () => {
    useEffect(() => {
        AOS.init({
            duration: 500,
            offset: 200,
        });
    }, []);
    return (
        <div className="md:mx-0 mx-4">
            <h2 data-aos="fade-right" className="md:text-4xl text-2xl font-bold relative text-center my-16">
                Contact <span className="text-color">Us</span>
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-b-4 border-[#ff792e] md:w-36 w-20"></span>
            </h2>

            <div className="my-16 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                <div data-aos="flip-left" className="cursor-pointer border hover:border-2 hover:border-[#ff792e] p-8 text-center shadow hover:shadow-2xl rounded-lg">
                    <span className="flex justify-center">
                        <img className="w-[120px] mb-4" src="https://cdn-icons-png.flaticon.com/512/4942/4942069.png" alt="" />
                    </span>
                    <h2 className="text-xl font-bold my-2">Address</h2>
                    <p>6890 Blvd, The Bronx, NY 1058, USA</p>
                </div>
                <div data-aos="flip-left" className="cursor-pointer border hover:border-2 p-8 text-center shadow hover:border-[#ff792e] hover:shadow-2xl rounded-lg">
                    <span className="flex justify-center">
                        <img className="w-[120px] mb-4" src="https://static.vecteezy.com/system/resources/thumbnails/025/225/156/small/3d-illustration-icon-of-phone-call-with-circular-or-round-podium-png.png" alt="" />
                    </span>
                    <h2 className="text-xl font-bold my-2">Phone</h2>
                    <p>Hotline: 16798 <br />Tech support: (+123) 456-7898</p>
                </div>
                <div data-aos="flip-right" className="cursor-pointer border hover:border-2 p-8 text-center shadow hover:border-[#ff792e] hover:shadow-2xl rounded-lg">
                    <span className="flex justify-center">
                        <img className="w-[80px] mb-4" src="https://static.vecteezy.com/system/resources/previews/010/153/613/non_2x/email-and-mail-icon-sign-symbol-design-free-png.png" alt="" />
                    </span>
                    <h2 className="text-xl font-bold my-2">Email</h2>
                    <p>hello@provision.com <br /> Skype: hello.proVision</p>
                </div>
                <div data-aos="flip-right" className="cursor-pointer border hover:border-2 p-8 text-center shadow hover:border-[#ff792e] hover:shadow-2xl rounded-lg">
                    <span className="flex justify-center">
                        <img className="w-[100px] mb-4" src="https://cdn-icons-png.flaticon.com/512/5929/5929568.png" alt="" />
                    </span>
                    <h2 className="text-xl font-bold my-2">Working Hours</h2>
                    <p>Sunday - Friday <br />8:00AM - 9:00PM</p>
                </div>
            </div>

            <div className="md:flex items-center gap-5" >

                <div className="md:w-2/3">
                    <p className="text-color">Get In Touch</p>
                    <div className="md:flex gap-5 w-full">
                        <div className="space-y-3 mb-3 flex-1">
                            <label htmlFor="" className="text-xl">First Name :</label>
                            <input type="text" className="w-full border-2 px-3 py-1 focus:outline-[#ff792e]" placeholder="First Name" name="" id="" />
                        </div>
                        <div className="space-y-3 mb-3 flex-1">
                            <label htmlFor="" className="text-xl">Email Address :</label>
                            <input type="text" className="w-full border-2 px-3 py-1 focus:outline-[#ff792e]" placeholder="Email Address" name="" id="" />
                        </div>
                    </div>
                    <div className="md:flex gap-5 w-full">
                        <div className="space-y-3 mb-3 flex-1">
                            <label htmlFor="" className="text-xl">Mobile No :</label>
                            <input type="text" className="w-full border-2 px-3 py-1 focus:outline-[#ff792e]" placeholder="Mobile No" name="" id="" />
                        </div>
                        <div className="space-y-3 mb-3 flex-1">
                            <label htmlFor="" className="text-xl">Subject :</label>
                            <input type="text" className="w-full border-2 px-3 py-1 focus:outline-[#ff792e]" placeholder="Subject" name="" id="" />
                        </div>
                    </div>
                    <div className="space-y-3 mb-3 flex-1">
                        <label htmlFor="" className="text-xl">Massage :</label>
                        <textarea rows={6} type="text" className="w-full border-2 px-3 py-1 focus:outline-[#ff792e]" placeholder="Massage" name="" id="" />
                    </div>
                    <div className="BTN">
                        <button className="flex items-center">
                            Send Massage
                            <VscSend className="ml-2 text-2xl" />
                        </button>
                    </div>
                </div>
                <div className="md:w-1/3 flex justify-center">
                    <img className="md:w-auto w-[250px]" src="https://medq-react.envytheme.com/img/contact.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Contact;