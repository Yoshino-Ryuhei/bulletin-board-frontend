import React,{useContext} from "react"

import { Navigate } from "react-router-dom";
import { PostListProvider } from "../providers/PostListProvider.tsx";  // 追加
import { UserContext } from "../providers/UserProvider.tsx";
import ProfileLayout from "../components/ProfileLayout.tsx";



export default function Profile() {
    const { userInfo } = useContext(UserContext);
    const loggedIn = (userInfo.token !== '');

    return (
    <>
        <PostListProvider>
            {loggedIn ? <ProfileLayout /> : <Navigate replace to="/" />}
        </PostListProvider>
    </>
    );
}