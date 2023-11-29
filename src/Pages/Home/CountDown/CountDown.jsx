import { useEffect, useState } from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';

const CountDown = () => {
    const [countdown, setCountdown] = useState({
        days: 28,
        hours: 10,
        minutes: 24,
        seconds: 40,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => {
                let newCountdown = { ...prevCountdown };
                if (newCountdown.seconds > 0) {
                    newCountdown.seconds -= 1;
                } else {
                    newCountdown.seconds = 59;
                    if (newCountdown.minutes > 0) {
                        newCountdown.minutes -= 1;
                    } else {
                        newCountdown.minutes = 59;
                        if (newCountdown.hours > 0) {
                            newCountdown.hours -= 1;
                        } else {
                            newCountdown.hours = 23;

                            if (newCountdown.days > 0) {
                                newCountdown.days -= 1;
                            } else {
                                clearInterval(interval);
                            }
                        }
                    }
                }

                return newCountdown;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const textShadowStyle = {
        textShadow: '0px 10px 4px rgba(0, 0, 0, 0.25)', // Adjust the values as needed
    };
    useEffect(() => {
        AOS.init({
            duration: 500,
            offset: 200,
        });
    }, []);
    return (
        <div className="lg:flex justify-between items-center gap-8 md:my-32">
            <div className="flex-1">
                <img data-aos="zoom-in-right" src="https://blog.magezon.com/wp-content/uploads/2023/01/Conversion-blocks-13.png" alt="" />
            </div>
            <div data-aos="zoom-in-up" className="flex-1 md:mx-0 mx-4">
               <p className="text-color text-center font-bold"> Deal of the Month</p>
                <h2 style={textShadowStyle} className="md:text-6xl text-4xl font-bold text-center md:leading-[80px] leading-[60px]">Up to <span className="text-color">50%</span> OFF. <br /> All Sales Are <br /> Final!</h2>
                <div className="grid justify-center my-16 gap-5 text-center md:grid-cols-none md:grid-flow-col grid-cols-2 md:auto-cols-max">
                    <div style={textShadowStyle} className="flex md:mx-0 mx-auto flex-col p-5 shadow-2xl border rounded">
                        <span className="countdown font-mono text-5xl text-center">{countdown.days}</span>
                        days
                    </div>
                    <div style={textShadowStyle}   className="flex md:mx-0 mx-auto flex-col p-5 shadow-2xl border rounded">
                        <span className="countdown font-mono text-5xl text-center">{countdown.hours}</span>
                        hours
                    </div>
                    <div style={textShadowStyle}  className="flex md:mx-0 mx-auto flex-col p-5 shadow-2xl border rounded">
                        <span className="countdown font-mono text-5xl text-center">{countdown.minutes}</span>
                        min
                    </div>
                    <div style={textShadowStyle}   className="flex md:mx-0 mx-auto flex-col p-5 shadow-2xl border rounded">
                        <span className="countdown font-mono text-5xl text-center">{countdown.seconds}</span>
                        sec
                    </div>
                </div>
                <div className="flex justify-center">
                    <button style={textShadowStyle} className="BTN shadow-2xl">Shop Now</button>
                </div>
            </div>
        </div>
    );
};

export default CountDown;