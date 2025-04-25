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
        
      <div>
        <SUploadInput type="file" accept="image/*" onChange={handleFileChange} />
        {preview && <SUploadUserIcon src={preview} alt="preview" width={100} />}
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
    width: 20%
`;

const SUploadUserIcon = styled.img`
    width: 150px;
    hight: 200px;
    border-radius: 100px;
`;

const SUploadInput = styled.input`
  padding: 4px;
  margin-top: 10px;
  margin-left: 5px; 

  &::file-selector-button{
    background-color: #222222;
    padding: 4px;
    margin-top: 10px;
    margin-left: 5px; 
    border-radius: 8px;
    color: #FAFAFA;
  }
`;