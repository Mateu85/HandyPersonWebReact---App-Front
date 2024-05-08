import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export const Login = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const {setAuth} = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();

    /* Form Data */
    let userToLogin = form;

    /* Request from Back End */
    const request = await fetch(Global.url + 'user/login', {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      /* Maitain data in Browser */
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSaved("login");

      // set datos en el auth
      setAuth(data.user)
      //redireción
      setTimeout(() =>{
        window.location.reload();
      }, 1000);

    } else {
      setSaved("error");
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">LogIn</h1>
      </header>

      {/* ALERTS */}

      {saved == "login" ? (
        <strong className="alert alert-success">
          {" "}
          Usuario Indentificado correctamente !!{" "}
        </strong>
      ) : (
        ""
      )}

      {saved == "error" ? (
        <strong className="alert alert-danger"> Usuario no existe !! </strong>
      ) : (
        ""
      )}

      <div className="content__posts">
        <form className="form-login" onSubmit={loginUser}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={changed}
              className=""
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={changed}
              className=""
            ></input>
          </div>

          

          <input
            type="submit"
            value="Indentificate"
            className="btn btn-success"
          />
        </form>
      </div>
    </>
  );
};
