import React, {ReactNode, useContext, useEffect} from 'react';
import styled from 'styled-components';
import { PostListContext, PostType } from '../providers/PostListProvider.tsx';
import { UserContext } from '../providers/UserProvider.tsx';
import { deletePost, getList } from '../api/Post.tsx';
import { getIconURL } from '../api/UserIcon.tsx';
import userIconSample from "../images/user_icon_sample.jpg";
import axios from 'axios';

export default function Post(props: any) {
    const {postList, setPostList, start, setStart} = useContext(PostListContext);
    const {userInfo} = useContext(UserContext); 
    const {children, post} = props;
    const getDateStr = (dateObj: Date) => {
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const date = dateObj.getDate();
        const hour = dateObj.getHours();
        const min = dateObj.getMinutes();
        const sec = dateObj.getSeconds();
        return `${year}年${month}月${date}日 ${hour}時${min}分${sec}秒`;
    }

    const getPostList = async () => {
        const posts = await getList(userInfo.token, start);
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
        setPostList([...postList]);
    }

    const onClickDelete = (id: number) => {
        new Promise(async (resolve) => {
            try {
                await deletePost(userInfo.token, id);
                resolve("");
            }
            catch(err) {
                if (axios.isAxiosError(err) && err.response?.status === 404){
                    alert("ほかの人の投稿を削除してはいけません！！！")
                }
                else{
                    alert(err)
                    return
                }
            }
        }).then(async () => {alert("投稿を削除しました！");await getPostList();})
    }
    
    const getLines = (post: PostType):ReactNode => {
        const lines = post.content.split('\n');
        return (
            <React.Fragment>
            {lines.map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
            <SRightItem>
                <SDeleteButton onClick={() => onClickDelete(post.id)}>Delete</SDeleteButton>
            </SRightItem>
        </React.Fragment>
        )
    }

    return(
        <>
            <SPost>
                <div>
                    <SUserIcon src={post.user_icon ? post.user_icon : userIconSample}  alt={"ユーザーアイコン"}></SUserIcon>
                    <SName>{post.user_name}</SName>
                    <SDate>{getDateStr(post.created_at)}</SDate>
                </div>
                <div>{getLines(post)}</div>
            </SPost>
        </>
    )
}

const SPost = styled.div`
    margin: 8px 0px;
    border-bottom: 1px solid #AAAAAA;
    text-align: left;
    padding-left: 8px;
`;

const SUserIcon = styled.img`
    border-radius: 100px;
    height: 50px;
    width: 50px;

    @media (max-width: 599px) {
        height: 30px;
        width: 30px;
    }
`;

const SName = styled.span`
    font-size: small;
    color: #000044;
`;

const SDate = styled.span`
    margin-left: 8px;
    font-size: small;
    color: #000044;
`;

const SRightItem = styled.div`
    margin: 8px 0px;
    text-align: right;
    padding-left: 8px;
`;

const SDeleteButton = styled.button`
    background-color: #444444;
    color: #f0f0f0;
    padding: 4px 16px;
    border-radius: 8px;
    margin-right: 5px;
    @media (max-width: 599px) {
        width: 6em;
        font-size: 80%;
    }
`;