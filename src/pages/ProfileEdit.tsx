import React,{useContext} from "react"

import { Navigate } from "react-router-dom";
import { PostListProvider } from "../providers/PostListProvider.tsx";  // 追加
import { UserContext } from "../providers/UserProvider.tsx";
import ProfileEditLayout from "../components/ProfileEditLayout.tsx";



export default function ProfileEdit() {
    const { userInfo } = useContext(UserContext);
    const loggedIn = (userInfo.token !== '');

    return (
    <>
        <PostListProvider>
            {loggedIn ? <ProfileEditLayout /> : <Navigate replace to="/" />}
        </PostListProvider>
    </>
    );
}