import axios from "axios";

export const sign_in = async (user_id: string, pass: string) => {
    const url = `http://localhost:8000/auth?user_id=${user_id}&pass=${pass}`;
    const res = await axios.get(url);
    return res.data
}