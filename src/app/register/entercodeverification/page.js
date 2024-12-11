/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useState, useEffect } from 'react';
import * as Yup from "yup";
import UserDataContainer from "../../component/userComponent/UserDataContainer";
import EnterVerificationCode from "../../component/registerComponent/EnterVerificationCode.jsx"
import { useRouter } from 'next/navigation';

export default function pageUsuario() {

  const [cuentaValidada, setCuentaValidada] = useState(false)
  const router = useRouter();

  useEffect(()=>{
    if(cuentaValidada){
      router.push("/login")
      setCuentaValidada(false)
    }
  },[cuentaValidada])


  return (
    <>
      <EnterVerificationCode></EnterVerificationCode>
    </>
  );
}
