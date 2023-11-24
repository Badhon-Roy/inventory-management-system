import { Link } from "react-router-dom";

const ProductManagement = () => {
    return (
        <div>
            <h2>This is product management .</h2>
            <Link to="/dashboard/addProduct">
                <button className="btn btn-primary">Add Product</button>
            </Link>
        </div>
    );
};

export default ProductManagement;