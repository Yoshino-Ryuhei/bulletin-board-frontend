import React, {useState, useEffect} from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { createUser } from "../api/User.tsx";
import styled from "styled-components";
import axios from "axios";

let token
export default function Registration() {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
            token = searchParams.get('token');
        })

    const onClickSendPassword = async() => {
        if (password === "" || password2 === ""){
            alert("入力を行ってください")
            return
        }
        if (password === password2){
            let res
            try {
                res = await createUser(token, password)
            }
            catch(err) {
                if (axios.isAxiosError(err) && err.response?.status === 404){
                    alert("あなただれ？")
                }
                else if (axios.isAxiosError(err) && err.response?.status === 409){
                    alert("このメールアドレスはすでに使われています")
                }
                else{
                    alert(err)
                }
                return
            }
            alert("登録できました！")
        }else{
            alert("二つのパスワードは違います。もう一度パスワードを確認してください")
        }
    }

    return (
        <>
            
            <SRegistrationForm>
                <SRegistrationLabel htmlFor="">Password</SRegistrationLabel>
                <SRegistrationInput id="password" value={password} type="password" onChange={(evt)=>setPassword(evt.target.value)} />
            </SRegistrationForm>
            <SRegistrationForm>
                <SRegistrationLabel htmlFor="">Input Again</SRegistrationLabel>
                <SRegistrationInput id="password" value={password2} type="password" onChange={(evt)=>setPassword2(evt.target.value)} />
            </SRegistrationForm>
            <SRegistrationForm>
                <SRegistrationButton type="button" onClick={() => onClickSendPassword()}>Register</SRegistrationButton>
            </SRegistrationForm>
            <SRegistrationForm>
                <SRegistrationButton type="button" onClick={() => navigate("/")}>Login</SRegistrationButton>
            </SRegistrationForm>
        </>
    )
}

const SRegistrationInput = styled.input`
    width: 20%;
    min-width: 12em;
    height: 36%;
    border-width: 0 0 2px 0;
    border-color: #000;
    font-size: 18px;
    line-height: 26px;
    font-weight: 400;
`;

const SRegistrationLabel = styled.label`
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

const SRegistrationForm = styled.div`
    position: relative;
    margin: 32px 0;
`;

const SRegistrationButton = styled.button`
    background-color: #222222;
    padding: 4px;
    margin-top: 10px;
    margin-left: 5px; 
    border-radius: 8px;
    color: #FAFAFA;
    width: 20%;
    min-width: 12em;
`;