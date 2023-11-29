import { useState } from "react";
const maxPagesToShow = 4;
const SalesHistory = ({ sales }) => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItems = sales?.slice(firstItem, lastItem)
    const totalPages = Math.ceil(sales?.length / itemsPerPage);
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <div>
            <h2 className="md:text-4xl text-2xl font-bold relative text-center my-16">
                <span className="text-color">Sales </span> History
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-b-4 border-[#ff792e] md:w-48 w-28"></span>
            </h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <label>#</label>
                            </th>
                            <th>Product Name</th>
                            <th>Selling date</th>
                            <th>Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems?.map((item, index) => (
                            <tr key={item?._id}>
                                <th>
                                    <label>{index + 1 + firstItem}</label>
                                </th>
                                <td>{item?.product_name}</td>
                                <td>{item?.sales_date.toLocaleString()}</td>
                                <th>$ {(item?.selling_price - item?.cost)?.toFixed(2)}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination flex items-center justify-center my-5">
                <button
                    className="BTN"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span className="mx-2 text-blue-500 font-bold rounded-full px-2 border-blue-500 border-2">1</span>
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                    
                    <label key={page} className="mx-5">
                        
                        <input
                            type="radio"
                            name="pagination"
                            value={page}
                            checked={currentPage === page}
                            className="mx-2 cursor-pointer"
                            onChange={() => handlePageChange(page)}
                        />
                        {page}
                    </label>
                ))}
                <span className="mx-2 text-blue-500 font-bold rounded-full px-1 border-blue-500 border-2">...{totalPages}</span>
                <button
                    className="BTN"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SalesHistory;
