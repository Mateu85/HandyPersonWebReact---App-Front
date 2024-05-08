import React, { useState, useEffect, createContext } from "react";
import { Global } from "../helpers/Global";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  const [counters, setCounters] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    //Sacar datos usuario indentificado del localStorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // comprobar si tengo el token y el user esta authenticated
    if (!token || !user) {
      setLoading(false)
      return false;
    }

    //Transformar los datos a un objeto de javascript
    const userObj = JSON.parse(user);
    const userId = userObj.id;

    //Petición Ajax al BackEnd que compruebe el token y que
    //me devuelva todos los datos dels usuario
    const request = await fetch(Global.url + "user/profile/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });

    const data = await request.json();

    //Peticion para los contadores
    const requestCounters = await fetch(Global.url + "user/counters/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });

    const dataCounters = await requestCounters.json();

    // Setear el estado de los contadores
    setAuth(data.user);
    setCounters(dataCounters);
    setLoading(false)

  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        counters,
        setCounters,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
