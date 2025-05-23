import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import { sendRegistMail } from "../api/Mail.tsx"
import styled from "styled-components"

export default function SignUpLayout() {
    const [sendEmail, setSendEmail] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();

    const onSignUpClick = async () => {
        const res = await sendRegistMail(String(name), String(email))
        if(res){
            setSendEmail(true);
        }
    }

    return (
        <SSignUpFrame>
            <SSignUpTitle>Sign Up</SSignUpTitle>
            <SSignUpForm>
                <SSignUpLabel htmlFor="name">Name</SSignUpLabel>
                <SSignUpInput id="name" value={name} type="text" onChange={(evt)=>setName(evt.target.value)} />
            </SSignUpForm>
            <SSignUpForm>
                <SSignUpLabel htmlFor="email">Email</SSignUpLabel>
                <SSignUpInput id="email" value={email} type="text" onChange={(evt)=>setEmail(evt.target.value)} />
            </SSignUpForm>
            <SSignUpForm>
                <SSignUpButton type="button" onClick={() => {onSignUpClick();}}>Sign Up</SSignUpButton>
            </SSignUpForm>
            <SSignUpForm>
                <SSignUpButton type="button" onClick={() => navigate("/")}>Login</SSignUpButton>
            </SSignUpForm>
            {sendEmail ? <div>メールを送信しました</div>:<></>}
        </SSignUpFrame>
    )
}

const SSignUpFrame = styled.div`
background-color: #f8f8f8;
margin: 80px;
padding-top: 8px;
padding-bottom: 8px;
border-radius: 8px;
box-shadow: 0 8px 8px #aaaaaa;
`;

const SSignUpInput = styled.input`
    width: 20%;
    min-width: 12em;
    height: 36%;
    border-width: 0 0 2px 0;
    border-color: #000;
    font-size: 18px;
    line-height: 26px;
    font-weight: 400;
    background-color: #f8f8f8;
`;

const SSignUpLabel = styled.label`
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

const SSignUpForm = styled.div`
    position: relative;
    margin: 32px 0;
`;

const SSignUpButton = styled.button`
    background-color: #222222;
    padding: 4px;
    margin-top: 10px;
    margin-left: 5px; 
    border-radius: 8px;
    color: #FAFAFA;
    width: 20%;
    min-width: 12em;
`;

const SSignUpTitle = styled.h1`
    font-family: Lusitana, serif;
    font-size: 25px;
    line-height: 26px;
    font-weight: 400;
`;