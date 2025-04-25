import axios from "axios";

const registerUser = async (token: string, otp:string) => {
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/mail/registration?token=${token}&otp=${otp}`;
    const res = await axios.get(url);
    return res.data
}

const sendRegistMail = async (name:string, email:string) => {
    const date = {
        name: name,
        email: email,
    }
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/mail/send/registration`;
    const res = await axios.post(url, date);
    return res.data
}

const sendResetPasstMail = async (name:string, email:string) => {
    const date = {
        name: name,
        email: email,
    }
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/mail/send/resetpass`;
    const res = await axios.put(url, date);
    return res.data
}

export {registerUser, sendRegistMail, sendResetPasstMail}