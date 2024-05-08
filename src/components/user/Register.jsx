import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";

export const Register = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");

  const saveUser = async (e) => {
    e.preventDefault();
    /* Collect Form Data */
    let newUser = form;

    /* Save Data into DDBB */
    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type" : "application/json",
      },
    });

    const data = await request.json(); // Read the response as text

    if (data.status === "success") {
      setSaved("saved");
    } else {
      setSaved("error");
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Registro</h1>
      </header>

      <div className="content__posts">
        {/* ALERTS */}

        {saved == "saved" ? (
          <strong className="alert alert-success">
            {" "}
            Usuario registrado correctamente !!{" "}
          </strong>
        ) : (
          ""
        )}

        {saved == "error" ? (
          <strong className="alert alert-danger">
            {" "}
            Usuario no se ha registrado !!{" "}
          </strong>
        ) : (
          ""
        )}

        <form className="register-form" onSubmit={saveUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellidos</label>
            <input type="text" id="surname" name="surname" onChange={changed} />
          </div>

          <div className="form-group">
            <label htmlFor="nick">Nick</label>
            <input type="text" id="nick" name="nick" onChange={changed} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={changed} />
          </div>

          <div className="form-group">
            <label htmlFor="text">Dirección</label>
            <input type="text" id="adress" name="adress" onChange={changed} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={changed}
            />
          </div>

          <input type="submit" value="register" className="btn btn-primary" />
        </form>
      </div>
    </>
  );
};
