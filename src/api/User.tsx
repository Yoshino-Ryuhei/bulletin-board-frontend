import axios from "axios";

const getUser = async (user_id: number, token: string) => {
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/user/${user_id}`;
    const res = await axios.get(url,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};

const createUser = async (token:string , password: string) => {
    const param = {password: password}
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/user?token=${token}`;
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
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/user/${user_id}`;
    const options = {
        method: "PATCH",
        url: url,
        headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
        data: param,
    }
    const res = await axios(options);
    return res.data
}

const resetPassUser = async (name: string, email: string, password: string) => {
    const param = {name: name, email: email, password: password}
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}` + `/user`;
    const options = {
        method: "PUT",
        url: url,
        headers: {"Content-Type": "application/json"},
        data: param,
    }
    const res = await axios(options);
    return res.data
}

export { getUser, createUser, updateUser, resetPassUser };