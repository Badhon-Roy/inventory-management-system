import { useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./Testimonial.css"
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'aos/dist/aos.css';
import AOS from 'aos';


const Testimonial = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    useEffect(() => {
        AOS.init({
            duration: 500,
            offset: 200,
        });
    }, []);
    return (
        <div className='md:mx-32 mx-4'>
            <h2 data-aos="fade-right" className="md:text-4xl text-2xl font-bold relative text-center mt-16 mb-8"> What
                <span className="text-color"> Our Client </span> Are Saying
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-b-4 border-[#ff792e] md:w-48 w-16"></span>
            </h2>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper "
            >
                <SwiperSlide className='md:my-8 flex flex-col'>
                    <img className='w-[80px]' src="https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo2-39-512.png" alt="" />
                    <h2 className='md:w-2/4 w-3/4 text-xl mb-4 md:mt-8'>“I ordered Saftey equipment at ProVision Inventory site. Within 24 hours of ordering, they delivered my products, the quality of the product is very good. I am very happy! ”</h2>
                    <div className="rating mb-4">
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" checked />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                    </div>
                    <div className='flex justify-center gap-4'>
                        <img className='w-[100px] mb-8' src="https://eu-fr.confirmation.com/media/236000/credit-client.png" alt="" />
                        <h2 className='text-xl mt-3 text-left font-bold'>Dominick Eakin<br /> <span className='text-base font-normal'>customer</span></h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='md:my-8 flex flex-col'>
                    <img className='w-[80px]' src="https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo2-39-512.png" alt="" />
                    <h2 className='md:w-2/4 w-3/4 text-xl mb-4 md:my-8'>“I ordered Saftey equipment at ProVision Inventory site. Within 24 hours of ordering, they delivered my products, the quality of the product is very good. I am very happy! ”</h2>
                    <div className="rating mb-4">
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" checked />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                    </div>
                    <div className='flex justify-center gap-4'>
                        <img className='w-[100px] mb-8' src="https://www.getcanopy.com/hubfs/%20Illustration/About/Desktop/Larry%20Furr.png" alt="" />
                        <h2 className='text-xl mt-3 text-left font-bold'>James Andy<br /> <span className='text-base font-normal'>customer</span></h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='md:my-8 flex flex-col'>
                    <img className='w-[80px]' src="https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo2-39-512.png" alt="" />
                    <h2 className='md:w-2/4 w-3/4 text-xl mb-4 md:my-8'>“I ordered Saftey equipment at ProVision Inventory site. Within 24 hours of ordering, they delivered my products, the quality of the product is very good. I am very happy! ”</h2>
                    <div className="rating mb-4">
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" checked />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                    </div>
                    <div className='flex justify-center gap-4'>
                        <img className='w-[100px] mb-8' src="https://myntfinance.co.uk/wp-content/uploads/2022/11/him-1024x997.png" alt="" />
                        <h2 className='text-xl mt-3 text-left font-bold'>John Smith <br /> <span className='text-base font-normal'>customer</span></h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='md:my-8 flex flex-col'>
                    <img className='w-[80px]' src="https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo2-39-512.png" alt="" />
                    <h2 className='md:w-2/4 w-3/4 text-xl mb-4 md:my-8'>“I ordered Saftey equipment at ProVision Inventory site. Within 24 hours of ordering, they delivered my products, the quality of the product is very good. I am very happy! ”</h2>
                    <div className="rating mb-4">
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" checked />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                    </div>
                    <div className='flex justify-center gap-4'>
                        <img className='w-[100px] mb-8' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Fmc0SgtlhwQ6MEbfM8QHKiKDUIOao5BOUA&usqp=CAU" alt="" />
                        <h2 className='text-xl mt-3 text-left font-bold'>John Smith <br /> <span className='text-base font-normal'>customer</span></h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='md:my-8 flex flex-col'>
                    <img className='w-[80px]' src="https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo2-39-512.png" alt="" />
                    <h2 className='md:w-2/4 w-3/4 text-xl mb-4 md:my-8'>“I ordered Saftey equipment at ProVision Inventory site. Within 24 hours of ordering, they delivered my products, the quality of the product is very good. I am very happy! ”</h2>
                    <div className="rating mb-4">
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" checked />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-[#ff7f37]" />
                    </div>
                    <div className='flex justify-center gap-4'>
                        <img className='w-[100px] mb-8' src="https://eu-fr.confirmation.com/media/1118/audit-client.png?width=425&height=425" alt="" />
                        <h2 className='text-xl mt-3 text-left font-bold'>John Smith <br /> <span className='text-base font-normal'>customer</span></h2>
                    </div>
                </SwiperSlide>
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </div>
    );
};

export default Testimonial;