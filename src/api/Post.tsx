import axios from "axios";

const post = async (user_id: string, token: string, msg: string) => {
    const data = {
        message: msg,
    };
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/post`;
    const res = await axios.post(url, data, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data
}

const getList = async (token: string, start: number = 0, records: number = 10, searchWord: string = "") => {
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/post?start=${start}&records=${records}&word=${searchWord}`;
    const res = await axios.get(url,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

const deletePost = async (token: string, msg: string) => {
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/post?message=${msg}`;
    const res = await axios.delete(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data
}

export {post, getList, deletePost}