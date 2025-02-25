import React, { useState } from 'react'
import useProductStore from '../store/product'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreatePage = () => {

  const [newProduct,setNewProduct] = useState({
    name:"",
    price:"",
    image:""
  })

  const {createProduct} = useProductStore();

  const handleAddProduct=async(e)=>{
    e.preventDefault();
    const {success,message}=await createProduct(newProduct)
    if (success) {
      toast.success("Product was added successfully!", {
        position: "top-right",
        autoClose: 3000,
        className: 'p-0 w-[400px] border border-purple-600/40',
      });
    } else {
      toast.error(message || "Failed to add product!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    setNewProduct({name:"",price:"",image:""})
  }

  return (
    <div>
      <div className='w-2/3 mx-auto flex flex-col justify-center items-center mt-16'>
        <div className='text-5xl font-semibold text-gray-100'>Create New Product</div>
        <div className=' bg-gray-950 mt-16 w-4/6 rounded-md'>
          <form className='flex flex-col px-5 py-7 gap-4' onSubmit={handleAddProduct}>
            <input type="text" placeholder='Product Name' className='h-10 rounded-lg px-2 py-1 border bg-gray-950 border-gray-600 text-gray-200'
              value={newProduct.name} onChange={(e)=>setNewProduct({...newProduct, name:e.target.value})}
            />
            <input type="text" placeholder='Price' className='h-10 rounded-lg px-2 py-1 border bg-gray-950 border-gray-600 text-gray-200'
              value={newProduct.price} onChange={(e)=>setNewProduct({...newProduct, price:e.target.value})}
            />
            <input type="text" placeholder='Image URL' className='h-10 rounded-lg px-2 py-1 border bg-gray-950 border-gray-600 text-gray-200'
              value={newProduct.image} onChange={(e)=>setNewProduct({...newProduct, image:e.target.value})}
            />
            <button type="submit" className='bg-blue-300 font-semibold h-10 text-blue-950 py-1'>Submit</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default CreatePage