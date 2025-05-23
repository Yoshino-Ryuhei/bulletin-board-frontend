import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import { sendResetPasstMail } from "../api/Mail.tsx"
import styled from "styled-components"
import axios from "axios"

export default function ResetPassForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();

    const onResetPassClick = async () => {
        let res
        try {
            res = await sendResetPasstMail(name, email)
        }
        catch(err) {
            if (axios.isAxiosError(err) && err.response?.status === 404){
                alert("ユーザーネームとパスワードをもう一度確かめてください。")
            }
            else {
                alert(err)
            }
            return
        }
        alert("メールが送信されました!")
    }

    return (
        <SResetPassFrame>
            <SResetPassTitle>Reset Password</SResetPassTitle>
            <SResetPassSubTitle>ユーザーネームと</SResetPassSubTitle>
            <SResetPassSubTitle>メールアドレスを</SResetPassSubTitle>
            <SResetPassSubTitle>入力してください</SResetPassSubTitle>
            <SResetPassForm>
                <SResetPassLabel htmlFor="name">Name</SResetPassLabel>
                <SResetPassInput id="name" value={name} type="text" onChange={(evt)=>setName(evt.target.value)} />
            </SResetPassForm>
            <SResetPassForm>
                <SResetPassLabel htmlFor="email">Email</SResetPassLabel>
                <SResetPassInput id="email" value={email} type="text" onChange={(evt)=>setEmail(evt.target.value)} />
            </SResetPassForm>
            <SResetPassForm>
                <SResetPassButton type="button" onClick={() => {onResetPassClick();}}>Send Reset Mail</SResetPassButton>
            </SResetPassForm>
            <SResetPassForm>
                <SResetPassButton type="button" onClick={() => navigate("/")}>Login</SResetPassButton>
            </SResetPassForm>
        </SResetPassFrame>
    )
}

const SResetPassFrame = styled.div`
background-color: #f8f8f8;
margin: 80px;
padding-top: 8px;
padding-bottom: 8px;
border-radius: 8px;
box-shadow: 0 8px 8px #aaaaaa;
`;

const SResetPassInput = styled.input`
    width: 20%;
    min-width: 10em;
    height: 36%;
    border-width: 0 0 2px 0;
    border-color: #000;
    font-size: 18px;
    line-height: 26px;
    font-weight: 400;
    background-color: #f8f8f8;
`;

const SResetPassLabel = styled.label`
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
    margin-bottom: 5px;
`;

const SResetPassForm = styled.div`
    position: relative;
    margin: 32px 0;
`;

const SResetPassButton = styled.button`
    background-color: #222222;
    padding: 4px;
    margin-top: 10px;
    margin-left: 5px; 
    border-radius: 8px;
    color: #FAFAFA;
    width: 20%;
    min-width: 12em;
`;

const SResetPassTitle = styled.h1`
    font-family: Lusitana, serif;
    font-size: 25px;
    line-height: 26px;
    font-weight: 400;
`;

const SResetPassSubTitle = styled.h3`
    font-family: Lusitana, serif;
    font-size: 15px;
    line-height: 26px;
    font-weight: 400;
    margin: 5px;
`;