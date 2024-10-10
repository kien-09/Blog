import {Field, Form, Formik} from "formik";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {MyContext} from "../MyContext";

export default function Login() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const navigate = useNavigate();
    let {setNameLogin} = useContext(MyContext);
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
        <div className='login shadow-sm p-3 mb-5 bg-body rounded'>
            <br/><br/>
            <h1>Login</h1>
            <br/><br/>
            <Formik initialValues={
                {
                    username: "",
                    password: ""
                }
            } onSubmit={values => {
                axios.post("http://localhost:3000/login", values).then((res) => {
                    alert("Đăng nhập thành công!");
                    navigate('/')
                    setNameLogin(res.data.data)
                    localStorage.setItem("user", JSON.stringify(res.data.data.username));
                    localStorage.setItem("avt", JSON.stringify(res.data.data.image));
                }).catch(e => {
                    alert("Sai username or password!")
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
                    <button className="btn btn-success">Login</button>
                </Form>
            </Formik>
            <Link to={'/forgot-password'}>Forgot Password ?</Link>
            <br/><br/>
            <p>Don't have an account yet? <Link to={"/register"}>Register</Link></p>
        </div>
    )
}