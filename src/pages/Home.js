import Header from "../components/Header";
import {Outlet} from "react-router-dom";
import "./Home.css"
import TypePost from "./TypePost";

export default function Home() {
    return (
        <>
            <div className='container-fluid'>
                <Header/>
                <div className="row main">
                    <div className='col-2 TypePost position-fixed'><TypePost/></div>
                    <div className="col-5  main-item container">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    )
}