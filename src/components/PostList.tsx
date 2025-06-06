import React, {useContext, useEffect, useState} from 'react';
import Post from './Post.tsx';
import { PostListContext, PostType } from '../providers/PostListProvider.tsx';
import { UserContext } from '../providers/UserProvider.tsx';
import { getList } from '../api/Post.tsx';
import styled from 'styled-components';
import { getIconURL } from '../api/UserIcon.tsx';
import axios from 'axios';

export default function PostList() {
    // ポストリストコンテキスト、ユーザーコンテキストを使用する
    const {postList, setPostList, start, setStart} = useContext(PostListContext);
    const {userInfo} = useContext(UserContext); 
    const [searchWord, setSearchWord] = useState("");

    const getPostList = async() => {
        let posts = await getList(userInfo.token, start, 10, searchWord)
        if (!posts.length && start !== 0){
            setStart(start-10);
            return
        }

        // getListで取得したポスト配列をコンテキストに保存する
        let postList: Array<PostType> = [];
        if (posts) {
            for (const p of posts) {
                let icon_url
                try {
                    icon_url = await getIconURL(p.user_id, userInfo.token);
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
                 postList.push({
                    id: p.id,
                    user_name: p.user_name,
                    user_icon: icon_url,
                    content: p.content,
                    created_at: new Date(p.created_at),
                });
            }
        }
        setPostList(postList);
    }

    const onClickBackTenPostList = () => {
        if (start - 10 >= 0){
            setStart(start - 10);
        }
    }

    const onClickNextTenPostList = async() => {
        setStart(start + 10);
    }

    useEffect(() => {
        async function asyncGetPostList() {
            await getPostList();
        }
        asyncGetPostList();
    }, [start])

    useEffect(() => {
        async function asyncGetPostList() {
            await getPostList();
        }
        asyncGetPostList();
    }, [searchWord])

    return (
        <>
        <SPostList>
            <div>PostList  <span>{start+1}~{start+postList.length}件</span></div>
            <SPostListButton onClick={()=> onClickBackTenPostList()}>&lt;</SPostListButton>
            <SPostListButton onClick={()=> getPostList()}>↺</SPostListButton>
            <SPostListButton onClick={()=> onClickNextTenPostList()}>&gt;</SPostListButton>
            <br></br>
            <label>検索</label>
            <input value={searchWord} type="text" onChange={(evt) => {setSearchWord(evt.target.value);setStart(0);}}></input>
            {postList.map((p) => (<Post key={p.id} post={p}></Post>))}
        </SPostList>
        </>
    )
}

const SPostList = styled.div`
    margin-top: 16px;
    height: calc(100vh - 86px);
    overflow-y: scroll;
`;

const SPostListButton = styled.button`
    background-color: #222222;
    padding: 4px;
    margin-top: 10px;
    margin-left: 3px; 
    margin-right: 3px; 
    margin-bottom: 5px;
    border-radius: 8px;
    color: #FAFAFA;
    width: 10%;
    font-size: 12px;

    @media (min-width: 600px) {
        width: 50px;
    }

    @media (min-width: 600px) {
        width: 50px;
    }
`;