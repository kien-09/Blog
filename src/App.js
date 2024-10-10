import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ListPost from "./pages/ListPost";
import CreatePost from "./pages/CreatePost";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePost from "./pages/UpdatePost";
import DetailPost from "./pages/DetailPost";
import UpdateUser from "./pages/UpdateUser";
import ProfileUser from "./pages/ProfileUser";

function App() {
    return (
        <Routes>
            <Route path={''} element={<Home/>}>
                <Route path={'create-post'} element={<CreatePost/>}/>
                <Route path={'/:type?'} element={<ListPost/>}/>
                <Route path={'update-post/:id'} element={<UpdatePost/>}/>
                <Route path={'detail-post/:id'} element={<DetailPost/>}/>
                <Route path={'update-user/:username'} element={<UpdateUser/>}/>
                <Route path={'profile-user/:username'} element={<ProfileUser/>}/>
            </Route>
            <Route path={'register'} element={<Register/>}/>
            <Route path={'login'} element={<Login/>}/>
            <Route path={'forgot-password'} element={<ForgotPassword/>}/>
        </Routes>
    );
}

export default App;
