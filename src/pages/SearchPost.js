import {useContext, useState} from "react";
import {MyContext} from "../MyContext";
import axios from "axios";

export default function SearchPost() {
    const {listPost, setListPost} = useContext(MyContext);
    const [nameSearch, setNameSearch] = useState('');

    const getList = () => {
        axios.get("http://localhost:3000/posts").then(res => {
            let data = res.data;
            setListPost(data);
        })
    }

    let findNameContain = (event) => {
        setNameSearch(event.target.value);
        let input = event.target.value;
        if (input === "") {
            getList();
        } else {
            let newList = listPost.filter((item) => {
                let namePost = item.username;
                return namePost.toLowerCase().includes(input.toLowerCase());
            });
            setListPost(newList);
        }
    }

    return (
        <div>
            <input value={nameSearch} onChange={(event) => {
                findNameContain(event);
            }} className="form-control mr-sm-2 search" type="search" placeholder="Name Search"
                   aria-label="Search"/>
        </div>
    )
}