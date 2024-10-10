import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import {useContext, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import markdownit from 'markdown-it'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {MyContext} from "../MyContext";
import {IoArrowBack} from "react-icons/io5";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const navigate = useNavigate();
    const usernameLogin = JSON.parse(localStorage.getItem('user'));
    const nameLogin = useContext(MyContext);
    const changeTitle = (event) => {
        let dataInput = event.target.value;
        setTitle(dataInput);
    }
    const changeStatus = (event) => {
        let dataInput = event.target.value;
        setStatus(dataInput);
    }
    const changeType = (event) => {
        let dataInput = event.target.value;
        setType(dataInput);
    }
    const submit = () => {
        let post = {
            title: title, content: content, status: status, type: type, username: usernameLogin
        }
        axios.post("http://localhost:3000/posts", post).then(() => {
            alert("Post thành công!");
            navigate("/list-post");
        })
    }
    const md = markdownit();
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    function handleEditorChange({html, text}) {
        setContent(html);
    }

    return (
        <>
            <button style={{border: "none", backgroundColor: "white"}} onClick={() => {
                navigate("/")
            }}><IoArrowBack className="back"/></button>
            <h2 className='CreatePost text-center'>Create Post</h2>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group1">
                            <label htmlFor="text">Type:</label>
                            <br/>
                            <input type="text" className="form-control" name="type" placeholder="Nhập type"
                                   onChange={(event) => {
                                       changeType(event)
                                   }}/>
                        </div>
                        <br/>
                        <div className="form-group1">
                            <label htmlFor="text">Title:</label>
                            <br/>
                            <input type="text" className="form-control" name="title" placeholder="Nhập title"
                                   onChange={(event) => {
                                       changeTitle(event)
                                   }}/>
                        </div>
                        <br/>
                        <div className="form-group1">
                            <select value={status} onChange={(event) => {
                                changeStatus(event)
                            }} name="status" className="btn-secondary">
                                <option value="" disabled>Status</option>
                                <option value='Public'>Public</option>
                                <option value='Private'>Private</option>
                            </select>
                        </div>
                        <br/>
                        <label htmlFor="text">Content:</label>
                        <br/>
                        <MdEditor style={{height: '500px'}} renderHTML={text => mdParser.render(text)}
                                  onChange={handleEditorChange}/>
                        <div className="form-group">
                            <button className="btn btn-primary me-2 mr-2 mt-3" onClick={() => {
                                submit()
                            }}>Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

