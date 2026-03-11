import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const addProfile = async (userId: string,userData: any) => {
  try {
    const url = `${BASE_URL}/auth/update/${userId}`
    const res = await axios.patch(url, userData, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in Reigstering User:", error);
    throw error;
  }
}

export const getProfile = async (userId: any) => {
  try {
    const url = `${BASE_URL}/auth/profile/${userId}`
    const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in fetching User:", error);
    throw error;
  }
}

export const addEducation = async (userId: string,formDataToSend: any) => {
  try {
    const url = `${BASE_URL}/auth/education/${userId}`
    const res = await axios.post(url, formDataToSend, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in adding education details:", error);
    throw error;
  }
}

export const getEducation = async (userId: any) => {
  try {
    const url = `${BASE_URL}/auth/education/${userId}`
    const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in fetching education details:", error);
    throw error;
  }
}

export const addExperience = async (userId: string,formDataToSend: any) => {
  try {
    const url = `${BASE_URL}/auth/experience/${userId}`
    const res = await axios.post(url, formDataToSend, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in adding education details:", error);
    throw error;
  }
}

export const getExperience = async (userId: any) => {
  try {
    const url = `${BASE_URL}/auth/experience/${userId}`
    const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in fetching education details:", error);
    throw error;
  }
}