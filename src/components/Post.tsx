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

    const onClickDelete = async (id: number) => {
        try {
            await deletePost(userInfo.token, id);
            alert("投稿を削除しました！");
        }
        catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 404){
                alert("人の投稿を勝手に消してはいけません！！！")
            }
            else {
                alert(err);
            }
        }

        const posts = await getList(userInfo.token, start)
       // getListで取得したポスト配列をコンテキストに保存する
        let postList: Array<PostType> = [];
        if (posts) {
            for (const p of posts) {
                const userIcon = await getIconURL(p.user_id, userInfo.token);
                postList.push({
                    id: p.id,
                    user_name: p.user_name,
                    user_icon: userIcon,
                    content: p.content,
                    created_at: new Date(p.created_at),
                });
            }
        }
        setPostList([...postList])
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
`;