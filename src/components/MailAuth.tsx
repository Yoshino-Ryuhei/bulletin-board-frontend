import React, {useState, useEffect} from "react"
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { registerUser } from "../api/Mail.tsx";
// import * as crypto from 'crypto';

let name 
let email 
export default function MailAuth() {
    const [inputOtp, setInputOtp] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        name = searchParams.get('name');
        email = searchParams.get('email')
    })

    const onClickRegist = async() => {
        const res = await registerUser(name, email, inputOtp)
        if(res){
            navigate(`/signup/registration?name=${name}&email=${email}`)
        }
    } 
    return (
        <>
            <h1>メール認証</h1>
            <div>{email}に送信された6桁の認証コードを入力してください</div>
            <form>
                <input type="text" maxlength="6" inputmode="numeric" placeholder="認証コードを入力" value={inputOtp} onChange={(evt)=>setInputOtp(evt.target.value)}/>
            </form>
                <button onClick={() => onClickRegist()}>認証</button>
        </>
    )
}