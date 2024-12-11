'use client';
import { useRouter } from "next/navigation";
import FormLogin from "./component/loginComponent/FormLogin.jsx";
import { useState, useEffect } from 'react';

export default function Home() {
  
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/user");
    }
  }, []);

  return (
    <>
      <FormLogin></FormLogin>
    </>
  );
}