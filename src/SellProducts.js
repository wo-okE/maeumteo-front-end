import { useState } from "react";

function SellProducts(){
    const [uploadImgUrl, setUploadImgUrl] = useState("");

  const onchangeImageUpload = (e)=> {
     const {files} = e.target;
     const uploadFile = files[0];
     const reader = new FileReader();
     reader.readAsDataURL(uploadFile);
     reader.onloadend = ()=> {
     setUploadImgUrl(reader.result);
  }
}
    return (
    <>
        <img src = {uploadImgUrl} img = "img"/>
        <input type = "file" accept = "image/*" onChange = {onchangeImageUpload}/>
    </>
    );
}

export default SellProducts;