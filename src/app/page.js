'use client';
import { useRouter } from "next/navigation";
import FormLogin from "./component/loginComponent/FromLogin.jsx";
import { useEffect } from "react";


export default function Home() {
  
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token)
      router.push("/user");
    }
  }, []);

  return (
    <>
      <FormLogin></FormLogin>
    </>
  );
}