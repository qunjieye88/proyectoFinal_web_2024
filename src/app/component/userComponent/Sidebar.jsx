/* eslint-disable react/jsx-key */
'use client'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import RedirectButton from "../RedirectButton"
import "../../style/userComponentsStyle/Sidebar.css"

export default function Sidebar() {
    const [isMinimized, setIsMinimized] = useState(false);

    const toggleSidebar = () => {
      setIsMinimized(!isMinimized);
    };

    const logOut = () =>{
      localStorage.setItem("token","")
    }
        
  
    return (
      <div  className={`sidebar ${isMinimized ? "minimized" : ""}`}>
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