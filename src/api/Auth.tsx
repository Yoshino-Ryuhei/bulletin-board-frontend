import axios from "axios";

export const sign_in = async (user_id: string, pass: string) => {
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/auth?user_id=${user_id}&pass=${pass}`;
    const res = await axios.get(url);
    return res.data
}