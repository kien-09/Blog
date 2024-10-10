import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {MyContext} from "../MyContext";
import axios from "axios";

export default function TypePost() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const {typePosts, setTypePosts} = useContext(MyContext);
    const getPostTypes = () => {
        axios.get("http://localhost:3000/posts/types").then(res => {
            let data = res.data;
            setTypePosts(data);
        })
    }

    useEffect(() => {
        getPostTypes();
    }, []);

    return (
        <div className="Type">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" style={{color: "black"}} to={'/'}><h5>List Post</h5> <span
                        className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item ">
                    <h5 className="nav-link dropdown-toggle active" id="navbarDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: "black"}}>
                        Type Post
                    </h5>
                    <div className="dropdown-menu ml-5">
                        {
                            typePosts && typePosts.length > 0 && typePosts.map((item, index) => (
                                <Link key={index} className="dropdown-item text-center" to={`/${item}`}>{item}</Link>
                            ))
                        }
                    </div>
                </li>
            </ul>
            {user
                ?
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" style={{color: "black"}} to={'/create-post'}><h5>Create
                            Post</h5> <span
                            className="sr-only">(current)</span></Link>
                    </li>
                </ul>
                :
                ''
            }
        </div>
    )
}