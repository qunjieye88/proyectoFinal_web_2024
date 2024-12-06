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
        .required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required()
    
})

export default function FormularioRegistro(){
    
    const{register, handleSubmit, reset, formState:{errors}}= useForm({
        resolver:yupResolver(SignSquema)
    });

    function onSubmit(data){
        console.log(data.email)
        console.log(data.password)
        console.log(data.firstName)
        console.log(data.lastName)
        crearCuenta(data.email, data.password, data.firstName,data.lastName)

        reset();
    }

    function crearCuenta(email, password, firstName,lastName){
        fetch("https://bildy-rpmaya.koyeb.app/api/user/register",{
            method: "POST",
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({email, password, firstName, lastName}),
        }).then(respuesta => respuesta.json())
        .then(dato =>{
            localStorage.setItem('token', dato["token"]);
            console.log(localStorage.get("token"))
        }
    )}


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("firstName")} placeholder= "First name"></input>
            {errors.firstName && <p>{errors.firstName.message}</p>}
            <input {...register("lastName")} placeholder= "Last name"></input>
            {errors.lastName && <p>{errors.lastName.message}</p>}
            <input {...register("email")} placeholder= "Email"></input>
            {errors.email && <p>{errors.email.message}</p>}
            <input {...register("password")} placeholder= "Password"></input>
            {errors.password && <p>{errors.password.message}</p>}
            <button>ACEPTAR</button>
        </form>
    )
}