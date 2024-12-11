/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Profile from "../component/userComponent/Profile"
import { GetData } from "@/app/utils/utils";
import { useEffect, useState } from "react";
export default function pageUsuario() {

  const [user, setUser] = useState(null)

  const fetchData = async () => {
    const path = "https://bildy-rpmaya.koyeb.app/api/user";
    const token = localStorage.getItem("token");
    const user = await GetData(path, token);
    setUser(user)
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Profile user={user}></Profile>
  );
}