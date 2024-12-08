/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import FormularioLogin from "../componentes/loginComponentes/FormularioLogin.jsx";
import BotonRedirigir from "../componentes/BotonRedirigir.jsx"
import { useState, useEffect } from 'react';

import"../style/loginComponentsStyle/main.css"

export default function pageLogin() {
  const [logeado, setLogeado] = useState(false)



  return (
    <>
      <h1>LOGIN</h1>
      <FormularioLogin setLogeado={setLogeado}></FormularioLogin>
      <BotonRedirigir path={"/register"} mensaje={"crear cuenta"}></BotonRedirigir>

    </>
  );
}