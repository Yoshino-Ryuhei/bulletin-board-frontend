import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"
import { UserContext } from '../providers/UserProvider.tsx';
import { getUser } from '../api/User.tsx';
import styled from 'styled-components';

export default function Header() {
    const navigate = useNavigate();
    const [ userName, setUserName ] = useState("");
    const { userInfo, setUserInfo } = useContext(UserContext); 

    const logout = () => {
        setUserInfo({id: 0, token: ""});
        navigate("/");
    }

    useEffect(() => {
        const myGetUser = async () => {
            const user = await getUser(userInfo.id, userInfo.token);
            setUserName(user.name);
        }
        myGetUser();
    })

    return (
        <SHeader>
            <SLogo onClick={() => navigate("/main")}>MicroPost</SLogo>
            <SRightItem>
                <SName onClick={() => navigate("/profile")}>{userName}</SName>
                <SLogo onClick={logout}>ログアウト</SLogo>
            </SRightItem>
        </SHeader>
    )
}

const SHeader = styled.div`
    background-color: #222222;
    display: flex;
    flex-direction: row;
    color: #F8F8F8;
    padding-left: 8px;
    padding-right: 8px;
    height: 100%;
`;

const SLogo = styled.div`
    padding-top: 8px;
    padding-bottom: 8px;
    text-align: center;
    justify-content: start;
    cursor: pointer;
`;

const SRightItem = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: end;
`;

const SName = styled.div`
    padding-top: 8px;
    padding-bottom: 8px;
    text-align: center;
    margin-right: 20px;
    cursor: pointer;
`;

const SLogout = styled.div`
    padding-top: 8px;
    padding-bottom: 8px;
    text-align: center;
`;