import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL2;

export const addPost = async (id: string, data: FormData) => {
  try {
    const url = `${BASE_URL}/createpost/${id}`;
    const res = await axios.post(url, data, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const fetchPost = async () =>{
  try {
    const url =`${BASE_URL}/getPost`;
     const res = await axios.get(url,{
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const toggleLike = async (id: string, userId: string) =>{
  try {
    const url =`${BASE_URL}/like/${id}`;
     const res = await axios.patch(url, {userId: userId}, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const addComment = async (id: string, data: any) =>{
  try {
    const url =`${BASE_URL}/comment/${id}`;
     const res = await axios.patch(url, {data}, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    throw error;
  }
}
