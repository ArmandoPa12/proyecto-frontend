import axios from "./axios";

export const getMembresiasRequest = async() => axios.get("/membresia");

export const createMembresiaRequest = async(user) => axios.post("/membresia", user);

export const updateMembresiaRequest = async(id, user) => axios.put(`/membresia/${id}`, user);


export const deleteMembresiaRequest = async(id) => axios.delete(`/membresia/${id}`);

export const getMembresiaRequest = async(id) => axios.get(`/membresia/${id}`);