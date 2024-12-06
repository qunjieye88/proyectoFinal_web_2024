'use client'
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const SignSquema = Yup.object({
    email: Yup.string().email("No es un email válido").required(),
    password: Yup.string()
        .min(4,"Minimo 4 caracteres")
        .max(10,"Maximo 10 caracteres")
        .required()
})

export default function Formulario({setLogeado}){

    const [exiteCuenta,setExiteCuenta] = useState(true)
    const router = useRouter();

    const{register, handleSubmit, reset, formState:{errors}}= useForm({
        resolver:yupResolver(SignSquema)
    });

    function onSubmit(data){
        login(data.email, data.password)
        reset();
    }

    function login(email, password){
        fetch("https://bildy-rpmaya.koyeb.app/api/user/login",{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password}),
        }).then(respuesta => {
            if (respuesta.ok) {
              return respuesta.json();
            } else {
              throw new Error;
            }
          })
        .then(dato =>{
            localStorage.setItem("token",dato["token"])
            setExiteCuenta(true)
            if(dato["token"]){
                router.push("/usuario")
            }
        }).catch((error) => {
            setExiteCuenta(false)
        }
    )}

    const notificacionExisteCuenta = !exiteCuenta && (<p>La cuenta no existe</p>)

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} placeholder= "Introduce email"></input>
            {errors.email && <p>{errors.email.message}</p>}
            <input {...register("password")} placeholder= "Introduce password"></input>
            {errors.password && <p>{errors.password.message}</p>}
            <button>ACEPTAR</button>
            {notificacionExisteCuenta}
        </form>
    )
}