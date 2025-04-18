import React, {useState, useEffect, useContext} from "react";
import Header from "./Header.tsx";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider.tsx";
import { updateUser } from "../api/User.tsx";
import styled from "styled-components";

export default function ProfileEditLayout() {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [ userName, setUserName ] = useState("");
    const [ userPass, setUserPass] = useState("");
    const [ userPass2, setUserPass2] = useState("");
    const [ userEmail, setUserEmail ] = useState("");

    const onClickUpdateUser = async() => {
        if (userName === "" || userEmail === "" || userPass === ""){
            alert("入力をしてください")
            return
        }
        if (userPass !== userPass2){
            alert("入力された２つのパスワードが違います")
            return
        }
        const res = await updateUser(userName, userEmail, userPass, userInfo.id, userInfo.token)
        if(!res){
            return
        }
        setUserInfo({id: userInfo.id, token: userInfo.token, email: userEmail})
    }

    return (
            <>
                <Header></Header>
                <SProfileEditForm>
                    <SProfileEditLabel>UserName</SProfileEditLabel>
                    <SProfileEditInput id="editName" value={userName} type="text" placeholder=" " onChange={(evt) => setUserName(evt.target.value)} />
                </SProfileEditForm>
                <SProfileEditForm>
                    <SProfileEditLabel>PassWord</SProfileEditLabel>
                    <SProfileEditInput id="passWord" value={userPass} type="password" onChange={(evt) => setUserPass(evt.target.value)} />
                </SProfileEditForm>
                <SProfileEditForm>
                    <SProfileEditLabel>InputAgain</SProfileEditLabel>
                    <SProfileEditInput id="passWord" value={userPass2} type="password" onChange={(evt) => setUserPass2(evt.target.value)} />
                </SProfileEditForm>
                <SProfileEditForm>
                    <SProfileEditLabel>Email</SProfileEditLabel>
                    <SProfileEditInput id="email" value={userEmail} type="text" placeholder=" " onChange={(evt) => setUserEmail(evt.target.value)} />
                </SProfileEditForm>
                <SProfileEditButton onClick={async() => {await onClickUpdateUser();}}>ユーザー情報を更新する</SProfileEditButton>
            </>
    
        )
}

const SProfileEditButton = styled.button`
    background-color: #222222;
    padding: 4px;
    margin-top: 10px;
    margin-left: 5px; 
    border-radius: 8px;
    color: #FAFAFA;
    width: 20%
`;

const SProfileEditInput = styled.input`
    width: 20%;
    height: 36%;
    border-width: 0 0 2px 0;
    border-color: #000;
    font-size: 18px;
    line-height: 26px;
    font-weight: 400;
`;

const SProfileEditLabel = styled.label`
    display: block;
    width: calc(100%-20%);
    left: 20px;
    bottom: 11px;
    font-family: Lusitana, serif;
    font-size: 18px;
    line-height: 26px;
    font-weight: 400;
    color: #000;
    cursor: text;
    transition: transform .2s ease-in-out;
`;

const SProfileEditForm = styled.div`
    position: relative;
    margin: 32px 0;
`;