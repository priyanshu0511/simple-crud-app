import { create } from "zustand";

const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please enter all fields." }
        }
        const res = await fetch("/api/products/", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }))
        return { success: true, message: "Product created successfully" }
    },
    fetchProducts: async () => {
        const res = await fetch('/api/products/');
        const data = await res.json();
        set({ products: data })
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE"
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };
        set(state => ({ products: state.products.filter(product => product._id !== pid) }));
        return { success: true, message: data.message }
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct)
        }
        )
        const data = await res.json();
        // console.log("Updated Product: ",data);
        if (!data.success) return { success: false, message: data.message };
        set(state => ({ products: state.products.map(product => product._id === pid ? data.updatedProduct:product) }));
        return { success: true, message: data.message }
    }
}))

export default useProductStore;