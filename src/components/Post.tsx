import React, {ReactNode, useContext} from 'react';
import styled from 'styled-components';
import { PostListContext, PostType } from '../providers/PostListProvider.tsx';
import { UserContext } from '../providers/UserProvider.tsx';
import { deletePost, getList } from '../api/Post.tsx';

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
        await deletePost(userInfo.token, id)
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