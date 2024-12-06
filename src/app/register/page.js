/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import FormularioRegistro from "../componentes/registerComponentes/FormularioRegistro.jsx"
import EnterVerificationCode from "../componentes/registerComponentes/EnterVerificationCode.jsx"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BotonRedirigir from "../componentes/BotonRedirigir.jsx"


export default function pageRegister() {

  const [cuentaValidada, setCuentaValidada] = useState(false)
  const router = useRouter();

  useEffect(()=>{
    if(cuentaValidada){
      router.push("/login")
      setCuentaValidada(false)
    }
  },[cuentaValidada])

  
  const enterVerificationCode =(<EnterVerificationCode setCuentaValidada={setCuentaValidada}></EnterVerificationCode>)

  return (
    <>
        <h1>PAGINA REGISTRAR</h1>
        <FormularioRegistro></FormularioRegistro>
        {enterVerificationCode}
        <BotonRedirigir path={"/login"} mensaje={"Ya tengo cuenta"}></BotonRedirigir>
    </>
  );
}