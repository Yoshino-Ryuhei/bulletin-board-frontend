import axios from "axios";

const getUser = async (user_id: number, token: string) => {
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/user/${user_id}?token=${token}`;
    const res = await axios.get(url);
    return res.data;
};

const createUser = async (name: string, email: string, password: string) => {
    const param = {name: name, email: email, password: password}
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/user`;
    const options = {
        method: "POST",
        url: url,
        headers: {"Content-Type": "application/json"},
        data: param,
    }
    const res = await axios(options);
    return res.data
}

const updateUser = async (name: string, email: string, password: string, user_id: number, token: string) => {
    const param = {name: name, email: email, password: password}
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/user/${user_id}?token=${token}`;
    const options = {
        method: "PATCH",
        url: url,
        headers: {"Content-Type": "application/json"},
        data: param,
    }
    const res = await axios(options);
    return res.data
}

export { getUser, createUser, updateUser };