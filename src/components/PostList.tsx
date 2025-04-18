import React, {useContext, useEffect, useState} from 'react';
import Post from './Post.tsx';
import { PostListContext, PostType } from '../providers/PostListProvider.tsx';
import { UserContext } from '../providers/UserProvider.tsx';
import { getList } from '../api/Post.tsx';
import styled from 'styled-components';

export default function PostList() {
    // ポストリストコンテキスト、ユーザーコンテキストを使用する
    const {postList, setPostList, start, setStart} = useContext(PostListContext);
    const {userInfo} = useContext(UserContext); 
    const [searchWord, setSearchWord] = useState("");

    const getPostList = async() => {
        const posts = await getList(userInfo.token, start, 10, String(searchWord))

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

    const onClickFollowTenPostList = () => {
        if (start - 10 >= 0){
            setStart(start - 10);
        }
    }

    const onClickNextTenPostList = async() => {
        const posts = await getList(userInfo.token, start + 10, 10, String(searchWord)) //1000件以上の投稿をどうするか?
        if  (posts.length){
            setStart(start + 10);
        }
    }

    useEffect(() => {
        async function asyncGetPostList() {
            await getPostList();
        }
        asyncGetPostList();
    }, [start, searchWord])

    return (
        <>
        <SPostList>
            <p>PostList  <span>{start+1}~{start+postList.length}件</span></p>
            <label>検索</label>
            <input value={searchWord} type="text" onChange={(evt) => {setSearchWord(evt.target.value);setStart(0);}}></input>
            {postList.map((p) => (
                <>
                    <Post key={p.id} post={p}></Post>
                </>
            ))}
        </SPostList>
        <SPostListButton onClick={()=> onClickFollowTenPostList()}>Follow</SPostListButton>
        <SPostListButton onClick={()=> getPostList()}>Reload</SPostListButton>
        <SPostListButton onClick={()=> onClickNextTenPostList()}>Next</SPostListButton>
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
`;