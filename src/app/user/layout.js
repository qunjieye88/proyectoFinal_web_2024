'use client'
import Sidebar from "../component/generalComponent/Sidebar";

import "../_style/userComponentStyle/pageUser.css"

export default function layoutUsuario({children}) {

    return (
      <div className="user">
          <Sidebar></Sidebar>
          {children}
      </div>
    );
  }
  