import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../../context/useContext";
import "./cart.css"



export const Cart = () => {
    const { user } = useContext(userContext);
    const { userId } = useContext(userContext);
    const [address, setAddress] = useState({});
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [getreq, setgetreq] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                let res = await fetch(`https://full-stack-food-app-advanced.herokuapp.com/orders/getOne?user_id=${userId}`)
                let res_data = await res.json();
                console.log('res_data', res_data)
                setProducts(res_data.order[0].products);
                setTotalPrice(res_data.sum[0].TotalPrice)

            }
            catch (err) {
                console.log('err', err)
            }
        }
        getData();

    }, [])
    console.log(totalPrice)

    const handleRemove = (el) => {
        setLoading(true);
        // console.log("el", el)
        let foodId = el._id;

        const getData = async () => {
            try {
                let res = await fetch(`https://full-stack-food-app-advanced.herokuapp.com/orders/getOne?user_id=${userId}`)
                let res_data = await res.json();
                console.log('res_data', res_data)
                setProducts(res_data.order[0].products);
                setTotalPrice(res_data.sum[0].TotalPrice)
                setTimeout(()=> {
                    setLoading(false)

                }, 1000)
            }
            catch (err) {
                console.log('err', err)
            }
        }

        axios.patch(`https://full-stack-food-app-advanced.herokuapp.com/orders/edit/products?userId=${userId}&foodId=${foodId}`)
        .then(res => console.log("delete", res)).then(
            setTimeout(() => {
                getData()
                if(products.length === 0) {
                    axios.delete(``)
                }
            }, 1000)
        );

    }

    return (
        <div className="cartMain">
            <div className={loading === true ? "loadingDiv" : "none"}>Loading...</div>
            <div className="cart1">
                {
                    products.map((el) => {
                        return (
                            <div className="prodDiv" key={el._id}>
                                <img src={el.image} className="prodimg" alt={el.name} />
                                <div className="textDiv">
                                    <p>{el.name}</p>
                                    <p>{el.price} Rs</p>
                                    <p>{el.description}</p>
                                    <p>Quantity: {el.qty}</p>

                                    <button onClick={() => handleRemove(el)}>Remove</button>
                                </div>
                            </div>
                        )
                    })

                }
            </div>

            <div className="sideDivCart">
                <p>Total Items: {products.length}</p>
                <p>Total: {totalPrice} Rs</p>
            </div>


        </div>
    )
}