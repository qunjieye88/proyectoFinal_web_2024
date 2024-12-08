/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Sidebar from "../componentes/userComponents/Sidebar.jsx";
import UserDataContainer from "../componentes/userComponents/UserDataContainer.jsx";
import { useState, useEffect } from 'react';
import "../style/usuario/main.css";



export default function pageUsuario() {

  const [optionData, setOptionData]= useState("cliente")
  

  return (
    <div className="main">
        <Sidebar></Sidebar>
        <UserDataContainer></UserDataContainer>
    </div>
  );
}