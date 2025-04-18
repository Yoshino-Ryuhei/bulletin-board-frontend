import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn.tsx';
import { UserProvider } from './providers/UserProvider.tsx';
import Main from './pages/Main.tsx';

import Profile from './pages/Profile.tsx';
import ProfileEdit from './pages/ProfileEdit.tsx';
import MailAuth from './components/MailAuth.tsx';
import SignUp from './pages/SignUp.tsx';
import Registration from './components/Registration.tsx';
import UploadIcon from './components/UploadIcon.tsx';


export const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signup/mailauth" element={<MailAuth />}></Route>
          <Route path="/signup/registration" element={<Registration/>}></Route>
          <Route path="/main" element={<Main />} />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/profile/edit" element={<ProfileEdit />}></Route>
          <Route path='/profile/upload_icon' element={<UploadIcon/>}></Route>
        </Routes>
      </UserProvider>
    </div>
  );
}