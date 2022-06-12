import { createContext, useContext, useState } from "react";



export const userContext = createContext()



export const  UserContextProvider = ({children}) => {
    const [user, setUser] = useState("");
    const [userId, setUserId] = useState("");

    const userLogin = (data) => {
        console.log("data", data)
        setUser(data.user)
        setUserId(data.userId)
    }
   
    return <userContext.Provider value={{user, userId, userLogin}} > {children}</userContext.Provider>
}


// export const useUserContext = () => {
//     const {user, userId, logIn, logOut} = useContext(userContext);

//     return {user, userId, logIn, logOut};
// }