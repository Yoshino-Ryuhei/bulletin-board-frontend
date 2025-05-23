import { useState, createContext, Dispatch, SetStateAction } from "react";
import React from "react";

// ポストを保持する型を定義
export type PostType = {
    id: number;
    user_name: string;
    user_icon?: string;
    content: string;
    created_at: Date;
};

export const PostListContext = createContext(
    {} as {
        postList: PostType[];
        setPostList: Dispatch<SetStateAction<PostType[]>>;
        // レコードの開始位置
        start: number;
    },
);

export const PostListProvider = (props: any) => {
    const { children } = props;
    const [postList, setPostList] = useState<PostType[]>([]);
    const [start, setStart] = useState<number>(0);
    return (
        <PostListContext.Provider value={{postList, setPostList, start, setStart}}>
            {children}
        </PostListContext.Provider>
    )
}