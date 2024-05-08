
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Global } from "../../helpers/Global";
import { SerializeForm } from "../../helpers/SerializeForm";
import avatar from "../../assets/img/user.png";

export const Config = () => {
  const { auth, setAuth } = useAuth();
  const [saved, setSaved] = useState("not_saved");

  const updateUser = async (e) => {
    e.preventDefault();

    // Token de auntenticación
    const token = localStorage.getItem("token")

    //Recoger datos del formulario
    let newDataUser = SerializeForm(e.target);

    //Borrar datos del formulario
    delete SerializeForm.file0;

    //borrar propiedad innecesaria
    delete newDataUser.file0;

    //Actualizar usuario en la BBDD
    const request = await fetch(Global.url + "user/update", {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    if (data.status == "success" && data.user) {
      delete data.user.password;
      setAuth(data.user);
      setSaved("saved");

    } else {
      setSaved("error");
    }

    // Subida de Imagenes
    const fileInput = document.querySelector("#file");
    if (data.status === "success" && fileInput.files[0]) {
      //Recoger imagen a subir 
      const formData = new FormData();
      formData.append('file0', fileInput.files[0]);
      //Petición para enviar el fichero
      const uploadRequest = await fetch(Global.url + "user/upload",{
        method: "POST",
        body: formData,
        headers: {
          "Authorization": token
        }
      });

      const uploadData = uploadRequest.json();

      delete data.user.password;
      if(uploadData === "succes" && uploadData.user ){
        setAuth(uploadData.user);
        setSaved("saved");
      }else{
        setSaved("error");
      }
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Config</h1>
      </header>

      <div className="content_posts">
        {saved == "saved" ? (
          <strong className="alert alert-success">
            {" "}
            Usuario actualizado correctamente !!{" "}
          </strong>
        ) : (
          ""
        )}

        {saved == "error" ? (
          <strong className="alert alert-danger">
            {" "}
            Usuario no se ha actualizado !!{" "}
          </strong>
        ) : (
          ""
        )}

        <form className="config-form" onSubmit={updateUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" defaultValue={auth.name} />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellidos</label>
            <input
              type="text"
              id="surname"
              name="surname"
              defaultValue={auth.surname}
            />
          </div>

          <div className="form-group">
            <label htmlFor="nick">Nick</label>
            <input type="text" id="nick" name="nick" defaultValue={auth.nick} />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea name="bio" defaultValue={auth.bio} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={auth.email}
            />
          </div>

          <div className="form-group">
            <label htmlFor="adress">Dirección</label>
            <input
              type="text"
              id="adress"
              name="adress"
              defaultValue={auth.adress}
            />
          </div>
          

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>

          <div className="form-group">
            <label htmlFor="file0"></label>
            <div className="general-info__container-avatar">
              {auth.image != "default.png" && (
                <img
                  src={Global.url + "user/avatar/" + auth.image}
                  className="list-end__img"
                  alt="Foto de perfil"
                />
              )}
              {auth.image == "default.png" && (
                <img
                  src={avatar}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}
            </div>
            <br />
            <input type="file" name="file0" id="file"></input>
          </div>
          <br></br>

          <input type="submit" value="Actualizar" className="btn btn-primary" />
        </form>
        <br></br>
      </div>
    </>
  );
};
