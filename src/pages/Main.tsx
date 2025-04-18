import React,{useContext} from "react"

import MainLayout from "../components/MainLayout.tsx";
import { Navigate } from "react-router-dom";
import { PostListProvider } from "../providers/PostListProvider.tsx";  // 追加
import { UserContext } from "../providers/UserProvider.tsx";



export default function Main() {
    const { userInfo } = useContext(UserContext);
    const loggedIn = (userInfo.token !== '');

    return (
    <>
        <PostListProvider>
            {loggedIn ? <MainLayout /> : <Navigate replace to="/" />}
        </PostListProvider>
    </>
    );
}