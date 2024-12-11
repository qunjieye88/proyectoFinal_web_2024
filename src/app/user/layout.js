
'use client'
import Sidebar from "../component/userComponent/Sidebar.jsx";
import "../style/userComponentsStyle/User.css";

export default function layoutUsuario({children}) {

    return (
      <div className="user">
          <Sidebar></Sidebar>
          {children}
      </div>
    );
  }
  