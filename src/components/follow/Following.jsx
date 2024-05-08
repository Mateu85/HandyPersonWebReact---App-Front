// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { useParams } from "react-router-dom";
import { UserList } from "../user/UserList";
import  {GetProfile} from '../../helpers/GetProfile';



export const Following = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});

  const params = useParams();

  useEffect(() => {
    getUsers(1);
    GetProfile(params.userId, setUserProfile);
  }, []);

  const getUsers = async (nextPage = 1) => {
    //efecto de carga
    setLoading(true);

    //Sacar userId de la url
    const userId = params.userId;

    //Peticion para sacar usuarios
    const request = await fetch(
      Global.url + "follow/following/" + userId + "/" + nextPage,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await request.json();

    //recorrer y limpiar follows para obtener los followed
    /* let cleanUsers = [];
    data.follows.forEach((follow) => {
      cleanUsers = [...cleanUsers, follow.followed];
    });

    data.users = cleanUsers; */
    if (data.follows && Array.isArray(data.follows)) {
      let cleanUsers = [];
      data.follows.forEach((follow) => {
        cleanUsers = [...cleanUsers, follow.followed];
      });
      data.users = cleanUsers;
    } else {
      // Manejar el caso en el que data.follows es null o no es un array
    }

    // Verificar si la respuesta es exitosa y si hay usuarios en los datos
    if (data.status === "success" && data.users && data.users.length > 0) {
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
        <h1 className="content__title">Usuarios que siguen  {userProfile.name} {userProfile.surname} </h1>
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
