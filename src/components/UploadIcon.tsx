import React, { useState, useContext } from 'react';
import { getIconURL, uploadUserIcon } from '../api/UserIcon.tsx';
import Header from './Header.tsx';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider.tsx';
import styled from 'styled-components';

const UploadIcon: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const onClickUplodaFile = () => {
    const fileElem = document.getElementById("fileElem");
    if (fileElem) {
      fileElem.click();
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await uploadUserIcon(userInfo.id, userInfo.token, formData)
    const icon_url = await getIconURL(userInfo.id, userInfo.token)
      alert("アップロードしました！")
      setUploadedUrl(res.data.imageUrl);
      setUserInfo({
        id: userInfo.id,
        token: userInfo.token,
        email: userInfo.email,
        icon: icon_url
    })
  };

  return (
    <>
      <Header></Header>
      {userInfo.icon ? <><label>今までのユーザーアイコン</label><SUploadUserIcon src={userInfo.icon} alt={"ユーザーアイコン"}></SUploadUserIcon></> : <></>}
      <br></br>
      {preview && <><label>変更後のユーザーアイコン</label><SUploadUserIcon src={preview} alt="preview"/></>}
        
      <div>
        <SUploadInput id="fileElem" type="file" accept="image/*" onChange={handleFileChange} /><SUploadButton onClick={()=>onClickUplodaFile()}>画像を選択</SUploadButton>
         <br></br>
        <SUploadButton onClick={handleUpload}>アップロード</SUploadButton>
        {uploadedUrl && <p>アップロード成功</p>}
      </div>
      <SUploadButton type="button" onClick={() => navigate("/profile")}>ユーザー画面へ</SUploadButton>
    </>
  );
};

export default UploadIcon;

const SUploadButton = styled.button`
    background-color: #222222;
    padding: 4px;
    margin-top: 10px;
    margin-left: 5px; 
    border-radius: 8px;
    color: #FAFAFA;
    width: 8em;
`;

const SUploadUserIcon = styled.img`
    border-radius: 100px;
    height: 100px;
    width: 100px;

    @media (max-width: 599px) {
        width: 100px;
    }
`;

const SUploadInput = styled.input`
  padding: 4px;
  margin-top: 10px;
  margin-left: 5px;
  display:none;

  &::file-selector-button{
    background-color: #222222;
    padding: 4px;
    margin-top: 10px;
    margin-left: 5px; 
    border-radius: 8px;
    color: #FAFAFA;
  }
`;