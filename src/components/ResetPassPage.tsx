import React, {useState, useEffect} from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { resetPassUser } from "../api/User.tsx";
import styled from "styled-components";
import axios from "axios";

let name
let email
export default function ResetPassPage() {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
            name = searchParams.get('name');
            email = searchParams.get('email');
        })

    const onClickSendPassword = async() => {
        if (password === "" || password2 === ""){
            alert("入力を行ってください")
            return
        }
        let confirm = window.confirm("本当にパスワードをリセットしますか？");
        if (!confirm){
            return
        }
        if (password === password2){
            let res
            try {
                res = await resetPassUser(name, email, password, process.env.REACT_APP_RESET_PASS_TOKEN)
                alert("登録できました！")
            }
            catch(err) {
                if (axios.isAxiosError(err) && err.response?.status === 401){
                    alert("パスワードリセットの有効期限が切れています。")
                }
                else if(axios.isAxiosError(err) && err.response?.status === 404){
                    alert("あなたは誰ですか？")
                }
                else {
                    alert(err)
                }
                return
            }
        }else{
            alert("二つのパスワードは違います。もう一度パスワードを確認してください")
        }
    }

    return (
        <>
            
            <SRegistrationForm>
                <SRegistrationLabel htmlFor="">Reset Your Password</SRegistrationLabel>
                <SRegistrationInput id="password" value={password} type="password" onChange={(evt)=>setPassword(evt.target.value)} />
            </SRegistrationForm>
            <SRegistrationForm>
                <SRegistrationLabel htmlFor="">Input Again</SRegistrationLabel>
                <SRegistrationInput id="password" value={password2} type="password" onChange={(evt)=>setPassword2(evt.target.value)} />
            </SRegistrationForm>
            <SRegistrationForm>
                <SRegistrationButton type="button" onClick={() => onClickSendPassword()}>Reset Password</SRegistrationButton>
            </SRegistrationForm>
            <SRegistrationForm>
                <SRegistrationButton type="button" onClick={() => navigate("/")}>Login</SRegistrationButton>
            </SRegistrationForm>
        </>
    )
}

const SRegistrationInput = styled.input`
    width: 20%;
    min-width: 8em;
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
    min-width: 8em;
`;