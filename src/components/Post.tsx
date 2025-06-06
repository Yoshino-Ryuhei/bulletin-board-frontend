import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { PostType } from '../providers/PostListProvider.tsx';
import userIconSample from "../images/user_icon_sample.jpg";

export default function Post(props: any) {
    const {children, post, onClickDelete, opacity} = props;
    const getDateStr = (dateObj: Date) => {
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const date = dateObj.getDate();
        const hour = dateObj.getHours();
        const min = dateObj.getMinutes();
        const sec = dateObj.getSeconds();
        return `${year}年${month}月${date}日 ${hour}時${min}分${sec}秒`;
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
            <SPost opacity={opacity}>
                <div>
                    <SUserIcon src={post.user_icon ? post.user_icon : userIconSample}  alt={"ユーザーアイコン"} loading="lazy"></SUserIcon>
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
    position: relative;
    ${(props) => {return(`opacity: ${props.opacity};`)}}
    ${(props) => props.opacity ? `` : `::after{ display: block; position: absolute; width: 100%; height: 100%; content: ""; pointer-events: auto; z-index: 10;}`}
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