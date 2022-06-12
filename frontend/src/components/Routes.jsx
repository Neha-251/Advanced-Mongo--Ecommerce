import { Route, Routes } from "react-router-dom"
import { Navbar } from "./navbar/navbar"
import { Login } from "./user-register/login"
import { Signup } from "./user-register/signup"
import { Product } from "./product/product"
import { Cart } from "./cart/cart"



export const AllRoutes = () => {

    return (
        <>
        <Navbar/>
        <Routes>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/products" element={<Product/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
        </Routes>
        </>
    )

}