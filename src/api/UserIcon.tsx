import axios from "axios";

const uploadUserIcon = async (user_id: number, token: string, formData: FormData) => {
    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/user-icon/${user_id}`;
    const res = await axios.post<{ imageUrl: string }>(
        url,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // 認証付きの場合
        }
    )
    return res
}

const getIconURL = async (user_id: number, token: string) => {
  const url = `${process.env.REACT_APP_BACKEND_DOMAIN}`+`/user-icon/${user_id}`;
  const res = await axios.get<{ imageUrl: string }>(url,{
    headers: {
        Authorization: `Bearer ${token}`
    }
})
  return res.data
}


export {uploadUserIcon, getIconURL}