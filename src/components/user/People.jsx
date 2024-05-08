// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { UserList } from "./UserList";

export const People = () => {
  /*  const { auth } = useAuth(); */
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (nextPage = 1) => {
    
    //efecto de carga
    setLoading(true);

    //Peticion para sacar usuarios
    const request = await fetch(Global.url + "user/list/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    // Verificar si la respuesta es exitosa y si hay usuarios en los datos
    if (data.status === "success" && data.users) {
      let newUsers = data.users;

      // Si ya hay usuarios en el estado, combínalos con los nuevos usuarios
      if (users.length >= 1) {
        newUsers = [...users, ...data.users];
      }

      // Actualizar el estado con los usuarios
      setUsers(newUsers);
      setFollowing(data.user_following);
      setLoading(false);

      //TODO CHECK OUT IF IT´S CORRECT
      // Paginación
      if (newUsers.length >= data.total - data.users.length) {
        setMore(false); // No hay más usuarios para cargar
      }
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">People</h1>
      </header>

      <UserList
        users={users}
        getUsers={getUsers}
        following={following}
        setFollowing={setFollowing}
        page={page}
        setPage={setPage}
        more={more}
        setMore={setMore}
        loading={loading}
      />
    </>
  );
};
