import axios from "axios";

const post = async (user_id: string, token: string, msg: string) => {
    const data = {
        message: msg
    };
    const url = `http://localhost:8000/post?user_id=${user_id}&token=${token}`;
    const res = await axios.post(url, data);
    return res.data
}

const getList = async (token: string, start: number = 0, records: number = 10, searchWord: string = "") => {
    const url = `http://localhost:8000/post?token=${token}&start=${start}&records=${records}&word=${searchWord}`;
    const res = await axios.get(url);
    return res.data;
}

const deletePost = async (token: string, msg: string) => {
    const url = `http://localhost:8000/post?token=${token}`;
    const res = await axios.delete(url, {
        data: {message: msg}
    });
    return res.data
}

export {post, getList, deletePost}