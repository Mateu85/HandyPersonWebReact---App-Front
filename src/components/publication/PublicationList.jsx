/* eslint-disable react/prop-types */
import React from "react";
import { Global } from "../../helpers/Global";
import { Link } from "react-router-dom";
import avatar from "../../assets/img/user.png";
import useAuth from "../../hooks/useAuth";
import ReactTimeAgo from "react-time-ago";


export const PublicationList = (
  {publications,
  getPublications,
  page,
  setPage,
  more,
  setMore}
) => {

    const { auth } = useAuth();

  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getPublications(next); // Calling the inner function
  };

  const deletePublication = async (publicationId) => {
    const request = await fetch(
      Global.url + "publication/remove/" + publicationId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    // eslint-disable-next-line no-unused-vars
    const data = await request.json();

    setPage(1);
    setMore(true);
    getPublications(1, true);
  };
  return (
    <>
      <div className="content__posts">
        {publications.map((publication) => (
          <article className="posts__post" key={publication._id}>
            <div className="post__container">
              <div className="post__image-user">
                <Link
                  to={"/social/perfil/" + publication.user._id}
                  className="post__image-link"
                >
                  {publication.user.image !== "default.png" && (
                    <img
                      src={Global.url + "user/avatar/" + publication.user.image}
                      className="post__user-image"
                      alt="Foto de perfil"
                    />
                  )}
                  {publication.user.image === "default.png" && (
                    <img
                      src={avatar}
                      className="post__user-image"
                      alt="Foto de perfil"
                    />
                  )}
                </Link>
              </div>

              <div className="post__body">
                <div className="post__user-info">
                  <a href="#" className="user-info__name">
                    {publication.user.name + " " + publication.user.surname}
                  </a>
                  <span className="user-info__divider"> | </span>
                  <a href="#" className="user-info__create-date">
                  <ReactTimeAgo date={publication.created_at} locale="es-Es"/>
                  </a>
                </div>

                <h4 className="post__content">{publication.text}</h4>
                {publication.file && (
                  <img className="post__img"
                    src={Global.url + "publication/media/" + publication.file}
                  />
                )}
              </div>
            </div>

            {/* Boton borrar Post con condición */}
            {auth._id == publication.user._id && (
              <div className="post__buttons">
                <button
                  onClick={() => deletePublication(publication._id)}
                  className="post__button"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
      {/* Boton con condiciones para desaparecer cuando no hayan más publicaciones */}
      {more && (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            Ver más publicaciones
          </button>
        </div>
      )}
    </>
  );
};
