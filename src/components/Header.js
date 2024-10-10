import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {MyContext} from "../MyContext";
import SearchPost from "../pages/SearchPost";

export default function Header() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const avt = localStorage.getItem('avt') ? JSON.parse(localStorage.getItem('avt')) : null;
    const {nameLogin, setNameLogin} = useContext(MyContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        let confirm = window.confirm("Bạn muốn đăng xuất ?");
        if (confirm) {
            localStorage.clear();
            setNameLogin('');
            navigate('/login');
        }
    }

    return (
        <>
            <div className="row position-sticky" style={{top: '0', zIndex: '9999'}}>
                <div className="col-12 menu">
                    <nav className="navbar navbar-expand-lg">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="Logo">
                                <Link to={"/"}>
                                    <img
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                        }}
                                        src="https://logos-world.net/wp-content/uploads/2021/08/Blogger-Logo.png"
                                        alt=""/>
                                </Link>
                            </div>
                            <div>
                                <SearchPost/>
                            </div>
                            <div className="form-inline my-2 my-lg-0 ml-auto ">
                                {user
                                    ?
                                    <>
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a id="navbarDropdown"
                                                   role="button" data-toggle="dropdown" aria-haspopup="true"
                                                   aria-expanded="false">
                                                    <img className="avt" src={avt} alt=""/>
                                                </a>
                                                <div className="dropdown-menu avt-option"
                                                     aria-labelledby="navbarDropdown">
                                                    <Link to={"/update-user/" + user}
                                                          className="btn btn-primary dropdown-item ddd text-center">Update
                                                        User</Link>
                                                    <button onClick={handleLogout}
                                                            className="btn btn-primary dropdown-item ddd text-center"
                                                            type="submit">Logout
                                                    </button>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="ml-1" style={{width: "135px"}}>
                                            <Link style={{color: "black"}} to={"/profile-user/" + user}><h5>{user}</h5>
                                            </Link>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <button onClick={() => navigate("/login")}
                                                className="btn btn-outline-success my-2 my-sm-2 mr-3"
                                                type="submit">Login
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}