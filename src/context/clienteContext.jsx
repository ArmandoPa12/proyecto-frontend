import { createContext, useContext, useState } from "react";
import { getClienteRequest, deleteClienteRequest, createClienteRequest, updateClienteRequest, getClientesRequest} from "../api/cliente";

const ClienteContext = createContext();

export const useClientes = () => {
  const context = useContext(ClienteContext);
  if (!context) throw new Error("client must be used within a RolProvider");
  return context;
};

export function ClienteProvider({ children }) {

  const [clientes, setClientes] = useState([]);

  const getClientes = async () => {
    try {
      const res = await getClientesRequest();
      setClientes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  // const deleteCliente = async (id) => {
  //   try {
  //     const res = await deleteClienteRequest(id);
  //     if (res.status === 204) {
  //       setClientees((funcionalidades) => roles.filter((rol) => rol.id !== id));
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const createCliente = async (rol) => {
    try {
      const res = await createClienteRequest(rol);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const getCliente = async (id) => {
  //   try {
  //     const res = await getClienteRequest(id);
  //     return res.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const updateCliente= async (id, rol) => {
  //   try {
  //     await updateClienteRequest(id,rol);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  

  return (
    <ClienteContext.Provider
      value={{
        // Clientes,
        getClientes,
        // getCliente,
        // deleteCliente,
        // updateCliente,
        createCliente
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
}