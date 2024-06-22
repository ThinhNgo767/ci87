import axios from "axios";

const ROOT_API_URL = "https://650d41c5a8b42265ec2be909.mockapi.io";

export const fetchUsersAPI = async () => {
  const response = await axios.get(`${ROOT_API_URL}/user`);
  return response.data;
};


export const postUserAPI = async (data)=>{
    const response = await axios.post(`${ROOT_API_URL}/user`,data);
    return response.data;
}

export const putUserAPI = async (id,data)=>{
    const response = await axios.put(`${ROOT_API_URL}/user/${id}`,data);
    return response.data;
}

export const deleteUserAPI = async (id)=>{
    const response = await axios.delete(`${ROOT_API_URL}/user/${id}`);
    return response.data;
}
