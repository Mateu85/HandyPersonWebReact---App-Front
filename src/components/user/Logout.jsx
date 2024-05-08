import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const Logout = () => {

    const {setAuth, setCounters} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        //Vacial el local storage
        localStorage.clear();

        //Setear estados globales a vacio
        setAuth({});
        setCounters({});

        //Navigate (redireccionar) al LoIn
        navigate("/login");
    });

    
    return(
        <h1>Cerrando Sessión...</h1>
    )
}