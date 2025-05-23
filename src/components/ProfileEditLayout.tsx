import React, {useState, useEffect, useContext} from "react";
import Header from "./Header.tsx";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider.tsx";
import { updateUser } from "../api/User.tsx";
import styled from "styled-components";
import { sendUpdateMail } from "../api/Mail.tsx";
import { sign_in } from "../api/Auth.tsx";
import axios from "axios";

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

        let confirm = window.confirm("本当に更新しますか？")
        if (!confirm){
            return
        }

        try {
            await sendUpdateMail(userName,userEmail)
        } catch (e) {
            alert("有効なメールアドレスを入力してください")
            return
        }
        await updateUser(userName, userEmail, userPass, userInfo.id, userInfo.token)
        let ret
        try {
            ret = await sign_in(userName, userPass);
        }
        catch(err) {
            if (axios.isAxiosError(err) && err.response?.status === 401){
                alert("ユーザーネーム・パスワード・メールアドレスのいずれかが違います。")
            }
            else{
                alert(err)
            }
            return
        }
        alert("更新できました!")
        setUserInfo({id: ret.user_id, token: ret.token, email: userEmail, icon: userInfo.icon})
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
                    <SProfileEditInput id="editPassWord" value={userPass} type="password" onChange={(evt) => setUserPass(evt.target.value)} />
                </SProfileEditForm>
                <SProfileEditForm>
                    <SProfileEditLabel>InputAgain</SProfileEditLabel>
                    <SProfileEditInput id="editPassWord2" value={userPass2} type="password" onChange={(evt) => setUserPass2(evt.target.value)} />
                </SProfileEditForm>
                <SProfileEditForm>
                    <SProfileEditLabel>Email</SProfileEditLabel>
                    <SProfileEditInput id="editEmail" value={userEmail} type="text" placeholder=" " onChange={(evt) => setUserEmail(evt.target.value)} />
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
    width: 20%;
    min-width: 12em;
`;

const SProfileEditInput = styled.input`
    width: 20%;
    min-width: 10em;
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