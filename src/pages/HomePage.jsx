import React, { useEffect, useState } from 'react'
import { IoIosRocket } from "react-icons/io";
import useProductStore from '../store/product';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateModal from '../components/UpdateModal';

const HomePage = () => {
  const { fetchProducts, products, deleteProduct } = useProductStore();

  const [toUpdate, setToUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const[productId,setProductId]=useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      toast.success("Product deleted successfully!", {
        className: 'p-0 w-[400px] border border-red-600/40',
      });
    } else {
      toast.error(message || "Failed to delete product", {
        className: 'p-0 w-[400px] border border-red-600/40',
      });
    }
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    console.log(selectedProduct)
    setProductId(product._id);
    setToUpdate(true);
    
  };

  return (
    <div className='relative'>
      <div className={`w-11/12 mx-auto flex flex-col justify-center items-center mt-16 ${toUpdate ? 'blur-lg' : ''}`}>
        <div className='text-5xl font-semibold text-gray-100 flex'>
          <div>Current Products</div><div><IoIosRocket /></div>
        </div>
        <div className='mt-16 mb-16'>
          {products.length === 0 ? <p className='text-gray-200 font-semibold text-3xl'>No product found.
            < Link to='/create' className='text-blue-500'> Create a product.</Link></p>
            :
            <div className='grid grid-cols-3 gap-12'>
              {products.map((product) => (
                <div key={product._id} className='bg-gray-950 hover:-translate-y-2 transition-all duration-200'>
                  <img src={product.image} alt="ProductImage" className="w-80 h-52 object-cover rounded-md" />
                  <p className='text-gray-200 text-xl font-semibold px-3 pt-2'>{product.name}</p>
                  <p className='text-gray-200 text-xl font-semibold px-3 pt-1 pb-2'>&#8377;{product.price}</p>
                  <div className='px-3 mb-2 pt-1 flex gap-2'>
                    <button className='px-3 py-2 bg-blue-500 rounded-md' onClick={() => handleEditProduct(product)}><FaEdit color='white' /></button>
                    <button className='px-3 py-2 bg-red-500 rounded-md' onClick={() => handleDeleteProduct(product._id)}><MdDelete color='white' /></button>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
      {toUpdate && <UpdateModal product={selectedProduct} closeModal={()=> setToUpdate(false)} id={productId} />}
      <ToastContainer />
    </div >


  )

}

export default HomePage