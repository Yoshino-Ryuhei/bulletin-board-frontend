import axios from "axios";

const registerUser = async (name:string, email:string, otp:string) => {
    const url = `http://localhost:8000/mail/registration?name=${name}&email=${email}&otp=${otp}`;
    const res = await axios.get(url);
    return res.data
}

const sendRegistMail = async (name:string, email:string) => {
    const date = {
        name: name,
        email: email,
    }
    const url = `http://localhost:8000/mail/send`;
    const res = await axios.post(url, date);
    return res.data
}

export {registerUser, sendRegistMail}