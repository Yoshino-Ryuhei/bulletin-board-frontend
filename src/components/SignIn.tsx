import React, {useState, useContext} from 'react';
import {sign_in} from '../api/Auth.tsx';
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../providers/UserProvider.tsx';
import styled from 'styled-components';
import { getUser } from '../api/User.tsx';
import { getIconURL } from '../api/UserIcon.tsx';
import axios from 'axios';

export default function SignIn() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [pass, setPass] = useState('');
    const { setUserInfo } = useContext(UserContext);

    const onSignInClick = async () => {
        let ret
        try {
            ret = await sign_in(userId, pass);
        }
        catch(err) {
            if (axios.isAxiosError(err) && err.response?.status === 401){
                alert("ユーザーネームとパスワードのどちらかまたは両方違います。")
            }
            else{
                alert(err)
            }
            return
        }
        const user = await getUser(ret.user_id, ret.token);
        let icon_url = user.icon_url
        if(user.icon_url){
            icon_url = await getIconURL(ret.user_id, ret.token);
        }
        if (ret && ret.token) {
            // setUserInfoを使用してコンテキストにユーザー情報を保持する
            setUserInfo({
                id: ret.user_id,
                token: ret.token,
                email: user.email,
                icon: icon_url
            });
            navigate('/main')
        }
    }

    return (
    <SSignInFrame>
        <SSignInRow>
            <SSignInLabel>
                <label htmlFor="id">ID</label>
            </SSignInLabel>
            <SSignInInput>
                <input id="id" value={userId} type="text" onChange={(evt)=>setUserId(evt.target.value)} />
            </SSignInInput>
        </SSignInRow>
        <br></br>
        
        <SSignInRow>
            <SSignInLabel>
                <label htmlFor="password">Password</label>
            </SSignInLabel>
            <SSignInInput>
                <input id="password" value={pass} type="password" onChange={(evt)=>setPass(evt.target.value)}/>
            </SSignInInput>
        </SSignInRow>

        <br></br>
        <SSignInRow>
            <SLoginButton type="button" onClick={onSignInClick}>
                Login
            </SLoginButton>
        </SSignInRow>

        <SSignInRow>
            <SLoginButton type="button" onClick={() => navigate("/signup")}>
                Sign Up
            </SLoginButton>
        </SSignInRow>

        <br></br>
        <SSignInRow>
            <SLoginButton type="button" onClick={() => navigate("/resetpass")}>
                    パスワードを忘れた方
            </SLoginButton>
        </SSignInRow>
    </SSignInFrame>
    )
}

const SSignInFrame = styled.div`
    background-color: #f8f8f8;
    margin: 80px;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 8px;
    box-shadow: 0 8px 8px #aaaaaa;
`;

const SSignInRow = styled.div`
    display: inline-block;
    margin-top: 4px;
    margin-bottom: 4px;
`;

const SSignInLabel = styled.span`
    display: inline-block;
    width: 100px;
    vertical-align: top;
    text-align: left;
    margin-right: 4px;

    @media (max-width: 449px) {
        text-align: center;
    }
`;

const SSignInInput = styled.span`
    display: inline-block;
    width: auto;
    vertical-align: top;
    margin-left: 4px;
    margin-right: 4px;
`;

const SLoginButton = styled.button`
    background-color: #444444;
    color: #f0f0f0;
    padding: 4px 16px;
    margin: 4px;
    border-radius: 8px;
    font-size: 12px;
`;
