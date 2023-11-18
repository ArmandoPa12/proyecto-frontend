import axios from "./axios";

export const getClientesRequest = async() => axios.get("/roles");

export const createClienteRequest = async(rol) => axios.post("/roles", rol);

export const updateClienteRequest = async(id, rol) => axios.put(`/roles/${id}`, rol);


export const deleteClienteRequest = async(id) => axios.delete(`/roles/${id}`);

export const getClienteRequest = async(id) => axios.get(`/roles/${id}`);