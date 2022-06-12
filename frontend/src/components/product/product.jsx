import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../context/useContext";
import "./product.css";



export const Product = () => {
    const navigate = useNavigate();

    const search = useLocation().search;
    const page = new URLSearchParams(search).get('page') || 1;
    const pagesize = new URLSearchParams(search).get('pagesize') || 6;
    const desc = new URLSearchParams(search).get('desc') || "all";
    const sort = new URLSearchParams(search).get('sort') || 1;


    const [data, setData] = useState([]);
    const [response, setResponse] = useState([])
    const [pages, setPages] = useState([])
    const [totalPage, setTotalPage] = useState(0);
    const [currpage, setCurrPage] = useState(1);

    const { user } = useContext(userContext);
    const { userId } = useContext(userContext);
    const [userDetail, setUserDetail] = useState({});

    //console.log('userProd', user)

    const getData = async () => {

        let res = await fetch(`https://full-stack-food-app-advanced.herokuapp.com/products?page=${page}&pagesize=${pagesize}&desc=${desc}`)
        let respon = await res.json();
        setResponse(respon);
        setData(respon.productdata);
        setTotalPage(respon.total_pages)


        let resp = await fetch(`https://full-stack-food-app-advanced.herokuapp.com/users/${userId}`)

        let resp_data = await resp.json();
        setUserDetail(resp_data.data);
    }

    console.log("data", data);
    // console.log("response", response)
    // console.log('totalPage', totalPage)


    useEffect(() => {
        getData();

        // setTotalPage(Math.round(response.total_pages))
    }, [page, pagesize, desc, sort])

    useEffect(() => {

        let arr = [];
        let limit = Math.round(totalPage);
        //console.log('limit', limit)

        for (let i = 1; i <= limit; i++) {
            arr.push(i);
        }
        setPages(arr);
        // console.log("pages",pages)
    }, [data])


    const [quant, setQuant] = useState(1);
    const [sProd, setsProd] = useState([]);
    const [userPost, setUserPost] = useState({});
    const [postOrder, setPostOrder] = useState({});
    const [address, setAddress] = useState({
        line: "25/367 roseland road",
        area: "Gurugram greater area",
        city: "Gurugram",
        state: "Haryana",
        address_type: "Home"
    })
    useEffect(() => {
        setPostOrder({
            user_id: userId,
            products: sProd,
            user: userPost,
            address: address,
            date: Date.now()
        });

        setUserPost({
            first_name: userDetail.first_name,
            last_name: userDetail.last_name,
            email: userDetail.email,
            password: userDetail.password
        })



    }, [userDetail, quant, sProd])

    const handleAddCart = (el) => {
        let priceSum = quant * el.price;
        // console.log('priceSum', priceSum)
        setsProd([ ...sProd, {
            name: el.name,
            image: el.image,
            description: el.description,
            price: priceSum,
            qty: 1
        }])

       // console.log('sProd', sProd)
        
    }

    const handleSort = (e) => {

        navigate(`/products?page=${page}&pagesize=${pagesize}&desc=${desc}&sort=${e.target.value}`)

       // console.log('sort', typeof (e.target.value))

    }

    const handlePage = (e) => {
        navigate(`/products?page=${e}&pagesize=${pagesize}&desc=${desc}&sort=${sort}`)
    }

    const handleCartBtn = () => {
        axios.post("https://full-stack-food-app-advanced.herokuapp.com/orders/create", postOrder)
        .then(res => console.log(res))

        setTimeout(() => {
            navigate("/cart")
        }, 1000)


    }




    return (
        <div>
            <div className="prod_subDiv">
                <input type="text" className="prodInp" placeholder="Search Dishes..." />
                <select onChange={(e) => navigate(`/products?page=${page}&pagesize=${pagesize}&desc=${e.target.value}`)}>
                    <option value="all">All</option>
                    <option value="Veg">Veg</option>
                    <option value="Non Veg">Non Veg</option>
                </select>
                <select onChange={(e) => handleSort(e)}>
                    <option value="">Sort by Price</option>
                    <option value="1">Low to High</option>
                    <option value="-1">High to Low</option>

                </select>
                <button onClick={handleCartBtn}>🛒 Cart</button>
            </div>

            <div className="prod_container" >

                {
                    data.map((el) => {
                        return (
                            <div key={el._id}>
                                <img src={el.image} className="prod_img" alt={el.name} />
                                <p>{el.name}</p>
                                <p>{el.price} Rs</p>
                                {/* <div className="qtyDiv">
                                    <button onClick={() => quant>1? setQuant(prev => prev - 1) : setQuant(1)}>-</button>
                                    <p>{quant}</p>
                                    <button onClick={() => setQuant(prev => prev + 1)}>+</button>
                                </div> */}
                                <button onClick={() => handleAddCart(el)}>Add to Cart</button>
                            </div>
                        )
                    })
                }

            </div>
            <div className="pageDiv">
                {
                    pages.map((e) => {
                        return (
                            <button key={e} onClick={() => handlePage(e)}>{e}</button>
                        )
                    })
                }
            </div>
        </div>
    )
}