import React, { useCallback, useMemo, useState } from "react";
import NavbarLayout from "../layouts/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "../layouts/Footer";
import DashBoard from "./DashBoard";
import Form from "./Form";
import NotFound from "./NotFound";
import useLocalStorage from "../hooks/useLocalStorage";
import { type products } from "../types/productsType";
import { toast } from "react-toastify";

export interface searchColoumType {
    name: string,
    type: string,
    catergory: string,
    stock: string
}

const Home: React.FC = () => {
    const [products, setProducts] = useLocalStorage<products[]>("products", []);

    const [editProduct, setEditProduct] = useState<products | null>(null);

    const [searchColoum, setSearchColoum] = useState<searchColoumType>({
        name: "",
        type: "",
        catergory: "",
        stock: ""
    });

    const [sortedValue, setSortedValue] = useState<keyof products| "">("");

    //add products 
    const addProducts = useCallback((item: products) => {
        setProducts((prev) => [...prev, {
            ...item,
            id: prev.length === 0 ? 1 : (prev[prev.length - 1].id ?? 0) + 1
        }])
    }, [setProducts])

    //delete products
    const deleteProucts = useCallback((id: number) => {
        setProducts((prev) => prev.filter(item => item.id !== id));
        toast.error("Product Deleted Succesfully");
    }, [setProducts]);

    //edit products
    const editProducts = useCallback((item: products) => {
        setEditProduct(item);
    }, [setEditProduct])

    //update produts
    const updateProducts = useCallback((item: products) => {
        setProducts((prev) =>
            prev.map((t) => t.id === item.id ? { ...t, ...item } : t)
        );
        setEditProduct(null);
    }, [setProducts, setEditProduct]);

    //filter
    const searchStudents = useMemo(() => {
        return products.filter(product => {
            return (
                (!searchColoum.name || product.name.toLocaleLowerCase().includes(searchColoum.name.toLocaleLowerCase())) &&
                (!searchColoum.type || product.type.toLocaleLowerCase().includes(searchColoum.type.toLocaleLowerCase())) &&
                (!searchColoum.catergory || product.categories.some(cat => cat.toLocaleLowerCase().includes(searchColoum.catergory.toLocaleLowerCase()))) &&
                (!searchColoum.stock || product.stock.toString().includes(searchColoum.stock))
            )
        })
    }, [products, searchColoum]);

    //clear the filter
    const clearFilter = useCallback(() => {
        setSearchColoum({
            name: "",
            type: "",
            catergory: "",
            stock: ""
        })
    }, [setSearchColoum]);

    const finalSorted = useMemo(()=>{
        let result: products[] = searchStudents;

        if(sortedValue){
            result = [...result].sort((a,b)=>{
                const valA = a[sortedValue];
                const valB = b[sortedValue];
                
                if(typeof valA === "string" && typeof valB === "string"){
                    return valA.localeCompare(valB) * -1;
                }
                if(typeof valA === "number" && typeof valB === "number"){
                    return (valA - valB) * -1;
                }

                return 0;
            });
        }
        return result;


    },[searchStudents,sortedValue])

    return (
        <div className=" d-flex flex-column min-vh-100">
            <NavbarLayout />
            <Routes>
                <Route path="/" element={<DashBoard
                    products={finalSorted}
                    deleteProucts={deleteProucts}
                    editProducts={editProducts}
                    setSearchColoum={setSearchColoum}
                    searchColoum={searchColoum}
                    clearFilter={clearFilter}
                    sortedValue={sortedValue}
                    setSortedValue={setSortedValue}
                />} />
                <Route path="/from" element={<Form addProducts={addProducts} editProduct={editProduct} updateProducts={updateProducts} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>

    )
}

export default Home;