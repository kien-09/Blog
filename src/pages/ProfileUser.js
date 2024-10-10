import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {formatDate} from "../utils/formatDatevn";
import {MyContext} from "../MyContext";
import {AiFillLike, AiOutlineLike} from "react-icons/ai";
import {FaEarthAsia} from "react-icons/fa6";
import {FaLock} from "react-icons/fa";


export default function ProfileUser() {
    const {listPost, setListPost} = useContext(MyContext);
    const [listLikes, setListLikes] = useState([]);
    const usernameLogin = JSON.parse(localStorage.getItem('user'));
    const [listLikePost, setListLikePost] = useState([]);
    const [isLike, setIsLike] = useState(false);
    const params = useParams();
    const {typePosts, setTypePosts} = useContext(MyContext);
    const [type, setType] = useState('all');
    const [listPostOld, setListPostOld] = useState([]);
    const [avt, setAvt] = useState('');
    const navigate = useNavigate();

    const getList = () => {
        axios.get("http://localhost:3000/posts").then(res => {
            const data = res.data?.filter(item => item.username === params.username);
            setListPost(data);
            setListPostOld(data);
        })
    }

    const getLikes = () => {
        axios.get("http://localhost:3000/likes").then(res => {
            setListLikes(res.data);
        })
    }

    useEffect(() => {
        getList();
        if (params.username && localStorage.getItem('user') && params.username === JSON.parse(localStorage.getItem('user'))) {
            setAvt(localStorage.getItem('avt') ? JSON.parse(localStorage.getItem('avt')) : '');
        }
        setType('all');
    }, [params]);

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
    const remove = (id) => {
        let isConfirm = window.confirm("Bạn muốn xóa bài Post này ?");
        if (isConfirm) {
            axios.delete(`http://localhost:3000/posts/${id}`).then(res => {
                getList();
                navigate('/')
            })
        }
    }

    const handleOnchangeType = type => {
        if (type === 'all') {
            getList();
        } else if (type && listPostOld && listPostOld.length > 0){
            const newListPosts = listPostOld.filter(item => item.type === type);
            setListPost(newListPosts);
        }
        setType(type);
    }

    return (
        <div className="container profile">
            <div className="kkk">
                <img className="banner" src="https://web.buyatab.com/wp-content/uploads/2016/11/Blog-Banner-Buyatab.png"
                     alt=""/>
                <div className="kkk-item">
                    <img className="avt-profile mr-3" src={avt || listPost?.at(0)?.imageUser} alt=""/>
                    <h2 className="hhh">{params.username}</h2>
                </div>
                <div className="Type-profile">
                    <p className="nav-link dropdown-toggle profile-type" id="navbarDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: "black"}}>Type
                    </p>
                    <div className="dropdown-menu mt-3">
                        <div className={type === 'all' ? 'active-type' : ''}
                             onClick={() => handleOnchangeType('all')}>Tất
                            cả
                        </div>
                        {
                            typePosts && typePosts.length > 0 && typePosts.map((item, index) => (
                                <div className={item === type ? 'active-type' : ''} key={index}
                                     onClick={() => handleOnchangeType(item)}>{item}</div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {listPost.map((item) => (
                <div className="List">
                    {((item.username === usernameLogin && item.status === 'Private') || item.status === 'Public') &&
                        <>
                            <br/>
                            <h5 className="xxx">
                                <span style={{color: "black"}}>
                                    <img className='avatar-item mr-3' src={item.imageUser} alt=""/>
                                </span>
                                <span style={{color: "black"}} className="nameuser">
                                    {item.username}
                                </span>
                                <p className="date">
                                    {formatDate(new Date(item.createAt))}
                                    {item.status === "Public"
                                        ?
                                        <FaEarthAsia className="ml-2 mb-1" style={{marginRight: "10px"}}/>
                                        :
                                        <FaLock className="ml-2 mb-1" style={{marginRight: "10px"}}/>
                                    }
                                </p>
                                <>
                                    <div className="ccc">
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a className="nav-link" href="#" id="navbarDropdown"
                                                   role="button" data-toggle="dropdown" aria-haspopup="true"
                                                   aria-expanded="false">
                                                    <img className="option"
                                                         src="https://icons.iconarchive.com/icons/aniket-suvarna/box-regular/48/bx-dots-horizontal-rounded-icon.png"
                                                         alt=""/>
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    {item.username === usernameLogin
                                                        ?
                                                        <>
                                                            <button type="button"
                                                                    className="btn btn-danger me-2 dropdown-item ddd text-center"
                                                                    onClick={() => {
                                                                        remove(item.id)
                                                                    }}>Delete
                                                            </button>
                                                            <Link to={"/update-post/" + item.id}
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
                            <div className="content">
                                <Link className="text-decoration-none" style={{color: "black"}}
                                      to={"/detail-post/" + item.id}>
                                    <h3>
                                        {item.title}
                                    </h3>
                                    <div dangerouslySetInnerHTML={{__html: item.content}}></div>
                                </Link>
                            </div>
                            <p><img className="totallike ml-5 mr-1"
                                    src="https://icons.iconarchive.com/icons/aniket-suvarna/box/256/bxs-like-icon.png"
                                    alt=""/> {findTotalLikePage(item.id)} </p>
                            {findLikeByUserAndPost(usernameLogin, item.id)
                                ?
                                <button className='btn likes ml-4' onClick={() => handleUnLike(item.id)}>
                                    <AiFillLike className="like"
                                                style={{color: "blue", width: "40px", height: "40px"}}/>
                                </button>
                                :
                                <button className='btn likes ml-4' onClick={() => handleLike(item.id)}>
                                    <AiOutlineLike className="unlike" style={{width: "40px", height: "40px"}}/>
                                </button>
                            }
                            <hr style={{marginTop: "10px"}}/>
                        </>
                    }
                </div>
            ))}
        </div>
    )
}