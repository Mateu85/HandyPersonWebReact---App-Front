import React from "react";

// eslint-disable-next-line no-unused-vars
import { Routes, Route, BrowserRouter, Navigate, Link } from "react-router-dom";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { Feed } from "../components/publication/Feed";
import { PrivateLayout } from "../components/layout/private/PrivateLayout";
import { AuthProvider } from "../context/AuthProvider";
import { Logout } from "../components/user/Logout";
import { People } from "../components/user/People";
import { Config } from "../components/user/Config";
import { Following } from "../components/follow/Following";
import { Followers } from '../components/follow/Followers';
import { Profile } from "../components/user/Profile";



export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />
          </Route>

          <Route path="/social" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path="feed" index element={<Feed />} />
            <Route path="logout" element={<Logout />} />
            <Route path="people" element={<People />} />
            <Route path="ajustes" element={<Config />} />
            <Route path="siguiendo/:userId" element={<Following />} />
            <Route path="seguidores/:userId" element={<Followers />} />
            <Route path="perfil/:userId" element={<Profile />} />
          </Route>

          <Route
            path="*"
            element={
              <>
                <div>
                  <h1>ERROR 404 </h1>
                  <Link to="/"> Go Back To HomePage</Link>
                </div>
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
