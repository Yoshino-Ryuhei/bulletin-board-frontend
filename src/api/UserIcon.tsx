import axios from "axios";

const uploadUserIcon = async (user_id: number, token: string, formData: FormData) => {
    const url = `http://localhost:8000/user-icon/${user_id}?token=${token}`;
    const res = await axios.post<{ imageUrl: string }>(
        url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // 認証付きの場合
        }
    )
    return res
}

export {uploadUserIcon}