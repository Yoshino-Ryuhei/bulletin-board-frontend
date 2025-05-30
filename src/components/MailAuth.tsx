import React, {useState, useEffect} from "react"
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { registerUser } from "../api/Mail.tsx";
import axios from "axios";
// import * as crypto from 'crypto';

let token
export default function MailAuth() {
    const [inputOtp, setInputOtp] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        token = searchParams.get('token');
    })

    const onClickRegist = async() => {
        let res
        try {
            res = await registerUser(token, inputOtp)
        }
        catch(err) {
            if (axios.isAxiosError(err) && err.response?.status === 404){
                alert("ワンタイムパスワードが違う、または有効期限切れです。")
            }
            else{
                alert(err)
            }
            return
        } 
        if(res){
            navigate(`/signup/registration?token=${token}`)
        }
    } 
    return (
        <>
            <h1>メール認証</h1>
            <div>送信された6桁の認証コードを入力してください</div>
            <form>
                <input type="text" maxlength="6" inputmode="numeric" placeholder="認証コードを入力" value={inputOtp} onChange={(evt)=>setInputOtp(evt.target.value)}/>
            </form>
                <button onClick={() => onClickRegist()}>認証</button>
        </>
    )
}