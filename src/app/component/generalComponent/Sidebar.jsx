/* eslint-disable react/jsx-key */
'use client'
import { useState } from 'react';
import { useRouter } from "next/navigation";
import RedirectButton from "../generalComponent/ButtonRedirect"
import "../../_style/generalComponentStyle/Sidebar.css"

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  const logOut = () => {
    localStorage.setItem("token", "")
    const x = localStorage.getItem("token")
    console.log(x)
  }


  return (
    <div className={`sidebar ${isMinimized ? "minimized" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isMinimized ? "☰" : "←"}
      </button>
      <RedirectButton className="sidebar-btn" path="/user">Menú</RedirectButton>
      <RedirectButton className="sidebar-btn" path="/user/client">Cliente</RedirectButton>
      <RedirectButton className="sidebar-btn" path="/user/proyect">Proyecto</RedirectButton>
      <RedirectButton className="sidebar-btn" path="/user/deliverynote">Albarán</RedirectButton>
      <RedirectButton className="sidebar-btn" path="/" addFuncions={logOut}>LOG OUT</RedirectButton>
    </div>
  );
};