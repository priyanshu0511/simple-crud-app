import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import useProductStore from '../store/product';
import { ToastContainer, toast } from 'react-toastify';

const UpdateModal = ({ product, closeModal, setGetSuccess }) => {
    const { updateProduct } = useProductStore();

    const [selectedProduct, setSelectedProduct] = useState(product || { name: '', price: '', image: '' });

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        const { success, message } = await updateProduct(selectedProduct._id, selectedProduct);
        
        
        if (success) {
            toast.success("Product updated successfully!", {
                position: "top-right",
                autoClose: 1000,
                className: 'p-0 w-[400px] border border-purple-600/40',
                onClose: closeModal,
            });
        } else {
            toast.error(message || "Failed to update product!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };
        
    

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <form className='flex flex-col px-5 py-7 gap-4 w-2/5 m-auto bg-gray-950 mx-auto mt-36' onSubmit={handleUpdate}>
                <button type="button" onClick={closeModal} className="mr-0 ml-auto text-white text-xl">
                    <RxCross1 />
                </button>
                <input
                    type="text"
                    placeholder="Product Name"
                    className="h-10 rounded-lg px-2 py-1 border bg-gray-950 border-gray-600 text-gray-200"
                    value={selectedProduct.name}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Price"
                    className="h-10 rounded-lg px-2 py-1 border bg-gray-950 border-gray-600 text-gray-200"
                    value={selectedProduct.price}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    className="h-10 rounded-lg px-2 py-1 border bg-gray-950 border-gray-600 text-gray-200"
                    value={selectedProduct.image}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, image: e.target.value })}
                />
                <button type="submit" className="bg-blue-300 font-semibold h-10 text-blue-950 py-1">
                    Update
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default UpdateModal;
