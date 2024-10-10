import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import markdownit from "markdown-it";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import TurndownService from 'turndown';
import {IoArrowBack} from "react-icons/io5";

export default function UpdatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const params = useParams();
    const idUpdate = params.id;
    const navigate = useNavigate();
    const usernameLogin = JSON.parse(localStorage.getItem('user'));
    const [textEditer, setTextEditer] = useState('');
    const turndownService = new TurndownService();

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
    useEffect(() => {
        if (idUpdate) {
            axios.get("http://localhost:3000/posts/" + idUpdate).then((res) => {
                let data = res.data;
                setTitle(data.title);
                setTextEditer(turndownService.turndown(data.content));
                setContent(data.content);
                setStatus(data.status);
                setType(data.type);
            })
        }
    }, [])
    const submit = () => {
        let post = {
            title: title, content: content, status: status, type: type, username: usernameLogin
        }
        axios.put(`http://localhost:3000/posts/${idUpdate}`, post).then(() => {
            alert("Update Success!");
            navigate("/");
        })
    }
    const md = markdownit()
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    function handleEditorChange({html, text}) {
        setContent(html);
        setTextEditer(text);
    }
    return (
        <>
            <button style={{border: "none", backgroundColor: "white"}} onClick={() => {
                navigate("/")
            }}><IoArrowBack className="back"/></button>
            <h2 className="Updatepost text-center">Update Post</h2>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group1">
                            <label htmlFor="text">Type:</label>
                            <br/>
                            <input type="text" className="form-control" name="type" placeholder="Type"
                                   value={type}
                                   onChange={(event) => {
                                       changeType(event)
                                   }}/>
                        </div>
                        <br/>
                        <div className="form-group1">
                            <label htmlFor="text">Title:</label>
                            <br/>
                            <input type="text" className="form-control" name="title" placeholder="Title"
                                   value={title}
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
                        <MdEditor
                            value={textEditer}
                            style={{height: '500px'}}
                            renderHTML={text => mdParser.render(text)}
                            onChange={handleEditorChange}
                        />
                        <div className="form-group">
                            <button className="btn btn-primary me-2 mr-2 mt-3" onClick={() => {
                                submit()
                            }}>Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}