
const About = () => {
    const textShadowStyle = {
        textShadow: '-5px 10px 4px rgba(0, 0, 0, 0.20)', // Adjust the values as needed
    };
    return (
        <div className="md:mx-0 mx-4">
            <h2 className="md:text-4xl text-2xl font-bold relative text-center my-16">
                <span className="text-color">About </span> Us
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-b-4 border-[#ff792e] md:w-28 w-16"></span>
            </h2>
            <div className="md:flex items-center gap-5">
                <div className="flex-1">
                    <p className="text-color">We believe in less but better</p>
                    <h2 className="md:text-4xl text-2xl font-bold"><span className="md:text-5xl text-3xl ">Welcome</span> to MedQ! The purpose of your service is to create our MedQ. So we always want to be...</h2>
                    <p className="text-xl">We were working honestly for 25 years. To make a positive impact in the markets where we operate, to empower partners and the community. we focusing on growth and adding value to customers.</p>
                </div>
                <div className="flex-1 md:my-0 my-5 ">
                    <div className="diff aspect-[16/9]">
                        <div className="diff-item-1">
                            <img alt="daisy" className="opacity-30 rounded" src="https://www.simplilearn.com/ice9/free_resources_article_thumb/What_Is_Inventory_Management.jpg" />
                        </div>
                        <div className="diff-item-2">
                            <img alt="daisy" className="rounded" src="https://www.simplilearn.com/ice9/free_resources_article_thumb/What_Is_Inventory_Management.jpg" />
                        </div>
                        <div className="diff-resizer"></div>
                    </div>
                </div>
            </div>
            <div className="md:my-32 my-16 grid md:grid-cols-4 grid-cols-2 gap-10">
                <div className="text-center">
                    <h2 style={textShadowStyle} className="text-color md:text-6xl text-3xl font-bold">10M</h2>
                    <p className="text-xl font-bold">Happy Clients</p>
                </div>
                <div className="text-center">
                    <h2 style={textShadowStyle} className="text-color md:text-6xl text-3xl font-bold">20M</h2>
                    <p className="text-xl font-bold">Global Customers</p>
                </div>
                <div className="text-center">
                    <h2 style={textShadowStyle} className="text-color md:text-6xl text-3xl font-bold">99+</h2>
                    <p className="text-xl font-bold">Experts Employee</p>
                </div>
                <div className="text-center">
                    <h2 style={textShadowStyle} className="text-color md:text-6xl text-3xl font-bold">25+</h2>
                    <p className="text-xl font-bold">Awards Win</p>
                </div>

            </div>
        </div>
    );
};

export default About;