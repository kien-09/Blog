import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import FirebaseImageUpload from "../FirebaseImageUpload/FirebaseImageUpload";
import {MyContext} from "../MyContext";

export default function Register() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    let navigate = useNavigate();
    let {image} = useContext(MyContext);
    const [startDate, setStartDate] = useState(null);
    const [type, setType] = useState('password');

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, []);

    const handleChangeType = () => {
        setType(type === 'password' ? 'text' : 'password');
    }
    return (
        <div className='register shadow-sm p-3 mb-5 bg-body rounded'>
            <h1>Register</h1>
            <Formik initialValues={
                {
                    username: "",
                    password: "",
                    dob: ""
                }
            } onSubmit={values => {
                values.dob = startDate ? startDate.toLocaleDateString('en-CA') : ''
                values.image = localStorage.getItem("avt") ? JSON.parse(localStorage.getItem("avt")) : '';
                axios.post("http://localhost:3000/register", values).then(res => {
                    alert("Đăng ký thành công!");
                    navigate("/login")
                }).catch(e => {
                    alert("Tài khoản này đã được đăng ký!")
                })
            }}>
                <Form className="d-flex justify-content-center align-items-center flex-column p-4">
                    <div className="w-100 mb-3">
                        <Field className="form-control" placeholder="Nhập username" name={"username"}/>
                    </div>
                    <div className="w-100 position-relative mb-3">
                        <Field className="form-control" placeholder="Nhập password" type={type} name={"password"}/>
                        <span
                            onClick={handleChangeType}
                            className="fas fa-eye position-absolute"
                            style={{
                                cursor: 'pointer',
                                top: '34%',
                                right: '10px'
                            }}
                        ></span>
                    </div>
                    <div className="w-100 mb-3">
                        <DatePicker placeholderText={'Nhập ngày sinh'}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    selected={startDate} onChange={(date) => setStartDate(date)}
                        />
                    </div>
                    <FirebaseImageUpload/>
                    <br/>
                    <button className="btn btn-success">Register</button>
                    <br/>
                    <Link to={"/login"}>Login</Link>
                </Form>
            </Formik>
        </div>
    )
}