import {createContext, useState} from "react";

export const MyContext = createContext();
const MyContextProvider = ({children})=>{
    const [nameLogin,setNameLogin]=useState({
        username:"",
        password:"",
        image:""
    });
    const [image,setImage]=useState({
        image:""
    });

    const [listPost,setListPost]=useState([]);
    const [typePosts, setTypePosts] = useState([]);

    return(
        <MyContext.Provider value={{
            image,
            setImage,
            nameLogin,
            setNameLogin,
            listPost,
            setListPost,
            typePosts,
            setTypePosts
        }}>
            {children}
        </MyContext.Provider>
    )
}
export default MyContextProvider