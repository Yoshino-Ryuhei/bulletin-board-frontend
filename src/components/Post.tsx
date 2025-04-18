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

    const onClickDelete = async (line: string) => {
        await deletePost(userInfo.token, line)
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
    
    const getLines = (src: string):ReactNode => {
        return src.split("\n").map((line, index) => {
            return (
                <React.Fragment key={index}>
                    {line}
                    <br />
                    <SRightItem>
                        <SDeleteButton onClick={() => onClickDelete(line)}>Delete </SDeleteButton>
                    </SRightItem>
                </React.Fragment>
            )
        })
    }

    return(
        <>
            <SPost>
                <div>
                    <SName>{post.user_name}</SName>
                    <SDate>{getDateStr(post.created_at)}</SDate>
                </div>
                <div>{getLines(post.content)}</div>
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