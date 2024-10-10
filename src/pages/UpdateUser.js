import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import FirebaseImageUpload from "../FirebaseImageUpload/FirebaseImageUpload";
import {IoArrowBack} from "react-icons/io5";

export default function UpdateUser() {
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const params = useParams();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(null);
    const [image, setImage] = useState('');
    const usernameLogin = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
    const [type, setType] = useState('password');

    useEffect(() => {
        if (params) {
            axios.get(`http://localhost:3000/users/${params?.username}`).then(res => {
                if (res && res.status === 200 && res.data) {
                    setPassword(res.data.password);
                    setDob(res.data.dob);
                    setImage(res.data.image);
                }
            })
        }
    }, [])

    const changePassword = (event) => {
        let dataInput = event.target.value;
        setPassword(dataInput);
    }
    const changeDob = (event) => {
        setDob(event);
    }
    const handleChangeType = () => {
        setType(type === 'password' ? 'text' : 'password');
    }
    const submit = () => {
        const data = {
            password: password,
            dob: startDate ? startDate.toLocaleDateString('en-CA') : '',
            image: localStorage.getItem('avt') ? JSON.parse(localStorage.getItem('avt')) : ''
        }
        axios.put(`http://localhost:3000/users/${usernameLogin}`, data).then(() => {
            alert("Update thành công!");
            navigate("/");
        })
    }
    return (
        <div className='UpdateUser'>
            <br/>
            <button style={{border: "none", backgroundColor: "white"}} onClick={() => {
                navigate("/")
            }}><IoArrowBack className="back"/></button>
            <h2 className="text-center">Update User</h2>
            <br/><br/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Password:</label>
                            <br/>
                            <div className="w-100 position-relative mb-3">
                                <input className="form-control" placeholder="Password" type={type}
                                       name={"password"} value={password} style={{width: "207px",marginLeft:"267px"}}/>
                                <span
                                    onClick={handleChangeType}
                                    className="fas fa-eye position-absolute"
                                    style={{
                                        cursor: 'pointer',
                                        top: '34%',
                                        right: '280px'
                                    }}
                                ></span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="text">Ngày sinh:</label>
                            <br/>
                            <DatePicker placeholderText={'Nhập ngày sinh'}
                                        dateFormat="dd/MM/yyyy"
                                        value={dob} className="form-control"
                                        selected={startDate}
                                        onChange={(date) => {
                                            setStartDate(date);
                                            changeDob(date)
                                        }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="text">Avatar:</label>
                            <FirebaseImageUpload image={image}/>
                        </div>
                        <div className="form-group text-center">
                            <br/>
                            <button className="btn btn-primary me-2 mr-2 mt-3" onClick={() => {
                                submit()
                            }}>Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}