import React, {useState, useContext } from 'react';
import { UserContext } from '../providers/UserProvider.tsx';
import styled from 'styled-components';
import { getList, post } from '../api/Post.tsx';
import { PostListContext, PostType } from '../providers/PostListProvider.tsx';
import userIconSample from "../images/user_icon_sample.jpg";

export default function SideBar() {
    const [msg, setMsg] = useState("");
    const {postList, setPostList, start, setStart} = useContext(PostListContext);
    const { userInfo } = useContext(UserContext);
    const onSendClick = async() => {
        if (msg === ""){
            alert("入力してください");
            return
        }
        await post(String(userInfo.id), userInfo.token, String(msg));
        getPostList();
    }

    const getPostList = async() => {
        const posts = await getList(userInfo.token, start)

        // getListで取得したポスト配列をコンテキストに保存する
        let postList: Array<PostType> = [];
        if (posts) {
            posts.forEach((p:any) => {
                postList.push({
                    id: p.id,
                    user_name: p.user_name,
                    content: p.content,
                    created_at: new Date(p.created_at),
                })
            })
        }
        setPostList(postList);
    }

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
`;

const SSideBarRow = styled.div`
    margin-top: 4px;
    margin-bottom: 4px;
    text-align: left;
`;

const SSideBarTextArea = styled.textarea`
    border-radius: 4px;
    border-shadow: inset 0 2px 4px #CCCCCC;
`;

const SSideBarButton = styled.button`
    background-color: #222222;
    padding: 4px;
    border-radius: 8px;
    color: #FAFAFA;
    width: 100%;
`;

const SSideBarUserIcon = styled.img`
    width: 150px;
    hight: 200px;
    border-radius: 100px;
`;
