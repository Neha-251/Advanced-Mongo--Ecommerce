import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/useContext";
import "./singleProduct.css";


export const SingleProduct = () => {
    const { prod_id } = useContext(userContext);
    const [data, setData] = useState({})

    const navigate = useNavigate();

    const getData = () => {
        axios.get(`https://full-stack-food-app-advanced.herokuapp.com/products/${prod_id}`)
            .then(res => setData(res.data.productdata)).catch(err => console.log(err))
    }

    useEffect(() => {
        getData();
        getRating()

    }, [])

    const [rating, setRating] = useState([]);
    const [rateCount, setRateCount] = useState([]);
    const [userDetail, setUserDetail] = useState({});
    const { userId } = useContext(userContext);


    const getRating = async () => {
        try {
            let resR = await fetch("https://full-stack-food-app-advanced.herokuapp.com/ratings");
            let resR_data = await resR.json();
            //console.log('resR_data', resR_data)

            setRating(resR_data.rating);
            setRateCount(resR_data.count);

            let resp = await fetch(`https://full-stack-food-app-advanced.herokuapp.com/users/${userId}`)
            let resp_data = await resp.json();
            setUserDetail(resp_data.data);
        }
        catch (err) {
            console.log('err', err)

        }
    }

    // const [sProd, setsProd] = useState([]);
    // const [quant, setQuant] = useState(1);


    // const handleAddCart = () => {
    //     let priceSum = quant * data.price;
    //     // console.log('priceSum', priceSum)
    //     setsProd([ ...sProd, {
    //         name: data.name,
    //         image: data.image,
    //         description: data.description,
    //         price: priceSum,
    //         qty: quant
    //     }])

    //    // console.log('sProd', sProd)
        
    // }

    // const [address, setAddress] = useState({
    //     line: "25/367 roseland road",
    //     area: "Gurugram greater area",
    //     city: "Gurugram",
    //     state: "Haryana",
    //     address_type: "Home"
    // })

    return (
        <div className="mainDiv_sin">
            <img className="sin_img" src={data.image} alt={data.name} />

            <div className="desDiv">
                <h1>{data.name}</h1>
                <h4>{data.price} Rs</h4>
                <h5>{data.description==="Veg"? "🍃" : "🍗"} {data.description}</h5>

                <div className="sratingDiv1"> <p className="sratingP1">Average Rating </p> {
                    rating.map((e) => {

                        return <p className="sratingP1" key={e._id}>{e.product_id === data._id && e.ratingAvg.toFixed(1)}</p>

                    })

                } <p className="sratingP1">out of 5</p>
                </div>

                <div className="sratingDiv2"> <p className="ratingP1">Total </p>
                    {
                        rateCount.map((re) => {

                            return <p className="sratingP1" key={re._id}>{re.product_id === data._id && re.count}</p>

                        })
                    } <p className="sratingP1">Ratings </p>
                </div>

                {/* <button className="addBtn" onClick={() => handleAddCart()}>Add to Cart</button> */}

            </div>

        </div>
    )
}