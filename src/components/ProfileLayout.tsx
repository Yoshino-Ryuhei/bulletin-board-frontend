import React, {useState, useContext, useEffect } from 'react';
import { UserContext } from '../providers/UserProvider.tsx';
import { getUser } from '../api/User.tsx';
import Header from './Header.tsx';
import { useNavigate } from 'react-router-dom';
import userIconSample from "../images/user_icon_sample.jpg";
import styled from 'styled-components';


export default function ProfileLayout()  {
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);
    const [ userName, setUserName ] = useState("");
    useEffect(() => {
        const myGetUser = async () => {
            const user = await getUser(userInfo.id, userInfo.token);
            setUserName(user.name);
        }
        myGetUser();
    })

    return (
        <>
            <Header></Header>
            <SProfileLayout>
                
                    <SProfileLayoutUserIcon src={userInfo.icon ? userInfo.icon : userIconSample} alt={"ユーザーアイコン"}></SProfileLayoutUserIcon>
                <SProfileLayoutUserInformation>
                    <SProfileLayoutUserName>{userName}</SProfileLayoutUserName>
                    <SProfileLayoutUserEmail>{userInfo.email}</SProfileLayoutUserEmail>

                </SProfileLayoutUserInformation>
                    
            </SProfileLayout>
                <SProfileLayoutButton onClick={() => {navigate("/profile/edit")}}>ユーザー情報編集</SProfileLayoutButton>
                <SProfileLayoutButton onClick={() => {navigate("/profile/upload_icon")}}>アイコン変更</SProfileLayoutButton>
        </>

    )

}

const SProfileLayout  = styled.div`
    width: 100%;
    hight: 100%;
    justify-content: center;
`;

const SProfileLayoutUserIcon = styled.img`
    width: 150px;
    hight: 200px;
    border-radius: 100px;
`;

const SProfileLayoutUserName = styled.span`
    width: 100%;
    hight: 100%;
    display: block;
`;

const SProfileLayoutUserEmail = styled.span`
    width: 100%;
    hight: 100%;
    display: block;
`;

const SProfileLayoutUserInformation = styled.div`
    flex-direction: column;
`;

const SProfileLayoutButton = styled.button`
    background-color: #222222;
    padding: 4px;
    margin-top: 10px;
    margin-left: 5px; 
    border-radius: 8px;
    color: #FAFAFA;
    width: 10%
`;