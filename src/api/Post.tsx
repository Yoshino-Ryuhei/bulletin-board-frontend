import axios from "axios";

const post = async (user_id: string, token: string, msg: string) => {
    const data = {
        message: msg
    };
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/post?user_id=${user_id}&token=${token}`;
    const res = await axios.post(url, data);
    return res.data
}

const getList = async (token: string, start: number = 0, records: number = 10, searchWord: string = "") => {
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/post?token=${token}&start=${start}&records=${records}&word=${searchWord}`;
    const res = await axios.get(url);
    return res.data;
}

const deletePost = async (token: string, msg: string) => {
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/post?token=${token}`;
    const res = await axios.delete(url, {
        data: {message: msg}
    });
    return res.data
}

export {post, getList, deletePost}