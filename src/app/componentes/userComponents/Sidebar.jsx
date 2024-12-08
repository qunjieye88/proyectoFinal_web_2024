/* eslint-disable react/jsx-key */
'use client'
import { useState, useEffect } from 'react';

import "../../style/usuario/Sidebar.css"

export default function BarraLateralOpciones() {
    const [isMinimized, setIsMinimized] = useState(false);

    const toggleSidebar = () => {
      setIsMinimized(!isMinimized);
    };
  
    return (
      <div  className={`sidebar ${isMinimized ? "minimized" : ""}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isMinimized ? "☰" : "←"}
        </button>
        <button className="sidebar-btn">Menú</button>
        <button className="sidebar-btn">Cliente</button>
        <button className="sidebar-btn">Albarán</button>
        <button className="sidebar-btn">Proyecto</button>
        <button className="sidebar-btn">Ajustes</button>
        <button className="sidebar-btn">Proveedores</button>
      </div>
    );
};