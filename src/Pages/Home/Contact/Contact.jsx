import { IoLocationOutline } from "react-icons/io5";


const Contact = () => {
    return (
        <div>
            <h2 className="md:text-4xl text-2xl font-bold text-center my-16">Contact Us</h2>
            <div className="my-16 grid grid-cols-4 gap-4"> 
                <div className="border p-8 text-center shadow-lg rounded-lg">
                    <span className="flex justify-center text-5xl text-color"><IoLocationOutline /></span>
                    <h2 className="text-xl font-bold my-2">Address</h2>
                    <p>6890 Blvd, The Bronx, NY 1058, USA</p>
                </div>
                <div className="border p-8 text-center shadow-lg rounded-lg">
                    <span className="flex justify-center text-5xl text-color"><IoLocationOutline /></span>
                    <h2 className="text-xl font-bold my-2">Address</h2>
                    <p>6890 Blvd, The Bronx, NY 1058, USA</p>
                </div>
                <div className="border p-8 text-center shadow-lg rounded-lg">
                    <span className="flex justify-center text-5xl text-color"><IoLocationOutline /></span>
                    <h2 className="text-xl font-bold my-2">Address</h2>
                    <p>6890 Blvd, The Bronx, NY 1058, USA</p>
                </div>
                <div className="border p-8 text-center shadow-lg rounded-lg">
                    <span className="flex justify-center text-5xl text-color"><IoLocationOutline /></span>
                    <h2 className="text-xl font-bold my-2">Address</h2>
                    <p>6890 Blvd, The Bronx, NY 1058, USA</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;