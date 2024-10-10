import {Field, Form, Formik} from "formik";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export default function ForgotPassword() {
    const navigate = useNavigate();
    return (
        <div className='forgotpassword shadow-sm p-3 mb-5bg-body rounded'>
            <br/><br/>
            <h1>Forgot Password</h1>
            <br/>
            <Formik initialValues={
                {
                    username: ""
                }
            } onSubmit={values => {
                axios.post("http://localhost:3000/forgot-password", values).then((res) => {
                    alert("Mật khẩu mới của bạn là: " + res?.data?.newPassword);
                    navigate('/login')
                }).catch(e => {
                    alert("Sai username !")
                })
            }}>
                <Form className="d-flex justify-content-center align-items-center flex-column p-4">
                    <br/>
                    <div className="w-100 mb-3">
                        <Field className="form-control" placeholder="Nhập username" name={"username"}/>
                    </div>
                    <br/><br/>
                    <button className="btn btn-success">Submit</button>
                    <br/><br/>
                    <Link to={"/register"}>Register</Link>
                    <br/>
                    <Link to={"/login"}>Login</Link>
                </Form>
            </Formik>
        </div>
    )
}