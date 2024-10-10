import React, {useState} from "react";
import {imageDb} from "./Config";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {v4} from "uuid";

function FirebaseImageUpload({image=""}) {
    const [img, setImg] = useState(null);
    const [imgUrl, setImgUrl] = useState('');
    console.log(imgUrl)
    const handleClick = () => {
        if (!img) return;
        const imgRef = ref(imageDb, `files/${v4()}`);
        uploadBytes(imgRef, img).then(value => {
            getDownloadURL(value.ref).then(url => {
                localStorage.setItem("avt", JSON.stringify(url));
                setImgUrl(data => [url]);
            }).catch(error => console.error('Error', error));
        }).catch(error => console.error('Error', error));
    }
    return (
        <div className="App">
            <input type='file' onChange={(e) => setImg(e.target.files[0])}/>
            <button type="button" className="btn btn-secondary" onClick={handleClick}>Upload</button>
            <br/>
            <div className='Avatar-Image'>
                {imgUrl ?
                    <img src={imgUrl} style={{width: '150px', height: "150px"}}/>
                    :
                    <img src={image} style={{width: '150px', height: "150px"}}/>
                }
            </div>
        </div>
    )
}

export default FirebaseImageUpload;