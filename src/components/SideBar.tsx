import React, {useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../providers/UserProvider.tsx';
import styled from 'styled-components';
import { getList, post } from '../api/Post.tsx';
import { PostListContext, PostType } from '../providers/PostListProvider.tsx';
import userIconSample from "../images/user_icon_sample.jpg";
import { io } from "socket.io-client";
import { getIconURL } from '../api/UserIcon.tsx';
import axios from 'axios';

const socket = io(process.env.REACT_APP_WEBSOCKET_DOMAIN, {transports: ['websocket']});

export default function SideBar() {
    const [msg, setMsg] = useState("");
    const {postList, setPostList, start, setStart} = useContext(PostListContext);
    const startRef = useRef(start);
    const { userInfo } = useContext(UserContext);

    const submit = (post: PostType) => {
        socket.emit("new_post", post);
    }

    const onSendClick = async() => {
        if (msg === ""){
            alert("入力してください");
            return
        }
        new Promise<PostType>(async(resolve)=>{
            const newPost = await post(String(userInfo.id), userInfo.token, String(msg));
            resolve(newPost);})
        .then((newPost) =>{
            submit(newPost);
        });
    }
    useEffect(() => {
        startRef.current = start;
    }, [start]);

    useEffect(() => {
        const sendWebSocketPost = async (post) => {
            post.created_at = new Date(post.created_at);
            let icon_url
            try {
                icon_url = await getIconURL(post.user_id, userInfo.token);
            }
            catch(err) {
                if (axios.isAxiosError(err) && err.response?.status === 500){
                    icon_url = undefined
                }
                else{
                    alert(err)
                    return
                }
            }
            post.user_icon = icon_url;
            if (startRef.current === 0){
                setPostList(prev => [post, ...prev.slice(0,9)])
            }
        }
        socket.on("new_post", async(post) => {
            await sendWebSocketPost(post);
        })

        return () => {
            socket.off("new_post");
        }
    }, [])

    return (
        <SSideBar>
            <SSideBarUserIcon src={userInfo.icon ? userInfo.icon : userIconSample} alt={"ユーザーアイコン"}></SSideBarUserIcon>
            <SSideBarRow>{userInfo.email}</SSideBarRow>
            <SSideBarRow>
                <SSideBarTextArea
                    rows={4}
                    value={msg}
                    onChange={(evt) => setMsg(evt.target.value)}
                ></SSideBarTextArea>
                <SSideBarRow>
                    <SSideBarButton onClick={onSendClick}>送信</SSideBarButton>
                </SSideBarRow>
            </SSideBarRow>
        </SSideBar>
    )
}

const SSideBar = styled.div`
    padding: 8px;
    width: 100%;

    @media (max-width: 599px) {
        width: 80%;
    }
`;

const SSideBarRow = styled.div`
    margin-top: 4px;
    margin-bottom: 4px;
    text-align: left;
    width: 90%;
    overflow-wrap: anywhere;

    @media (max-width: 599px) {
        font-size: 80%;
    }
`;

const SSideBarTextArea = styled.textarea`
    border-radius: 4px;
    border-shadow: inset 0 2px 4px #CCCCCC;
    width: 90%;

    @media (max-width: 599px) {
        width: 80%;
    }
`;

const SSideBarButton = styled.button`
    background-color: #222222;
    padding: 4px;
    border-radius: 8px;
    color: #FAFAFA;
    width: 90%;

    @media (max-width: 599px) {
        font-size: 90%;
    }
`;

const SSideBarUserIcon = styled.img`
    border-radius: 100px;
    height: 100px;
    width: 100px;

    @media (max-width: 599px) {
        height: 50px;
        width: 50px;
    }
`;
