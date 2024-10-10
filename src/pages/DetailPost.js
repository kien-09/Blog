import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {formatDate} from "../utils/formatDatevn";
import {AiFillLike, AiOutlineLike} from "react-icons/ai";
import {IoArrowBack} from "react-icons/io5";
import {FaEarthAsia} from "react-icons/fa6";
import {FaLock} from "react-icons/fa";


export default function DetailPost() {
    const [datas, setDatas] = useState([]);
    const [listLikes, setListLikes] = useState([]);
    const [listPost, setListPost] = useState([]);
    const usernameLogin = JSON.parse(localStorage.getItem('user'));
    const [listLikePost, setListLikePost] = useState([]);
    const [isLike, setIsLike] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3000/posts/" + id).then(res => {
            setDatas(res.data);
        })
    }, [])
    const getList = () => {
        axios.get("http://localhost:3000/posts/").then(res => {
            setListPost(res.data);
        })
    }
    const getLikes = () => {
        axios.get("http://localhost:3000/likes").then(res => {
            setListLikes(res.data);
        })
    }
    useEffect(() => {
        getList();
    }, []);

    useEffect(() => {
        getLikes();
    }, [isLike]);

    useEffect(() => {
        const fetchLikes = async () => {
            if (listPost && listPost.length > 0) {
                const arrLikePosts = [];
                for (const item of listPost) {
                    try {
                        const res = await axios.get(`http://localhost:3000/posts/${item.id}/likes`);
                        const userLikes = res.data.map(element => element.username);
                        arrLikePosts.push({
                            idPost: item.id, userLikes: userLikes, totalLike: res.data.length
                        });
                    } catch (error) {
                        console.error(`Error fetching likes for post ${item.id}:`, error);
                    }
                }
                setListLikePost(arrLikePosts);
            }
        };
        fetchLikes();
    }, [listPost, isLike]);


    const handleLike = (idPost) => {
        if (usernameLogin) {
            axios.post(`http://localhost:3000/posts/${idPost}/like`, {username: usernameLogin}).then(res => {
                setIsLike(!isLike);
            })
        } else alert("Bạn cần đăng nhập để like!");
    }

    const handleUnLike = (idPost) => {
        if (usernameLogin) {
            axios.post(`http://localhost:3000/posts/${idPost}/unlike`, {username: usernameLogin}).then(res => {
                setIsLike(!isLike);
            })
        } else alert("Bạn cần đăng nhập để like!");
    }

    const findLikeByUserAndPost = (username, idPost) => {
        return listLikes && listLikes.length === 0 ? undefined : listLikes.find(item => item.idPost === idPost && item.username === username);
    }
    const findTotalLikePage = (idPost) => {
        const data = listLikePost.find(element => element.idPost === idPost);
        return data ? data.totalLike : 0;
    }
    const getUserLikes = (idPost, data) => {
        const arr = [];
        data.map(item => {
            if (idPost === item.idPost) {
                arr.push(item.userLikes);
            }
        })
        return arr[0];
    }
    const remove = (id) => {
        let isConfirm = window.confirm("Bạn muốn xóa bài Post này ?");
        if (isConfirm) {
            axios.delete(`http://localhost:3000/posts/${id}`).then(res => {
                getList();
                navigate('/');
            })
        }
    }

    return (
        <div className="List-detail">
            {((datas.username === usernameLogin && datas.status === 'Private') || datas.status === 'Public') &&
                <div className="content-detail">
                    <button style={{border: "none", backgroundColor: "white"}} onClick={() => {
                        navigate("/")
                    }}><IoArrowBack className="back"/></button>
                    <br/><br/>
                    <h5 className="xxx">
                        <Link style={{color: "black"}} to={"/profile-user/" + datas.username}><img
                            className='avatar-item mr-3' src={datas.imageUser} alt=""/></Link>
                        <Link style={{color: "black"}} to={"/profile-user/" + datas.username}
                              className="nameuser">{datas.username}</Link>
                        <p className="date"> {formatDate(new Date(datas.createAt))}</p>
                        <>
                            <div className="ccc">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" id="navbarDropdown"
                                           role="button" data-toggle="dropdown" aria-haspopup="true"
                                           aria-expanded="false">
                                            <img className="option ml-5"
                                                 src="https://icons.iconarchive.com/icons/aniket-suvarna/box-regular/48/bx-dots-horizontal-rounded-icon.png"
                                                 alt=""/>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            {datas.username === usernameLogin
                                                ?
                                                <>
                                                    <button type="button"
                                                            className="btn btn-danger me-2 dropdown-item ddd text-center"
                                                            onClick={() => {
                                                                remove(datas.id)
                                                            }}>Delete
                                                    </button>
                                                    <Link to={"/update-post/" + datas.id}
                                                          className="btn btn-primary dropdown-item ddd text-center">Update</Link>
                                                </>
                                                :
                                                ''
                                            }
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </>
                    </h5>
                    <h1>{datas.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: datas.content}}></div>
                    <p>
                        <img className="totallike"
                             src="https://icons.iconarchive.com/icons/aniket-suvarna/box/256/bxs-like-icon.png"
                             alt=""/> {findTotalLikePage(datas.id)} {getUserLikes(datas.id, listLikePost)?.map(e => (
                        <p className="userlike">{e}</p>))}
                    </p>
                    {findLikeByUserAndPost(usernameLogin, datas.id)
                        ?
                        <button className='btn likes' onClick={() => handleUnLike(datas.id)}>
                            <AiFillLike style={{color: "blue", width: "40px", height: "40px"}}/>
                        </button>
                        :
                        <button className='btn likes' onClick={() => handleLike(datas.id)}>
                            <AiOutlineLike className='unlike' style={{width: "40px", height: "40px"}}/>
                        </button>
                    }
                    <br/>
                </div>
            }
            <div className="detail-type">
                <h5 className="mt-4">Type: {datas.type}</h5>
                {datas.status === "Public"
                    ?
                    <p><FaEarthAsia style={{marginRight: "10px"}}/>{datas.status}</p>
                    :
                    <p><FaLock style={{marginRight: "10px"}}/>{datas.status}</p>
                }
            </div>
        </div>
    )
}